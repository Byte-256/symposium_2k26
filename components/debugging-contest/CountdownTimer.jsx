'use client';

import { useEffect, useState } from 'react';

export default function CountdownTimer({ duration, startTime, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [totalTime, setTotalTime] = useState(duration);

  useEffect(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const remaining = Math.max(0, duration - elapsed);
    setTimeLeft(remaining);
    setTotalTime(duration);

    if (remaining <= 0) {
      onTimeUp();
      return;
    }

    const intervalId = setInterval(() => {
      const newElapsed = Math.floor((Date.now() - startTime) / 1000);
      const newRemaining = Math.max(0, duration - newElapsed);
      setTimeLeft(newRemaining);
      
      if (newRemaining <= 0) {
        clearInterval(intervalId);
        onTimeUp();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [duration, startTime, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeTaken = totalTime - timeLeft;
  const takenMinutes = Math.floor(timeTaken / 60);
  const takenSeconds = timeTaken % 60;

  return (
    <div className="flex flex-col items-end gap-1 text-right">
      <div className="flex items-center gap-2 text-sm text-slate-300">
        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-red-500"></span>
        <span className="tracking-wide text-slate-400">Time Left</span>
        <span className="font-mono text-lg font-semibold text-red-400 sm:text-xl">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
      </div>
      <div className="text-xs text-slate-500">
        Elapsed: {String(takenMinutes).padStart(2, '0')}:{String(takenSeconds).padStart(2, '0')}
      </div>
    </div>
  );
}
