'use client';

import { motion } from 'framer-motion';

export default function Round1Quiz({ onComplete }) {
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

      <div className="overflow-hidden rounded-xl border border-white/10">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSf-XbRMbgPNCD5S9sMuRwwqa_5al_irFdnWqztvGSoOHg-Ibg/viewform?embedded=true"
          width="100%"
          height="800"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          className="bg-white/5"
        >
          Loading...
        </iframe>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onComplete}
        className="mt-6 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/25"
      >
        I have completed the quiz
      </motion.button>
    </motion.div>
  );
}
