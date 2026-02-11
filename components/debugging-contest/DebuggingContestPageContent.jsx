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
  1: 60 * 10,
  2: 60 * 15,
  3: 60 * 20,
};

export default function DebuggingContestPageContent() {
  const [currentRound, setCurrentRound] = useState(1);

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

  const handleTimeUp = () => setCurrentRound('times_up');
  const handleRound1Complete = () => setCurrentRound(2);
  const handleRound2Complete = (password) => {
    if (password === ROUND_PASSWORD) {
      setCurrentRound(3);
    }
  };
  const handleRound3Complete = (flag) => {
    if (flag === ROUND3_FLAG) {
      setCurrentRound(4);
    }
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
      return <CongratulationsScreen />;
    }
    return <TimeUpScreen />;
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
              <CountdownTimer duration={ROUND_DURATIONS[currentRound]} onTimeUp={handleTimeUp} />
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
                <span className="text-slate-500">
                  {Math.floor(ROUND_DURATIONS[currentRound] / 60)} minutes available
                </span>
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
