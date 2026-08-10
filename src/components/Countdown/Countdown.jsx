import Reveal from "../common/Reveal";
import { useCountdown } from "../../hooks/useCountdown";
import { eventData } from "../../data/eventData";

function pad(n) {
  return String(n).padStart(2, "0");
}

function Unit({ value, label }) {
  return (
    <div className="flex flex-col items-center min-w-0 flex-1">
      <div className="w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border border-gold-400/40 flex items-center justify-center bg-white">
        <span className="font-display text-xl xs:text-2xl sm:text-3xl md:text-4xl text-ink-600 tabular-nums">
          {pad(value)}
        </span>
      </div>
      <span className="font-body text-[9px] xs:text-[10px] md:text-xs tracking-widest2 uppercase text-ink-400 mt-2 sm:mt-3">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const { countdown, event } = eventData;
  const { days, hours, minutes, seconds, isComplete } = useCountdown(event.isoDateTime);

  return (
    <section className="relative bg-ivory-200 py-20 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden border-y border-champagne-200">
      <div className="absolute inset-0 opacity-[0.04]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#9A9A9A" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <Reveal>
          <span className="font-body text-xs md:text-sm tracking-widest2 uppercase text-gold-600 mb-4 block">
            {event.displayDate}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl text-ink-600 mb-10 sm:mb-14 px-2">
            {countdown.heading}
          </h2>
        </Reveal>

        {isComplete ? (
          <Reveal>
            <p className="font-display italic text-xl sm:text-2xl md:text-3xl text-ink-600 px-4">
              {countdown.completedMessage}
            </p>
          </Reveal>
        ) : (
          <Reveal delay={0.1}>
            <div className="flex items-start justify-center gap-2 xs:gap-3 sm:gap-6 md:gap-8 max-w-md sm:max-w-none mx-auto">
              <Unit value={days} label="Days" />
              <Unit value={hours} label="Hours" />
              <Unit value={minutes} label="Minutes" />
              <Unit value={seconds} label="Seconds" />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
