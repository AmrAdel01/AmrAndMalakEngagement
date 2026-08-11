import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, MessageCircle, PenLine, RefreshCw, Sparkles } from "lucide-react";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import { eventData } from "../../data/eventData";
import { useGuestMessages } from "../../hooks/useGuestMessages";

function FloatingHearts() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 0, scale: 0.4 }}
          animate={{
            opacity: [0, 1, 0],
            y: -120 - i * 18,
            x: (i % 2 === 0 ? -1 : 1) * (20 + i * 12),
            scale: [0.4, 1, 0.6],
          }}
          transition={{ duration: 2.2, delay: i * 0.12, ease: "easeOut" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2"
        >
          <Heart size={14 + (i % 3) * 4} className="text-ink-400/60 fill-ivory-200/80" strokeWidth={1.25} />
        </motion.span>
      ))}
    </div>
  );
}

function MessageCard({ message }) {
  const date = new Date(message.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  const writer = message.name.trim() || "Guest";
  const initial = Array.from(writer)[0]?.toUpperCase() || "G";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 32, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[15px] border border-champagne-200 bg-gradient-to-br from-white via-white to-ivory-100 p-4 sm:p-5 shadow-card"
    >
      <div className="flex items-center justify-between gap-4 border-b border-gold-400/15 pb-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[15px] bg-ink-600 font-display text-lg italic leading-none text-white">
            {initial}
          </span>
          <span className="truncate font-display text-lg sm:text-xl italic text-ink-600">
            {writer}
          </span>
        </div>
        <span className="shrink-0 font-body text-[11px] tracking-wide uppercase text-ink-400/70">
          {date}
        </span>
      </div>

      <div className="relative pt-4">
        <p
          className="pointer-events-none absolute -top-1 left-0 font-display text-4xl leading-none text-gold-400/25 select-none"
          aria-hidden="true"
        >
          &ldquo;
        </p>
        <p className="relative pl-7 font-body text-sm leading-relaxed text-ink-500 whitespace-pre-wrap break-words">
          {message.text}
        </p>
      </div>
    </motion.article>
  );
}

