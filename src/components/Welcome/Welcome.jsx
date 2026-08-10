import { motion } from "framer-motion";
import { eventData } from "../../data/eventData";

/**
 * A short intro overlay shown once per visit, before the main site. Also
 * doubles as the user gesture that reliably unlocks audio autoplay on most
 * mobile browsers, since it requires a tap to dismiss.
 */
export default function Welcome({ onEnter }) {
  const { intro, couple } = eventData;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[90] bg-white flex flex-col items-center justify-center px-6 sm:px-8 text-center safe-top safe-bottom"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <span className="font-body text-xs tracking-widest2 uppercase text-gold-600 block mb-6">
          {couple.combinedNames}
        </span>
        <p className="font-display italic text-2xl md:text-3xl text-ink-600 max-w-md leading-relaxed">
          {intro.message}
        </p>

        <button
          onClick={onEnter}
          className="mt-10 sm:mt-12 px-9 py-3 border border-gold-500 text-gold-600 font-body text-sm tracking-widest2 uppercase rounded-[15px] hover:bg-gold-500 hover:text-white transition-colors min-h-[48px] min-w-[140px]"
        >
          Begin
        </button>
      </motion.div>
    </motion.div>
  );
}
