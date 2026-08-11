import { AtSign } from "lucide-react";
import CornerOrnament from "../Decorative/CornerOrnament";
import ShareButton from "../ShareButton/ShareButton";
import { eventData } from "../../data/eventData";

export default function Footer() {
  const { couple, event, social } = eventData;

  return (
    <footer className="relative bg-white text-ink-600 py-14 sm:py-16 px-4 sm:px-6 overflow-hidden border-t border-champagne-200 safe-bottom">
      <CornerOrnament className="absolute -bottom-6 -left-6 rotate-90 opacity-40" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h3 className="font-display italic text-2xl sm:text-3xl md:text-4xl mb-3">
          {couple.combinedNames}
        </h3>
        <p className="font-body text-ink-400 text-xs sm:text-sm mb-8 px-2">
          {event.displayDate} - {event.displayTime} - {event.venue}, {event.location.split(",")[0]}
        </p>

        <div className="flex justify-center mb-10">
          <ShareButton />
        </div>

        {social.instagram && (
          <a
            href={social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-ink-400 hover:text-gold-600 text-sm font-body min-h-[44px]"
          >
            <AtSign size={15} strokeWidth={1.5} />
            Follow our story
          </a>
        )}

        <p className="font-body text-[11px] tracking-widest2 uppercase text-ink-400/50 mt-10 sm:mt-12">
          With love, always
        </p>
      </div>
    </footer>
  );
}