export default function GuestMessages() {
  const { heading, subheading, namePlaceholder, messagePlaceholder, submitLabel, successMessage } =
    eventData.messages;
  const {
    messages: guestMessages,
    total,
    hasMore,
    loading,
    loadingMore,
    usingLocalFallback,
    error: messagesError,
    addMessage,
    refresh,
    loadMore,
  } = useGuestMessages();

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [justSent, setJustSent] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const trimmedName = name.trim();
    const trimmedText = text.trim();

    if (!trimmedName || !trimmedText) {
      setFormError("Please share your name and a short message.");
      return;
    }

    if (trimmedText.length > 500) {
      setFormError("Please keep your message under 500 characters.");
      return;
    }

    setSubmitting(true);

    if (eventData.messages.formspreeId) {
      try {
        await fetch(`https://formspree.io/f/${eventData.messages.formspreeId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ name: trimmedName, message: trimmedText }),
        });
      } catch {
        // Still show the message locally even if email delivery fails.
      }
    }

    try {
      await addMessage({ name: trimmedName, text: trimmedText });
      setName("");
      setText("");
      setJustSent(true);
      setTimeout(() => setJustSent(false), 2800);
    } catch (error) {
      setFormError(error.message || "Unable to send your message right now.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="messages" className="relative bg-white py-20 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[320px] sm:w-[520px] h-[320px] sm:h-[520px] rounded-full bg-ivory-200/60 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        <SectionHeading eyebrow="Leave a Note" title={heading} subtitle={subheading} />

        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-8 sm:gap-10 lg:gap-14 items-start">
          <Reveal>
            <div className="relative rounded-[15px] bg-gradient-to-br from-ivory-100 to-white border border-champagne-200 shadow-soft p-6 sm:p-8 md:p-10">
              {justSent && <FloatingHearts />}

              <div className="flex items-center gap-3 mb-6">
                <PenLine size={20} strokeWidth={1.25} className="text-gold-500" />
                <p className="font-body text-sm text-ink-400">Write something from the heart</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="guest-name" className="sr-only">
                    Your name
                  </label>
                  <input
                    id="guest-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={namePlaceholder}
                    maxLength={60}
                    className="w-full rounded-[15px] bg-white border border-champagne-200 px-4 py-3 font-body text-base text-ink-600 placeholder:text-ink-400/50 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="guest-message" className="sr-only">
                    Your message
                  </label>
                  <textarea
                    id="guest-message"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={messagePlaceholder}
                    rows={5}
                    maxLength={500}
                    className="w-full resize-none rounded-[15px] bg-white border border-champagne-200 px-4 py-3 font-body text-base text-ink-600 placeholder:text-ink-400/50 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>

                {formError && (
                  <p className="font-body text-sm text-ink-500">{formError}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-ink-600 text-white font-body text-sm tracking-wide uppercase rounded-[15px] hover:bg-ink-700 transition-colors disabled:opacity-60 min-h-[48px]"
                >
                  <Sparkles size={15} strokeWidth={1.5} />
                  {submitting ? "Sending..." : submitLabel}
                </button>
              </form>

              <AnimatePresence>
                {justSent && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mt-5 font-display italic text-lg text-gold-600 text-center"
                  >
                    {successMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[15px] border border-champagne-200 bg-white shadow-card">
              <div className="flex items-center justify-between gap-4 border-b border-champagne-200 bg-ivory-100/80 px-4 py-4 sm:px-5">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <MessageCircle size={17} strokeWidth={1.5} className="text-gold-500" />
                    <h3 className="font-display text-xl italic text-ink-600">
                      Guest Notes
                    </h3>
                  </div>
                  <p className="mt-1 font-body text-xs uppercase tracking-wide text-ink-400">
                    {total} {total === 1 ? "message" : "messages"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={refresh}
                  disabled={loading}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[15px] border border-champagne-200 text-ink-500 transition-colors hover:border-gold-500 hover:text-gold-600 disabled:opacity-50"
                  aria-label="Refresh guest messages"
                >
                  <RefreshCw size={16} strokeWidth={1.5} className={loading ? "animate-spin" : ""} />
                </button>
              </div>

              {usingLocalFallback && messagesError && (
                <div className="border-b border-champagne-200 bg-ivory-100 px-4 py-3 font-body text-xs leading-relaxed text-ink-400 sm:px-5">
                  {messagesError}
                </div>
              )}

              {loading ? (
                <div className="space-y-4 p-4 sm:p-5">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="rounded-[15px] border border-champagne-200 bg-ivory-100 p-4">
                      <div className="mb-4 h-4 w-32 rounded-[15px] bg-champagne-200" />
                      <div className="h-3 w-full rounded-[15px] bg-champagne-200" />
                      <div className="mt-2 h-3 w-2/3 rounded-[15px] bg-champagne-200" />
                    </div>
                  ))}
                </div>
              ) : guestMessages.length === 0 ? (
                <div className="p-8 sm:p-10 text-center">
                  <Heart size={24} strokeWidth={1.25} className="text-gold-500/60 mx-auto mb-4" />
                  <p className="font-display italic text-xl text-ink-500">
                    Be the first to leave a beautiful note for us.
                  </p>
                </div>
              ) : (
                <>
                  <div className="max-h-[620px] space-y-4 overflow-y-auto p-4 sm:p-5">
                    <AnimatePresence mode="popLayout">
                      {guestMessages.map((message) => (
                        <MessageCard key={message.id} message={message} />
                      ))}
                    </AnimatePresence>
                  </div>

                  {hasMore && (
                    <div className="border-t border-champagne-200 p-4 sm:p-5">
                      <button
                        type="button"
                        onClick={loadMore}
                        disabled={loadingMore}
                        className="w-full rounded-[15px] border border-gold-500 px-5 py-3 font-body text-xs uppercase tracking-wide text-gold-600 transition-colors hover:bg-gold-500 hover:text-white disabled:opacity-60"
                      >
                        {loadingMore ? "Loading..." : "Show more notes"}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
