'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/themes/prism-tomorrow.css';

const DEFAULT_CPP_CODE = `#include <iostream>
#include <string>
using namespace std;

int main() {
    string text;
    getline(cin, text);

    for (char &ch : text) {
        if (ch >= 'a' && ch <= 'z') {
            ch = char('a' + (ch - 'a' + 13) % 26);
        } else if (ch >= 'A' && ch <= 'Z') {
            ch = char('A' + (ch - 'A' + 13) % 26);
        }
    }

    cout << text << endl;
    return 0;
}
`;

const WORKER_SCRIPT_URL = '/cpp-runner.worker.js';

export default function CppCodeRunner({
  initialCode = DEFAULT_CPP_CODE,
  initialInput = 'HelloWorld',
  initialLanguage = 'cpp',
  timeoutMs = 4000,
  runButtonLabel = 'Run Code',
  onResult,
}) {
  const [code, setCode] = useState(initialCode);
  const [stdin, setStdin] = useState(initialInput);
  const [language, setLanguage] = useState(initialLanguage);
  const [runtimeStatus, setRuntimeStatus] = useState('Loading runtime...');
  const [output, setOutput] = useState('');
  const [isRuntimeReady, setIsRuntimeReady] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const workerRef = useRef(null);
  const runIdRef = useRef(0);
  const activeRunRef = useRef(null);
  const stdoutRef = useRef('');
  const timeoutRef = useRef(null);

  const resetRuntimeWorker = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
    activeRunRef.current = null;
    stdoutRef.current = '';
    setIsRunning(false);
    setIsRuntimeReady(false);
  }, []);

  const initializeRuntime = useCallback(() => {
    resetRuntimeWorker();
    setRuntimeStatus('Loading runtime...');

    try {
      const worker = new Worker(WORKER_SCRIPT_URL);

      worker.onmessage = (event) => {
        const data = event.data || {};
        const activeRun = activeRunRef.current;

        if (data.type === 'ready') {
          setIsRuntimeReady(true);
          setRuntimeStatus('Runtime ready');
          return;
        }

        if (data.type === 'fatal') {
          setIsRuntimeReady(false);
          setRuntimeStatus(`Runtime failed to load: ${data.error || 'unknown error'}`);
          return;
        }

        if (!activeRun || data.runId !== activeRun.runId) {
          return;
        }

        if (data.type === 'stdout') {
          const chunk = String(data.chunk ?? '');
          stdoutRef.current += chunk;
          setOutput((previous) => previous + chunk);
          return;
        }

        if (data.type === 'done') {
          const finalOutput = `${stdoutRef.current}\n[exit code: ${data.exitCode}]`.trim();
          setOutput(finalOutput);
          setRuntimeStatus('Runtime ready');
          setIsRunning(false);

          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }

          activeRun.resolve({
            ok: true,
            stdout: stdoutRef.current,
            stderr: '',
            exitCode: data.exitCode,
            timedOut: false,
          });
          activeRunRef.current = null;
          return;
        }

        if (data.type === 'error') {
          const message = String(data.error || 'Unknown runtime error');
          const finalOutput = `${stdoutRef.current}\nCompilation/runtime error:\n${message}`.trim();
          setOutput(finalOutput);
          setRuntimeStatus('Runtime ready');
          setIsRunning(false);

          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }

          activeRun.resolve({
            ok: false,
            stdout: stdoutRef.current,
            stderr: message,
            exitCode: null,
            timedOut: false,
          });
          activeRunRef.current = null;
        }
      };

      worker.onerror = (error) => {
        const message = error?.message || 'Worker crashed';
        setIsRuntimeReady(false);
        setRuntimeStatus(`Runtime failed to load: ${message}`);
      };

      workerRef.current = worker;
    } catch (error) {
      setIsRuntimeReady(false);
      setRuntimeStatus(`Runtime failed to load: ${error.message || String(error)}`);
    }
  }, [resetRuntimeWorker]);

  useEffect(() => {
    const bootId = window.setTimeout(() => {
      initializeRuntime();
    }, 0);

    return () => {
      window.clearTimeout(bootId);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      resetRuntimeWorker();
    };
  }, [initializeRuntime, resetRuntimeWorker]);

  const editorLanguage = useMemo(
    () => (language === 'c' ? languages.c : languages.cpp),
    [language],
  );

  const runCode = useCallback(async () => {
    if (!workerRef.current || !isRuntimeReady) {
      setOutput('Runtime is not ready yet. Please wait and try again.');
      return;
    }

    const runId = Date.now() + Math.floor(Math.random() * 1000);
    runIdRef.current = runId;
    stdoutRef.current = '';
    setIsRunning(true);
    setRuntimeStatus('Compiling and running...');
    setOutput('');

    try {
      const runPromise = new Promise((resolve) => {
        activeRunRef.current = { runId, resolve };
      });

      timeoutRef.current = setTimeout(() => {
        if (activeRunRef.current?.runId !== runId) {
          return;
        }
        const finalOutput = `${stdoutRef.current}\nRuntime error: Execution timed out after ${timeoutMs}ms.\nWorker restarted.`.trim();
        setOutput(finalOutput);
        setRuntimeStatus('Runtime restarted after timeout');
        setIsRunning(false);
        activeRunRef.current.resolve({
          ok: false,
          stdout: stdoutRef.current,
          stderr: `Execution timed out after ${timeoutMs}ms.`,
          exitCode: null,
          timedOut: true,
        });
        activeRunRef.current = null;
        initializeRuntime();
      }, timeoutMs);

      workerRef.current.postMessage({
        type: 'run',
        runId,
        code: String(code ?? ''),
        input: String(stdin ?? ''),
      });

      const result = await runPromise;
      if (runIdRef.current !== runId) {
        return;
      }
      onResult?.(result);
    } catch (error) {
      const message = error?.message || String(error);
      setOutput(`Runtime failure:\n${message}`);
      setRuntimeStatus('Runtime failed');
      setIsRunning(false);
    }
  }, [code, initializeRuntime, isRuntimeReady, onResult, stdin, timeoutMs]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-xl font-semibold text-slate-200">C/C++ Browser Runner</h3>
        <div className="flex items-center gap-3">
          <label className="text-sm text-slate-300" htmlFor="runner-language">
            Language
          </label>
          <select
            id="runner-language"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-400/60"
          >
            <option value="c">C</option>
            <option value="cpp">C++</option>
          </select>
        </div>
      </div>

      <div
        style={{ fontFamily: '"Fira code", "Fira Mono", monospace', fontSize: 14 }}
        className="overflow-hidden rounded-xl border border-white/10 bg-slate-900/50"
      >
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={(text) => highlight(text, editorLanguage)}
          padding={12}
          className="min-h-[320px]"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="stdin-input">
          Program Input (stdin)
        </label>
        <textarea
          id="stdin-input"
          value={stdin}
          onChange={(event) => setStdin(event.target.value)}
          className="min-h-[100px] w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-cyan-500/50 focus:bg-white/[0.05]"
          placeholder="Type stdin here. Example: hello"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={runCode}
          disabled={!isRuntimeReady || isRunning}
          className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-3 font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-green-500/25 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isRunning ? 'Running...' : runButtonLabel}
        </button>
        <span className="text-sm text-slate-400">{runtimeStatus}</span>
        <span className="text-sm text-slate-500">Timeout: {timeoutMs}ms</span>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-300">Output Console</h4>
        <pre className="min-h-[160px] whitespace-pre-wrap rounded-xl border border-white/10 bg-slate-900/60 p-4 font-mono text-sm text-white">
          {output || 'stdout/stderr will appear here...'}
        </pre>
      </div>
    </div>
  );
}
