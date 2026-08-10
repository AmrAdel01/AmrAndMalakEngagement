import { motion } from "framer-motion";

/**
 * Brief, elegant loading state shown for a fixed short duration on first
 * load — intentionally quick per the design brief ("do not make it slow").
 */
export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
    >
      <motion.span
        initial={{ opacity: 0.4, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="font-display italic text-2xl md:text-3xl text-ink-600"
      >
        Loading our story...
      </motion.span>
      <span className="w-14 h-px bg-gold-400 mt-6" />
    </motion.div>
  );
}
