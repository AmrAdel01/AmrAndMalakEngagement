import { Calendar, MapPin } from "lucide-react";
import Reveal from "../common/Reveal";
import ThreadDivider from "../Decorative/ThreadDivider";
import { eventData } from "../../data/eventData";

export default function EventDetails() {
  const { eventDetails, event } = eventData;

  return (
    <section id="event" className="relative bg-white py-16 sm:py-20 md:py-28 px-4 sm:px-6">
      <div className="max-w-lg mx-auto text-center">
        <Reveal>
          <span className="font-body text-xs tracking-widest2 uppercase text-gold-600 mb-4 block">
            {eventDetails.heading}
          </span>
          <h3 className="font-display text-3xl md:text-4xl text-ink-600 mb-8">
            {eventDetails.label}
          </h3>

          <div className="flex flex-col items-center gap-3 font-body text-ink-500">
            <span className="flex items-center gap-2 text-sm md:text-base">
              <Calendar size={16} strokeWidth={1.5} className="text-gold-500" />
              {event.displayDate}
            </span>
            <span className="flex items-center gap-2 text-sm md:text-base">
              <MapPin size={16} strokeWidth={1.5} className="text-gold-500" />
              {event.venue}, {event.location.split(",")[0]}
            </span>
          </div>

          <ThreadDivider className="mt-10" />
        </Reveal>
      </div>
    </section>
  );
}
