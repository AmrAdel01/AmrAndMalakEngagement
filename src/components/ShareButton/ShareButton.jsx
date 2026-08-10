import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { eventData } from "../../data/eventData";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);
  const { couple, social, event } = eventData;

  const shareData = {
    title: `${couple.combinedNames} — ${event.title}`,
    text: social.whatsappShareText,
    url: typeof window !== "undefined" ? window.location.href : "",
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled — no action needed
      }
    } else {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gold-500/60 text-gold-600 font-body text-sm tracking-wide uppercase rounded-[15px] hover:bg-gold-500 hover:text-white transition-colors min-h-[48px]"
    >
      {copied ? <Check size={15} strokeWidth={1.5} /> : <Share2 size={15} strokeWidth={1.5} />}
      {copied ? "Link Copied" : "Share the Invitation"}
    </button>
  );
}
