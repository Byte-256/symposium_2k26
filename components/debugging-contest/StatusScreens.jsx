'use client';

import { motion } from 'framer-motion';

export function CongratulationsScreen({ completionTimes, startTimes }) {
  const formatTimeTaken = (completionTime, startTime) => {
    if (!completionTime || !startTime) return 'N/A';
    const timeTaken = Math.floor((completionTime - startTime) / 1000);
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

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
      
      {completionTimes && startTimes && (
        <div className="mb-6 rounded-xl border border-white/10 bg-white/[0.02] p-6">
          <h3 className="mb-4 text-lg font-semibold text-slate-200">Your Completion Times:</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-cyan-400">Round 1:</span>
              <span className="text-slate-300">{formatTimeTaken(completionTimes[1], startTimes[1])}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-purple-400">Round 2:</span>
              <span className="text-slate-300">{formatTimeTaken(completionTimes[2], startTimes[2])}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-pink-400">Round 3:</span>
              <span className="text-slate-300">{formatTimeTaken(completionTimes[3], startTimes[3])}</span>
            </div>
          </div>
        </div>
      )}
      
      <p className="text-slate-400">Please wait for the final results.</p>
    </motion.div>
  );
}

export function TimeUpScreen({ completionTimes, startTimes }) {
  const formatTimeTaken = (completionTime, startTime) => {
    if (!completionTime || !startTime) return 'N/A';
    const timeTaken = Math.floor((completionTime - startTime) / 1000);
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

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
      
      {completionTimes && startTimes && Object.keys(completionTimes).length > 0 && (
        <div className="mb-6 rounded-xl border border-white/10 bg-white/[0.02] p-6">
          <h3 className="mb-4 text-lg font-semibold text-slate-200">Completed Rounds:</h3>
          <div className="space-y-2">
            {[1, 2, 3].map(round => (
              completionTimes[round] && (
                <div key={round} className="flex justify-between text-sm">
                  <span className={
                    round === 1 ? "text-cyan-400" :
                    round === 2 ? "text-purple-400" :
                    "text-pink-400"
                  }>
                    Round {round}:
                  </span>
                  <span className="text-slate-300">
                    {formatTimeTaken(completionTimes[round], startTimes[round])}
                  </span>
                </div>
              )
            ))}
          </div>
        </div>
      )}
      
      <p className="text-slate-400">Better luck next time!</p>
    </motion.div>
  );
}
