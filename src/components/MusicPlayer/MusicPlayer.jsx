import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { eventData } from "../../data/eventData";

export default function MusicPlayer({ isPlaying, isMuted, toggle, toggleMute }) {
  const { music } = eventData;

  if (!music.enabled) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-40 flex items-center gap-2 bg-white/95 backdrop-blur-md border border-champagne-200 rounded-[15px] px-3 py-2 shadow-card safe-bottom max-w-[calc(100vw-2rem)]"
    >
      <button
        onClick={toggle}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-ink-600 text-white hover:bg-ink-700 transition-colors"
      >
        {isPlaying ? (
          <Pause size={14} strokeWidth={1.5} fill="currentColor" />
        ) : (
          <Play size={14} strokeWidth={1.5} fill="currentColor" />
        )}
      </button>
      <button
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute music" : "Mute music"}
        className="w-8 h-8 shrink-0 flex items-center justify-center text-ink-500 hover:text-gold-600 transition-colors"
      >
        {isMuted ? (
          <VolumeX size={16} strokeWidth={1.5} />
        ) : (
          <Volume2 size={16} strokeWidth={1.5} />
        )}
      </button>
      <span className="font-body text-[11px] tracking-wide text-ink-400 pr-2 truncate">
        {music.title}
      </span>
    </motion.div>
  );
}
