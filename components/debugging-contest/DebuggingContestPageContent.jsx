'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CountdownTimer from './CountdownTimer';
import Round1Quiz from './Round1Quiz';
import Round2PythonDebug from './Round2PythonDebug';
import Round3CppCtf from './Round3CppCtf';
import { ROUND3_FLAG, ROUND3_PASSWORD } from './constants';
import { CongratulationsScreen, TimeUpScreen } from './StatusScreens';

const ROUND_DURATIONS = {
  1: 60 * 15, // 15 minutes
  2: 60 * 15, // 15 minutes
  3: 60 * 30, // 30 minutes
};

const ROUND_GRACE_DURATIONS = {
  1: 60 * 1, // 1 minute grace
  2: 60 * 5, // 5 minutes grace
  3: 60 * 10, // 10 minutes grace
};

const getRoundTotalDuration = (round) => ROUND_DURATIONS[round] + ROUND_GRACE_DURATIONS[round];

export default function DebuggingContestPageContent() {
  const [currentRound, setCurrentRound] = useState(1);
  const [roundStartTimes, setRoundStartTimes] = useState(() => ({ 1: Date.now() }));
  const [roundCompletionTimes, setRoundCompletionTimes] = useState({});
  const [roundTimeLeft, setRoundTimeLeft] = useState(getRoundTotalDuration(1));

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleTimeUp = () => {
    const completionTime = Date.now();
    setRoundCompletionTimes(prev => ({
      ...prev,
      [currentRound]: completionTime
    }));
    setRoundTimeLeft(0);
    setCurrentRound('times_up');
  };

  const handleRound1Complete = () => {
    const completionTime = Date.now();
    setRoundCompletionTimes(prev => ({
      ...prev,
      [currentRound]: completionTime
    }));
    setRoundStartTimes(prev => ({
      ...prev,
      2: completionTime
    }));
    setRoundTimeLeft(getRoundTotalDuration(2));
    setCurrentRound(2);
  };

  const handleRound2Complete = (password) => {
    if (password === ROUND3_PASSWORD) {
      const completionTime = Date.now();
      setRoundCompletionTimes(prev => ({
        ...prev,
        [currentRound]: completionTime
      }));
      setRoundStartTimes(prev => ({
        ...prev,
        3: completionTime
      }));
      setRoundTimeLeft(getRoundTotalDuration(3));
      setCurrentRound(3);
    }
  };

  const handleRound3Complete = (flag) => {
    if (flag === ROUND3_FLAG) {
      const completionTime = Date.now();
      setRoundCompletionTimes(prev => ({
        ...prev,
        [currentRound]: completionTime
      }));
      setRoundTimeLeft(0);
      setCurrentRound(4);
    }
  };

  const formatTimeTaken = (completionTime, startTime) => {
    if (!completionTime || !startTime) return 'N/A';
    const timeTaken = Math.floor((completionTime - startTime) / 1000);
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const formatCountdown = (seconds) => {
    const safeSeconds = Math.max(0, seconds);
    const minutes = Math.floor(safeSeconds / 60);
    const remainingSeconds = safeSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const currentDuration = typeof currentRound === 'number' ? getRoundTotalDuration(currentRound) : 0;
  const currentPrimaryDuration = typeof currentRound === 'number' ? ROUND_DURATIONS[currentRound] : 0;
  const elapsedTime = currentDuration > 0 ? currentDuration - roundTimeLeft : 0;
  const visibleRoundTimeLeft = currentPrimaryDuration > 0 ? Math.max(0, currentPrimaryDuration - elapsedTime) : 0;
  const timerProgress = currentPrimaryDuration > 0 ? Math.max(0, Math.min(100, (visibleRoundTimeLeft / currentPrimaryDuration) * 100)) : 0;
  const isCriticalTime = visibleRoundTimeLeft <= 60;
  const isDangerTime = visibleRoundTimeLeft > 60 && visibleRoundTimeLeft <= 5 * 60;
  const isWarningTime = visibleRoundTimeLeft > 5 * 60 && visibleRoundTimeLeft <= 10 * 60;
  const urgencyText = isCriticalTime
    ? 'FINAL MINUTE. SHIP THE FIX NOW.'
    : isDangerTime
      ? 'Clock is hunting you. Move faster.'
      : isWarningTime
        ? 'Time pressure is rising.'
        : 'Every second matters.';

  const roundMetaStyle = useMemo(() => {
    if (currentRound === 1) {
      return 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400';
    }
    if (currentRound === 2) {
      return 'bg-purple-500/10 border-purple-500/30 text-purple-400';
    }
    if (currentRound === 3) {
      return 'bg-pink-500/10 border-pink-500/30 text-pink-400';
    }
    if (currentRound === 4) {
      return 'bg-green-500/10 border-green-500/30 text-green-400';
    }
    return 'bg-red-500/10 border-red-500/30 text-red-400';
  }, [currentRound]);

  const renderCurrentRound = () => {
    if (currentRound === 1) {
      return <Round1Quiz onComplete={handleRound1Complete} />;
    }
    if (currentRound === 2) {
      return <Round2PythonDebug onComplete={handleRound2Complete} />;
    }
    if (currentRound === 3) {
      return <Round3CppCtf onComplete={handleRound3Complete} />;
    }
    if (currentRound === 4) {
      return <CongratulationsScreen completionTimes={roundCompletionTimes} startTimes={roundStartTimes} />;
    }
    return <TimeUpScreen completionTimes={roundCompletionTimes} startTimes={roundStartTimes} />;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AnimatedBackground />
      <Navbar />

      <main className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <h1 className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
              Debugging Contest
            </h1>
            {currentRound !== 4 && currentRound !== 'times_up' && (
              <CountdownTimer
                key={currentRound}
                duration={getRoundTotalDuration(currentRound)}
                displayDuration={ROUND_DURATIONS[currentRound]}
                startTime={roundStartTimes[currentRound]}
                onTimeUp={handleTimeUp}
                onTick={setRoundTimeLeft}
              />
            )}
          </div>

          {currentRound !== 4 && currentRound !== 'times_up' && (
            <div
              className={`sticky top-20 z-30 mb-6 rounded-xl border px-4 py-4 shadow-lg transition-all ${
                isCriticalTime
                  ? 'animate-pulse border-red-400/80 bg-red-500/20'
                  : isDangerTime
                    ? 'border-orange-400/70 bg-orange-500/10'
                    : 'border-cyan-400/40 bg-cyan-500/10'
              }`}
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">Pressure Meter</p>
                <p className={`font-mono text-xl font-bold sm:text-2xl ${isCriticalTime ? 'text-red-300' : isDangerTime ? 'text-orange-300' : 'text-cyan-300'}`}>
                  {formatCountdown(visibleRoundTimeLeft)}
                </p>
              </div>
              <p className={`mb-3 text-sm font-medium ${isCriticalTime ? 'text-red-200' : isDangerTime ? 'text-orange-200' : 'text-cyan-200'}`}>
                {urgencyText}
              </p>
              <div className="h-2 overflow-hidden rounded-full bg-slate-900/70">
                <div
                  className={`h-full transition-all duration-700 ${
                    isCriticalTime ? 'bg-red-400' : isDangerTime ? 'bg-orange-400' : 'bg-cyan-400'
                  }`}
                  style={{ width: `${timerProgress}%` }}
                />
              </div>
            </div>
          )}

          <div className="mb-6">
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span className={`rounded-full border px-3 py-1 ${roundMetaStyle}`}>
                Round{' '}
                {currentRound === 'times_up'
                  ? 'Ended'
                  : currentRound === 4
                    ? 'Completed'
                    : currentRound}
              </span>
              {currentRound !== 'times_up' && currentRound !== 4 && (
                 <>
                <span className="text-slate-500">
                  {Math.floor(ROUND_DURATIONS[currentRound] / 60)} minutes available
                </span>
                   {roundCompletionTimes[currentRound - 1] && (
                     <span className="text-green-400">
                       Round {currentRound - 1} completed in {formatTimeTaken(roundCompletionTimes[currentRound - 1], roundStartTimes[currentRound - 1])}
                     </span>
                   )}
                 </>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm sm:p-8"
        >
          {renderCurrentRound()}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
