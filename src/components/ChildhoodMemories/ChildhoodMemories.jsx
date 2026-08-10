import Reveal from "../common/Reveal";
import ImageWithFallback from "../common/ImageWithFallback";
import ThreadDivider from "../Decorative/ThreadDivider";
import { eventData } from "../../data/eventData";

export default function ChildhoodMemories() {
  const { childhood, images } = eventData;

  return (
    <section id="memories" className="relative bg-ivory-100 py-20 sm:py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <span className="font-body text-xs md:text-sm tracking-widest2 uppercase text-gold-600 mb-4 block">
            {childhood.heading}
          </span>
          <p className="font-display italic text-2xl md:text-3xl text-ink-500 mb-16">
            {childhood.lead}
          </p>
        </Reveal>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16">
          <Reveal delay={0.05} className="flex flex-col items-center">
            <div className="p-2 sm:p-3 bg-white rounded-[15px] shadow-card rotate-[-2deg] hover:rotate-0 transition-transform duration-500 w-full max-w-[13rem] sm:max-w-none">
              <ImageWithFallback
                src={images.groomChildhood}
                alt="Childhood photo of the groom"
                label="Add his childhood photo"
                className="w-full aspect-[4/5] sm:w-52 sm:h-64 md:w-60 md:h-72 object-cover rounded-[15px]"
              />
            </div>
            <span className="font-display text-xl text-ink-600 mt-5">
              {childhood.groomLabel}
            </span>
          </Reveal>

          <Reveal delay={0.15} className="flex flex-col items-center">
            <div className="p-2 sm:p-3 bg-white rounded-[15px] shadow-card rotate-[2deg] hover:rotate-0 transition-transform duration-500 w-full max-w-[13rem] sm:max-w-none">
              <ImageWithFallback
                src={images.brideChildhood}
                alt="Childhood photo of the bride"
                label="Add her childhood photo"
                className="w-full aspect-[4/5] sm:w-52 sm:h-64 md:w-60 md:h-72 object-cover rounded-[15px]"
              />
            </div>
            <span className="font-display text-xl text-ink-600 mt-5">
              {childhood.brideLabel}
            </span>
          </Reveal>
        </div>

        <Reveal delay={0.25} className="mt-16">
          <ThreadDivider />
          <p className="font-display italic text-xl md:text-2xl text-ink-500 mt-4">
            {childhood.trail}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
