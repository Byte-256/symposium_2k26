'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import JsCppInlineRunner from '@/components/JsCppInlineRunner';
import { BUGGY_CPP_CODE, ROUND3_FLAG } from './constants';

export default function Round3CppCtf({ onComplete }) {
  const [flag, setFlag] = useState('');
  const [flagError, setFlagError] = useState('');

  const submitFlag = () => {
    const normalizedFlag = flag.trim();
    if (!normalizedFlag) {
      setFlagError('Please enter a flag before submitting.');
      return;
    }

    if (normalizedFlag === ROUND3_FLAG) {
      setFlagError('');
      onComplete(normalizedFlag);
      return;
    }
    setFlagError('Incorrect flag! Please try again.');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <div className="mb-6">
        <h2 className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-3xl font-bold text-transparent">
          Round 3: C++ CTF
        </h2>
        <p className="mb-4 mt-4 text-lg text-slate-300">
          Debug the C++ code to find the hidden flag. Submit the flag to win!
        </p>
        <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-2 text-sm text-pink-400">
          <div className="h-2 w-2 rounded-full bg-pink-500"></div>
          Final round - find the flag!
        </div>
      </div>

      <div className="space-y-6">
        <JsCppInlineRunner
          initialCode={BUGGY_CPP_CODE}
          initialInput=""
          initialLanguage="cpp"
          runButtonLabel="Compile & Run"
          showStdin={false}
          showLanguageSelector={false}
        />

        <div>
          <h3 className="mb-3 text-xl font-semibold text-slate-200">Submit Flag</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter flag (format: FLAG{...})"
              value={flag}
              onChange={(event) => {
                setFlag(event.target.value);
                if (flagError) {
                  setFlagError('');
                }
              }}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-white placeholder-slate-500 transition-all duration-300 focus:border-pink-500/50 focus:bg-white/[0.05] focus:outline-none"
            />
            {flagError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400"
              >
                {flagError}
              </motion.div>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={submitFlag}
              className="rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/25"
            >
              Submit Flag
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
