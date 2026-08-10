import Reveal from "../common/Reveal";
import { eventData } from "../../data/eventData";

export default function QuranVerse() {
  const { quote } = eventData;

  return (
    <section className="relative bg-ivory-100 py-20 sm:py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <Reveal duration={1.1}>
          <span className="w-10 h-px bg-gold-500/60 mx-auto block mb-10" />
          <p
            dir="rtl"
            lang="ar"
            className="font-arabic text-xl sm:text-2xl md:text-4xl leading-[1.9] sm:leading-[2] text-ink-600 px-2"
          >
            {quote.arabic}
          </p>
          <p className="font-display text-lg md:text-xl text-gold-600 mt-8">
            {quote.reference}
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-10">
          <p className="font-body italic text-ink-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            {quote.translation}
          </p>
          <p className="font-body text-xs tracking-widest2 uppercase text-ink-400/70 mt-4">
            {quote.translationReference}
          </p>
        </Reveal>

        <span className="w-10 h-px bg-gold-500/60 mx-auto block mt-10" />
      </div>
    </section>
  );
}
