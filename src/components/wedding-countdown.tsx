import { useEffect, useState } from "react";

// With no ceremony time supplied, count down to the start of Nikah day in India.
export const NIKAH_START = new Date("2026-11-01T00:00:00+05:30").getTime();

export function getCountdown(now: number) {
  const seconds = Math.max(0, Math.floor((NIKAH_START - now) / 1000));
  return [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60];
}

export function WeddingCountdown() {
  const [remaining, setRemaining] = useState<number[] | null>(null);
  useEffect(() => {
    const update = () => setRemaining(getCountdown(Date.now()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);
  return <div className="countdown" role="timer" aria-label="Time until Nikah">
    {["Days", "Hours", "Minutes", "Seconds"].map((label, index) => <div className="countdown-unit" key={label}>
      <span className="countdown-value">{remaining ? String(remaining[index]).padStart(2, "0") : "––"}</span>
      <span className="countdown-label">{label}</span>
    </div>)}
  </div>;
}