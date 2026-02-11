'use client';

import { useMemo, useRef, useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/themes/prism-tomorrow.css';
import * as JSCPPModule from 'JSCPP';

const STARTER_C_CODE = `int putchar(int);

int main() {
  putchar('O');
  putchar('K');
  putchar('\\n');
  return 0;
}
`;

function getJsCppRuntime() {
  const runtime = JSCPPModule?.default || JSCPPModule;
  if (runtime && typeof runtime.run === 'function') {
    return runtime;
  }
  return null;
}

function maybeExitMessage(message) {
  const lower = message.toLowerCase();
  return lower.includes('program exited') || lower.includes('status: 0');
}

export default function TccCompileRunPanel() {
  const [code, setCode] = useState(STARTER_C_CODE);
  const [stdin, setStdin] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const workerRef = useRef(null);
  const runtime = useMemo(() => getJsCppRuntime(), []);

  const getWorker = () => {
    if (workerRef.current) {
      return workerRef.current;
    }
    workerRef.current = new Worker('/workers/tccWorker.js', { type: 'module' });
    return workerRef.current;
  };

  const compileWithTcc = (sourceCode) =>
    new Promise((resolve, reject) => {
      const worker = getWorker();
      const handleMessage = (event) => {
        const data = event.data || {};
        if (data.type !== 'compiled') {
          return;
        }
        worker.removeEventListener('message', handleMessage);
        if (data.ok) {
          resolve(data);
          return;
        }
        reject(new Error(data.stderr || 'TinyCC compilation failed.'));
      };
      worker.addEventListener('message', handleMessage);
      worker.postMessage({ type: 'compile', code: sourceCode });
    });

  const runCode = async () => {
    if (!runtime) {
      setOutput('JSCPP runtime failed to load.');
      return;
    }

    setIsRunning(true);
    setOutput('Compiling with TinyCC...');

    try {
      const compileResult = await compileWithTcc(code);

      let stdout = '';
      const exitCode = runtime.run(String(code || ''), String(stdin || ''), {
        stdio: {
          write: (chunk) => {
            stdout += String(chunk ?? '');
          },
        },
      });

      const chunks = [
        'TinyCC compile: success',
        compileResult.stderr?.trim() ? `TinyCC diagnostics:\n${compileResult.stderr.trim()}` : '',
        stdout ? `Program stdout:\n${stdout.trimEnd()}` : 'Program stdout:\n<empty>',
        `[exit code: ${exitCode}]`,
      ].filter(Boolean);

      setOutput(chunks.join('\n\n'));
    } catch (error) {
      const message = error?.message || String(error);
      if (maybeExitMessage(message)) {
        setOutput('TinyCC compile: success');
      } else {
        setOutput(`TinyCC compile failed:\n${message}`);
      }
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <div>
        <h2 className="text-xl font-semibold text-slate-100">TinyCC Compile + Run</h2>
        <p className="mt-1 text-sm text-slate-400">
          Compiles with `tcc-wasm` first, then runs source in-browser and prints stdout.
        </p>
      </div>

      <div
        style={{ fontFamily: '"Fira code", "Fira Mono", monospace', fontSize: 14 }}
        className="overflow-hidden rounded-xl border border-white/10 bg-slate-900/50"
      >
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={(text) => highlight(text, languages.c)}
          padding={12}
          className="min-h-[320px]"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="tcc-stdin">
          Program Input (stdin)
        </label>
        <textarea
          id="tcc-stdin"
          value={stdin}
          onChange={(event) => setStdin(event.target.value)}
          className="min-h-[100px] w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-cyan-500/50 focus:bg-white/[0.05]"
          placeholder="Optional stdin"
        />
      </div>

      <button
        onClick={runCode}
        disabled={isRunning}
        className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-3 font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isRunning ? 'Compiling & Running...' : 'Compile & Run'}
      </button>

      <div>
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-300">Output</h4>
        <pre className="min-h-[180px] whitespace-pre-wrap rounded-xl border border-white/10 bg-slate-900/60 p-4 font-mono text-sm text-white">
          {output || 'Output will appear here...'}
        </pre>
      </div>
    </div>
  );
}
