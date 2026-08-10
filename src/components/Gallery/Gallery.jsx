import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "../common/SectionHeading";
import ImageWithFallback from "../common/ImageWithFallback";
import Reveal from "../common/Reveal";
import { eventData } from "../../data/eventData";

export default function Gallery() {
  const { gallery, images } = eventData;
  const photos = images.gallery;
  const [activeIndex, setActiveIndex] = useState(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length]
  );
  const prev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, close, next, prev]);

  return (
    <section id="gallery" className="relative bg-ivory-50 py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="A Few Frames" title={gallery.heading} subtitle={gallery.subheading} />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 [grid-auto-flow:dense]">
          {photos.map((photo, index) => {
            const tall = index % 5 === 0;
            return (
              <Reveal
                key={photo.src}
                delay={(index % 6) * 0.05}
                className={tall ? "row-span-2" : ""}
              >
                <button
                  onClick={() => setActiveIndex(index)}
                  className="group relative w-full h-full overflow-hidden rounded-[15px] block"
                >
                  <ImageWithFallback
                    src={photo.src}
                    alt={photo.alt}
                    label="Add this photo"
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${
                      tall ? "h-64 md:h-[420px]" : "h-40 md:h-52"
                    }`}
                  />
                  <span className="absolute inset-0 bg-ink-700/0 group-hover:bg-ink-700/10 transition-colors duration-500" />
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink-700/95 flex items-center justify-center px-4"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute top-6 right-6 text-ivory-50/80 hover:text-ivory-50"
              aria-label="Close"
            >
              <X size={28} strokeWidth={1.25} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 md:left-8 text-ivory-50/80 hover:text-ivory-50"
              aria-label="Previous photo"
            >
              <ChevronLeft size={32} strokeWidth={1.25} />
            </button>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl max-h-[80vh]"
            >
              <ImageWithFallback
                src={photos[activeIndex].src}
                alt={photos[activeIndex].alt}
                label="Add this photo"
                className="max-h-[80vh] max-w-full object-contain rounded-[15px]"
              />
              <p className="font-body text-ivory-50/70 text-sm text-center mt-4">
                {photos[activeIndex].alt}
              </p>
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 md:right-8 text-ivory-50/80 hover:text-ivory-50"
              aria-label="Next photo"
            >
              <ChevronRight size={32} strokeWidth={1.25} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
