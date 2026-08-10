import { useEffect, useState } from "react";

/**
 * Ticks down to a target ISO date/time. Recomputes every second and reports
 * whether the target has already passed so the UI can swap to a completed state.
 */
export function useCountdown(targetIso) {
  const target = new Date(targetIso).getTime();

  const computeRemaining = () => {
    const now = Date.now();
    const diff = target - now;
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds, isComplete: false };
  };

  const [remaining, setRemaining] = useState(computeRemaining);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(computeRemaining());
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetIso]);

  return remaining;
}
