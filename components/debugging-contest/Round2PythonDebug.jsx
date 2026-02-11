'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-tomorrow.css';
import { BUGGY_PYTHON_CODE, ROUND_PASSWORD } from './constants';

export default function Round2PythonDebug({ onComplete }) {
  const [code, setCode] = useState(BUGGY_PYTHON_CODE);
  const [output, setOutput] = useState('');
  const [pyodide, setPyodide] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPyodide = async () => {
      if (window.pyodide) {
        setPyodide(window.pyodide);
        setIsLoading(false);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js';
      script.onload = async () => {
        const pyodideInstance = await window.loadPyodide();
        window.pyodide = pyodideInstance;
        setPyodide(pyodideInstance);
        setIsLoading(false);
      };
      document.body.appendChild(script);
    };

    loadPyodide();
  }, []);

  const runCode = async () => {
    if (!pyodide) {
      setOutput('Pyodide is not loaded yet.');
      return;
    }

    setOutput('Running code...');
    try {
      let capturedOutput = '';
      pyodide.setStdout({
        batched: (line) => {
          capturedOutput += `${line}\n`;
        },
      });

      await pyodide.runPythonAsync(code);
      setOutput(capturedOutput);

      if (capturedOutput.includes(ROUND_PASSWORD)) {
        onComplete(ROUND_PASSWORD);
      }
    } catch (error) {
      setOutput(error?.toString() || 'Unknown error');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <div className="mb-6">
        <h2 className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-3xl font-bold text-transparent">
          Round 2: Python Debugging
        </h2>
        <p className="mb-4 mt-4 text-lg text-slate-300">
          Debug the Python code below. When it runs successfully, it will print a password to unlock
          the final round.
        </p>
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-400">
          <div className="h-2 w-2 rounded-full bg-purple-500"></div>
          Fix the code to reveal the password
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="mb-3 text-xl font-semibold text-slate-200">Code Editor</h3>
          <div
            style={{ fontFamily: '"Fira code", "Fira Mono", monospace', fontSize: 14 }}
            className="overflow-hidden rounded-xl border border-white/10"
          >
            <Editor
              value={code}
              onValueChange={(newCode) => setCode(newCode)}
              highlight={(newCode) => highlight(newCode, languages.python)}
              padding={10}
              className="min-h-[300px] bg-slate-900/50"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={runCode}
          className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-green-500/25 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Loading Pyodide...' : 'Run Code'}
        </motion.button>

        <div>
          <h3 className="mb-3 text-xl font-semibold text-slate-200">Output</h3>
          <pre className="whitespace-pre-wrap rounded-xl border border-white/10 bg-slate-900/50 p-6 font-mono text-sm text-white">
            {output || 'Output will appear here...'}
          </pre>
        </div>
      </div>
    </motion.div>
  );
}
