import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { eventData } from "../../data/eventData";
import CornerOrnament from "../Decorative/CornerOrnament";

export default function Hero() {
  const { hero, event } = eventData;

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-white pt-16 sm:pt-20"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-ivory-100 to-ivory-200" />
        <motion.div
          className="absolute -top-32 -left-24 w-[280px] sm:w-[420px] h-[280px] sm:h-[420px] rounded-full bg-ivory-200/80 blur-3xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -right-20 w-[320px] sm:w-[480px] h-[320px] sm:h-[480px] rounded-full bg-champagne-100/80 blur-3xl"
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] w-[140%] max-w-none"
          viewBox="0 0 800 800"
          aria-hidden="true"
        >
          <circle cx="400" cy="400" r="300" fill="none" stroke="#9A9A9A" strokeWidth="1" />
          <circle cx="400" cy="400" r="230" fill="none" stroke="#9A9A9A" strokeWidth="1" />
        </svg>
      </div>

      <CornerOrnament className="absolute top-20 sm:top-24 left-4 sm:left-6 md:top-10 md:left-10 scale-75 sm:scale-100" />
      <CornerOrnament className="absolute top-20 sm:top-24 right-4 sm:right-6 md:top-10 md:right-10 -scale-x-100 scale-75 sm:scale-100" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 w-full max-w-4xl">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-body text-[10px] sm:text-xs md:text-sm tracking-widest2 uppercase text-gold-600 mb-4 sm:mb-6 px-2"
        >
          {event.venue} · {event.location.split(",")[0]}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-display italic text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-ink-600 leading-[1.08] px-2"
        >
          {hero.eyebrow}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4"
        >
          <span className="w-6 sm:w-10 h-px bg-gold-400" />
          <span className="font-display text-lg sm:text-2xl md:text-3xl tracking-[0.15em] sm:tracking-[0.2em] text-gold-600">
            {event.dateMark}
          </span>
          <span className="w-6 sm:w-10 h-px bg-gold-400" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.95 }}
          className="font-body text-ink-400 text-sm sm:text-base md:text-lg mt-6 sm:mt-8 max-w-md px-4"
        >
          {hero.subtitle}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-6 sm:bottom-10 safe-bottom flex flex-col items-center gap-2 text-ink-400"
      >
        <span className="font-body text-[11px] tracking-widest2 uppercase">
          {hero.scrollHint}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} strokeWidth={1.25} />
        </motion.div>
      </motion.div>
    </section>
  );
}
