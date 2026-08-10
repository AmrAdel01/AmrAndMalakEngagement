/**
 * The site's signature motif: two thin gold threads that begin apart and
 * meet into a single line — echoing "two little stories becoming one".
 * Used as a divider between major sections instead of a generic <hr />.
 */
export default function ThreadDivider({ flip = false, className = "" }) {
  return (
    <div className={`w-full flex justify-center py-2 ${className}`} aria-hidden="true">
      <svg
        width="220"
        height="28"
        viewBox="0 0 220 28"
        className={flip ? "scale-y-[-1]" : ""}
      >
        <path
          d="M10 4 C 70 4, 90 24, 110 24 C 130 24, 150 4, 210 4"
          fill="none"
          stroke="#C9A24B"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.55"
        />
        <circle cx="110" cy="24" r="2.4" fill="#C9A24B" opacity="0.75" />
      </svg>
    </div>
  );
}
