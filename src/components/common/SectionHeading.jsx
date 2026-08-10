import Reveal from "./Reveal";

/**
 * Shared heading treatment: tracked-out eyebrow, large serif title, and the
 * signature single gold thread beneath it. Used by every section so the
 * type hierarchy reads as one consistent language site-wide.
 */
export default function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
  const alignClass = align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <Reveal className={`flex flex-col ${alignClass} mb-14 md:mb-20`}>
      {eyebrow && (
        <span className="font-body text-[11px] md:text-xs tracking-widest2 uppercase text-gold-600 mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink-600 leading-[1.1] px-2">
        {title}
      </h2>
      <span className="mt-6 w-16 h-px bg-gold-400/70" />
      {subtitle && (
        <p className="font-body text-ink-400 text-sm md:text-base mt-6 max-w-md">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
