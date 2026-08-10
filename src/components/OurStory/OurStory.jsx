import { Heart, Sparkles } from "lucide-react";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import { eventData } from "../../data/eventData";

export default function OurStory() {
  const { story } = eventData;

  return (
    <section
      id="story"
      className="relative bg-gradient-to-b from-white via-ivory-100 to-white py-20 sm:py-24 md:py-32 px-4 sm:px-6"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow={story.kicker} title={story.heading} subtitle={story.intro} />

        <div className="relative">
          <span
            className="absolute left-5 sm:left-7 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-gold-400/50 to-transparent md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />

          <ol className="space-y-6 md:space-y-8">
            {story.milestones.map((item, index) => {
              const isEven = index % 2 === 0;
              const Icon = isEven ? Sparkles : Heart;

              return (
                <li key={`${item.year}-${item.title}`} className="relative">
                  <Reveal y={24} delay={index * 0.08}>
                    <article
                      className={`relative ml-12 sm:ml-16 md:ml-0 md:w-[calc(50%-2.5rem)] rounded-[15px] border border-champagne-200 bg-white/95 p-5 sm:p-6 md:p-7 shadow-card ${
                        isEven ? "md:mr-auto" : "md:ml-auto"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] border border-gold-400/30 bg-ivory-100 text-gold-600">
                          <Icon size={18} strokeWidth={1.4} />
                        </span>

                        <div className="min-w-0">
                          <span className="mb-2 inline-flex rounded-[15px] border border-champagne-200 bg-ivory-100 px-3 py-1 font-body text-[10px] tracking-widest2 uppercase text-gold-600">
                            {item.year}
                          </span>
                          <h3 className="font-display text-2xl md:text-3xl leading-[1.1] text-ink-600">
                            {item.title}
                          </h3>
                          <p className="mt-3 font-body text-sm md:text-[15px] leading-relaxed text-ink-400">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </article>
                  </Reveal>

                  <span
                    className="absolute left-5 sm:left-7 top-7 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-white bg-gold-500 shadow-[0_0_0_1px_rgba(154,154,154,0.35)] md:left-1/2"
                    aria-hidden="true"
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
