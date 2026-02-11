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
import { ROUND_PASSWORD, ROUND3_FLAG } from './constants';
import { CongratulationsScreen, TimeUpScreen } from './StatusScreens';

const ROUND_DURATIONS = {
  1: 60 * 30, // 30 minutes
  2: 60 * 25, // 25 minutes
  3: 60 * 20, // 20 minutes
};

export default function DebuggingContestPageContent() {
  const [currentRound, setCurrentRound] = useState(1);
  const [roundStartTimes, setRoundStartTimes] = useState(() => ({ 1: Date.now() }));
  const [roundCompletionTimes, setRoundCompletionTimes] = useState({});

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
    setCurrentRound(2);
  };

  const handleRound2Complete = (password) => {
    if (password === ROUND_PASSWORD) {
      const completionTime = Date.now();
      setRoundCompletionTimes(prev => ({
        ...prev,
        [currentRound]: completionTime
      }));
      setRoundStartTimes(prev => ({
        ...prev,
        3: completionTime
      }));
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
                duration={ROUND_DURATIONS[currentRound]}
                startTime={roundStartTimes[currentRound]}
                onTimeUp={handleTimeUp}
              />
            )}
          </div>

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
