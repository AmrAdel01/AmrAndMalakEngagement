import { useState } from "react";
import { Heart } from "lucide-react";

/**
 * Renders a photo from /public if it exists; otherwise renders an elegant
 * placeholder card instead of a broken image icon, so the site looks
 * intentional even before real photos are added. Swap the file at `src` in
 * /public/images and the real photo appears automatically — no code changes.
 */
export default function ImageWithFallback({ src, alt, label, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-ivory-100 to-ivory-200 border border-champagne-200 ${className}`}
      >
        <Heart size={22} strokeWidth={1.25} className="text-gold-500/70" />
        <span className="font-body text-[11px] tracking-widest2 uppercase text-ink-400/70 px-4 text-center">
          {label || "Add your photo"}
        </span>
      </div>
    );
  }

  return (
    <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={className} />
  );
}
