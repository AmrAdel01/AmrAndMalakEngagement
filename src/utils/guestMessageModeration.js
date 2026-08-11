const BLOCKED_NAME_PATTERNS = [
  /^RL_\d+$/i,
  /^CORStest$/i,
  /^SecTest$/i,
  /^anonymous$/i,
  /^ann?onymous$/i,
];

const BLOCKED_TEXT_PATTERNS = [
  /^Rate limit test \d+$/i,
  /^CORS test$/i,
  /^test$/i,
];

const UNSAFE_MARKUP_PATTERN =
  /<\s*\/?\s*[a-z!]|on[a-z]+\s*=|javascript\s*:|data\s*:/i;
const UNSAFE_SQL_PATTERN =
  /(--|;\s*(drop|delete|insert|update|alter|truncate)\b|\bunion\s+select\b|\bexists\s*\(\s*select\b|\bsleep\s*\(|\b(or|and)\b\s+['"`]?\w+['"`]?\s*=\s*['"`]?\w+['"`]?|^'+$)/i;

export function cleanGuestMessageText(value, maxLength) {
  return String(value || "")
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      return code <= 31 || code === 127 ? " " : char;
    })
    .join("")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function isBlockedGuestMessageContent(name = "", text = "") {
  const normalizedName = String(name).trim();
  const normalizedText = String(text).trim();

  return (
    UNSAFE_MARKUP_PATTERN.test(normalizedName) ||
    UNSAFE_MARKUP_PATTERN.test(normalizedText) ||
    UNSAFE_SQL_PATTERN.test(normalizedName) ||
    UNSAFE_SQL_PATTERN.test(normalizedText) ||
    BLOCKED_NAME_PATTERNS.some((pattern) => pattern.test(normalizedName)) ||
    BLOCKED_TEXT_PATTERNS.some((pattern) => pattern.test(normalizedText))
  );
}
