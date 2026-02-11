'use client';

import { motion } from 'framer-motion';

export function CongratulationsScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="py-12 text-center"
    >
      <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600">
        <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="mb-6 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-4xl font-bold text-transparent">
        Congratulations!
      </h2>
      <p className="mb-4 text-xl text-slate-300">
        You have successfully completed all rounds of the debugging contest.
      </p>
      <p className="text-slate-400">Please wait for the final results.</p>
    </motion.div>
  );
}

export function TimeUpScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="py-12 text-center"
    >
      <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-rose-600">
        <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h2 className="mb-6 bg-gradient-to-r from-red-400 to-rose-600 bg-clip-text text-4xl font-bold text-transparent">
        Time&apos;s Up!
      </h2>
      <p className="mb-4 text-xl text-slate-300">You have run out of time.</p>
      <p className="text-slate-400">Better luck next time!</p>
    </motion.div>
  );
}
