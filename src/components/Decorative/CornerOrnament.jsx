/**
 * Minimal corner flourish — a single quarter-arc with a small leaf mark.
 * Used sparingly (hero + footer) so it reads as a detail, not a pattern.
 */
export default function CornerOrnament({ className = "" }) {
  return (
    <svg
      width="90"
      height="90"
      viewBox="0 0 90 90"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 4 C 4 40, 4 70, 40 86"
        fill="none"
        stroke="#C9A24B"
        strokeWidth="1"
        opacity="0.5"
      />
      <path
        d="M4 4 C 40 4, 70 4, 86 40"
        fill="none"
        stroke="#C9A24B"
        strokeWidth="1"
        opacity="0.5"
      />
      <circle cx="4" cy="4" r="2.5" fill="#C9A24B" opacity="0.7" />
    </svg>
  );
}
