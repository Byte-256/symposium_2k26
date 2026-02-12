'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ROUND1_COMPLETION_CODE } from './constants';

export default function Round1Quiz({ onComplete }) {
  const [completionCode, setCompletionCode] = useState('');

  const isCodeValid = useMemo(
    () => completionCode.trim().toUpperCase() === ROUND1_COMPLETION_CODE.toUpperCase(),
    [completionCode],
  );

  const handleComplete = () => {
    if (!isCodeValid) return;
    onComplete();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <div className="mb-6">
        <h2 className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent">
          Round 1: The Quiz
        </h2>
        <p className="mb-4 mt-4 text-lg text-slate-300">
          Please complete the quiz below. You need to score enough points to qualify for the next
          round.
        </p>
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
          <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
          Complete this round to unlock Round 2
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSf-XbRMbgPNCD5S9sMuRwwqa_5al_irFdnWqztvGSoOHg-Ibg/viewform?embedded=true"
          title="Round 1 quiz form"
          width="100%"
          height="100%"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          className="block h-[60vh] min-h-[420px] w-full max-h-[760px]"
        >
          Loading...
        </iframe>
      </div>

      <div className="mt-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
        <label htmlFor="round1-completion-code" className="mb-2 block text-sm font-medium text-cyan-300">
          Enter the submission code shown after Google Form submit
        </label>
        <input
          id="round1-completion-code"
          type="text"
          value={completionCode}
          onChange={(event) => setCompletionCode(event.target.value)}
          placeholder="CODE"
          className="w-full rounded-lg border border-white/15 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
          autoComplete="off"
        />
        {!isCodeValid && completionCode.trim() && (
          <p className="mt-2 text-xs text-rose-400">Invalid code. Please submit the form and enter the correct code.</p>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleComplete}
        disabled={!isCodeValid}
        className="sticky bottom-4 mt-6 w-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto"
      >
        I have completed the quiz
      </motion.button>
    </motion.div>
  );
}
