'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-tomorrow.css';
import JsCppInlineRunner from '@/components/JsCppInlineRunner';
import {
  BUGGY_CPP_ROUND2_CODE,
  BUGGY_PYTHON_CODE,
  ROUND2_UNLOCK_PASSWORD,
  ROUND3_PASSWORD,
} from './constants';

export default function Round2PythonDebug({ onComplete }) {
  const [code, setCode] = useState(BUGGY_PYTHON_CODE);
  const [output, setOutput] = useState('');
  const [pyodide, setPyodide] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [unlockPassword, setUnlockPassword] = useState('');
  const [unlockError, setUnlockError] = useState('');
  const [isCUnlocked, setIsCUnlocked] = useState(false);
  const [round3PasswordInput, setRound3PasswordInput] = useState('');
  const [round3PasswordError, setRound3PasswordError] = useState('');
  const isPythonCompleted = useMemo(() => output.includes(ROUND2_UNLOCK_PASSWORD), [output]);

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
    } catch (error) {
      setOutput(error?.toString() || 'Unknown error');
    }
  };

  const unlockRoundTwoPartTwo = () => {
    if (!isPythonCompleted) {
      setUnlockError('Complete Round 2-1 first. Run the Python code and get the password.');
      return;
    }
    if (unlockPassword.trim() !== ROUND2_UNLOCK_PASSWORD) {
      setUnlockError('Incorrect password. Solve Round 2-1 and use the exact output password.');
      return;
    }
    setUnlockError('');
    setIsCUnlocked(true);
  };

  const completeRoundTwo = () => {
    if (!isCUnlocked) {
      return;
    }
    if (round3PasswordInput.trim() !== ROUND3_PASSWORD) {
      setRound3PasswordError('Incorrect Round 3 password. Fix Round 2-2 C++ code and enter exact password.');
      return;
    }
    setRound3PasswordError('');
    onComplete(ROUND3_PASSWORD);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <div className="mb-6">
        <h2 className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-3xl font-bold text-transparent">
          Round 2: Dual Debug Arena
        </h2>
        <p className="mb-4 mt-4 text-lg text-slate-300">
          Solve Round 2-1 (Python) to reveal the unlock password, then use it to unlock Round 2-2
          (C++).
        </p>
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-400">
          <div className="h-2 w-2 rounded-full bg-purple-500"></div>
          Round 2-2 remains locked until password is entered
        </div>
      </div>

      <div className={`grid gap-6 ${isCUnlocked ? 'xl:grid-cols-[280px_minmax(0,1fr)]' : 'xl:grid-cols-[minmax(0,1fr)_320px]'}`}>
        {isCUnlocked ? (
          <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-5">
            <h3 className="text-xl font-semibold text-emerald-300">Round 2-1: Completed</h3>
            <p className="mt-2 text-sm text-slate-300">Password accepted. Round 2-2 is now unlocked.</p>
          </section>
        ) : (
          <section className="rounded-2xl border border-purple-500/20 bg-purple-500/[0.04] p-5">
            <h3 className="mb-1 text-xl font-semibold text-slate-100">Round 2-1: Python</h3>
            <p className="mb-4 text-sm text-slate-400">
              Fix and run this code to reveal the password required for Round 2-2.
            </p>

            <div
              style={{ fontFamily: '"Fira code", "Fira Mono", monospace', fontSize: 14 }}
              className="overflow-hidden rounded-xl border border-white/10"
            >
              <Editor
                value={code}
                onValueChange={(newCode) => setCode(newCode)}
                highlight={(newCode) => highlight(newCode, languages.python)}
                padding={10}
                className="min-h-[320px] bg-slate-900/50"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={runCode}
              className="mt-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-green-500/25 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Loading Pyodide...' : 'Run Python'}
            </motion.button>

            <div className="mt-4">
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-300">Output</h4>
              <pre className="min-h-[160px] whitespace-pre-wrap rounded-xl border border-white/10 bg-slate-900/50 p-4 font-mono text-sm text-white">
                {output || 'Output will appear here...'}
              </pre>
            </div>
          </section>
        )}

        <section className="rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.04] p-5">
          <h3 className="mb-1 text-xl font-semibold text-slate-100">Round 2-2: C++</h3>
          <p className="mb-4 text-sm text-slate-400">
            {isCUnlocked ? 'Unlocked. Debug and run the C++ program.' : 'Enter passwd to unlock.'}
          </p>

          {!isCUnlocked ? (
            <div className="space-y-4 rounded-xl border border-dashed border-cyan-400/30 bg-slate-900/40 p-5">
              <label htmlFor="round2-unlock-password" className="block text-sm font-medium text-cyan-300">
                Enter passwd to unlock
              </label>
              <input
                id="round2-unlock-password"
                type="text"
                value={unlockPassword}
                onChange={(event) => setUnlockPassword(event.target.value)}
                placeholder="Password from Round 2-1 output"
                className="w-full rounded-lg border border-white/15 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
                autoComplete="off"
              />
              {unlockError && (
                <div className="rounded-lg border border-rose-500/20 bg-rose-500/10 p-3 text-sm text-rose-300">
                  {unlockError}
                </div>
              )}
              <button
                onClick={unlockRoundTwoPartTwo}
                className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/25"
              >
                Unlock Round 2-2
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-300">
                Round 2-2 unlocked.
              </div>
              <JsCppInlineRunner
                initialCode={BUGGY_CPP_ROUND2_CODE}
                initialInput=""
                initialLanguage="cpp"
                runButtonLabel="Compile & Run C++"
                showStdin={false}
                showLanguageSelector={false}
              />
              <div className="space-y-3 rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <label htmlFor="round3-password" className="block text-sm font-medium text-cyan-300">
                  Enter Round 3 password revealed by Round 2-2
                </label>
                <input
                  id="round3-password"
                  type="text"
                  value={round3PasswordInput}
                  onChange={(event) => setRound3PasswordInput(event.target.value)}
                  placeholder="Password from Round 2-2 output"
                  className="w-full rounded-lg border border-white/15 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
                  autoComplete="off"
                />
                {round3PasswordError && (
                  <div className="rounded-lg border border-rose-500/20 bg-rose-500/10 p-3 text-sm text-rose-300">
                    {round3PasswordError}
                  </div>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={completeRoundTwo}
                className="w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25"
              >
                Complete Round 2
              </motion.button>
            </div>
          )}
        </section>
      </div>
    </motion.div>
  );
}
