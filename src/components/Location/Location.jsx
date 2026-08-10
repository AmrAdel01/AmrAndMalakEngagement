import { MapPin, Navigation, CalendarPlus } from "lucide-react";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import { eventData } from "../../data/eventData";
import { downloadIcsEvent } from "../../utils/calendar";

export default function Location() {
  const { location, event, couple } = eventData;

  const handleSaveDate = () => {
    downloadIcsEvent({
      title: `${couple.combinedNames} — ${event.title}`,
      description: `Join us as we celebrate our engagement.`,
      location: event.address,
      isoDateTime: event.isoDateTime,
    });
  };

  return (
    <section id="location" className="relative bg-ivory-100 py-20 sm:py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <SectionHeading eyebrow="You're Invited" title={location.heading} />

        <Reveal>
          <div className="bg-white border border-champagne-200 rounded-[15px] shadow-card p-6 sm:p-8 md:p-10 text-center">
            <MapPin size={26} strokeWidth={1.25} className="text-gold-500 mx-auto mb-5" />
            <h3 className="font-display text-2xl md:text-3xl text-ink-600 mb-2">
              {event.venue}
            </h3>
            <p className="font-body text-ink-400 text-sm md:text-base mb-8">
              {event.address}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
              <a
                href={event.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 bg-ink-600 text-white font-body text-xs sm:text-sm tracking-wide uppercase rounded-[15px] hover:bg-ink-700 transition-colors min-h-[48px]"
              >
                <Navigation size={15} strokeWidth={1.5} />
                {location.directionsLabel}
              </a>

              <button
                onClick={handleSaveDate}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 border border-gold-500 text-gold-600 font-body text-xs sm:text-sm tracking-wide uppercase rounded-[15px] hover:bg-gold-500 hover:text-white transition-colors min-h-[48px]"
              >
                <CalendarPlus size={15} strokeWidth={1.5} />
                Save the Date
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
