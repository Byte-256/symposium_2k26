'use client';

import { useMemo, useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/themes/prism-tomorrow.css';
import * as JSCPPModule from 'JSCPP';

function getJsCppRuntime() {
  const candidate = JSCPPModule?.default || JSCPPModule;
  if (candidate && typeof candidate.run === 'function') {
    return candidate;
  }
  return null;
}

export default function JsCppInlineRunner({
  initialCode,
  initialInput = '',
  initialLanguage = 'cpp',
  runButtonLabel = 'Compile & Run',
}) {
  const [code, setCode] = useState(initialCode);
  const [stdin, setStdin] = useState(initialInput);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [language, setLanguage] = useState(initialLanguage);

  const runtime = useMemo(() => getJsCppRuntime(), []);
  const editorLanguage = useMemo(
    () => (language === 'c' ? languages.c : languages.cpp),
    [language],
  );

  const runCode = () => {
    if (!runtime) {
      setOutput('Runtime failed to load: JSCPP.run is unavailable in this build.');
      return;
    }

    setIsRunning(true);
    try {
      let stdout = '';
      const exitCode = runtime.run(String(code || ''), String(stdin || ''), {
        stdio: {
          write: (chunk) => {
            stdout += String(chunk ?? '');
          },
        },
      });

      setOutput(`${stdout}\n[exit code: ${exitCode}]`.trim());
    } catch (error) {
      const message = error?.message || String(error);
      setOutput(`Compilation/runtime error:\n${message}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <div className="flex items-center gap-3">
        <label className="text-sm text-slate-300" htmlFor="jscpp-language">
          Language
        </label>
        <select
          id="jscpp-language"
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          className="rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-400/60"
        >
          <option value="c">C</option>
          <option value="cpp">C++</option>
        </select>
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
        <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="jscpp-stdin">
          Program Input (stdin)
        </label>
        <textarea
          id="jscpp-stdin"
          value={stdin}
          onChange={(event) => setStdin(event.target.value)}
          className="min-h-[100px] w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-cyan-500/50 focus:bg-white/[0.05]"
          placeholder="Example: 7"
        />
      </div>

      <button
        onClick={runCode}
        disabled={isRunning}
        className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-3 font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-green-500/25 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isRunning ? 'Running...' : runButtonLabel}
      </button>

      <div>
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-300">stdout</h4>
        <pre className="min-h-[160px] whitespace-pre-wrap rounded-xl border border-white/10 bg-slate-900/60 p-4 font-mono text-sm text-white">
          {output || 'stdout/stderr will appear here...'}
        </pre>
      </div>
    </div>
  );
}
