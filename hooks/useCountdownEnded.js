"use client";
import { useState, useEffect } from "react";

export function useCountdownEnded(targetDate = "2026-02-11T20:00:00") {
  const [countdownEnded, setCountdownEnded] = useState(false);

  useEffect(() => {
    const checkCountdown = () => {
      const difference = new Date(targetDate) - new Date();
      setCountdownEnded(difference <= 0);
    };

    checkCountdown();
    const timer = setInterval(checkCountdown, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return countdownEnded;
}