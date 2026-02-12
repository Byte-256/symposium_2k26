'use client';

import { useCallback, useEffect, useState } from 'react';

export default function CountdownTimer({ duration, startTime, onTimeUp, onTick }) {
  const calculateRemaining = useCallback(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    return Math.max(0, duration - elapsed);
  }, [duration, startTime]);

  const [timeLeft, setTimeLeft] = useState(() => calculateRemaining());

  useEffect(() => {
    const immediateUpdateId = setTimeout(() => {
      const remaining = calculateRemaining();
      setTimeLeft(remaining);
      onTick?.(remaining);
      if (remaining <= 0) onTimeUp();
    }, 0);

    const intervalId = setInterval(() => {
      const newRemaining = calculateRemaining();
      setTimeLeft(newRemaining);
      onTick?.(newRemaining);

      if (newRemaining <= 0) {
        clearInterval(intervalId);
        onTimeUp();
      }
    }, 1000);

    return () => {
      clearTimeout(immediateUpdateId);
      clearInterval(intervalId);
    };
  }, [calculateRemaining, onTimeUp, onTick]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeTaken = duration - timeLeft;
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
