import { useState, useEffect, useCallback } from "react";

const LEGACY_STORAGE_KEYS = ["engagement-guest-messages"];
const STORAGE_KEY = "engagement-guest-messages-fresh-start";
const PAGE_SIZE = 12;
const UNSAFE_MARKUP_PATTERN =
  /<\s*\/?\s*[a-z!]|on[a-z]+\s*=|javascript\s*:|data\s*:/i;
const UNSAFE_SQL_PATTERN =
  /(--|;\s*(drop|delete|insert|update|alter|truncate)\b|\bunion\s+select\b|\bexists\s*\(\s*select\b|\bsleep\s*\(|\b(or|and)\b\s+['"`]?\w+['"`]?\s*=\s*['"`]?\w+['"`]?|^'+$)/i;
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

function clearLegacyMessages() {
  LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
}

function readLocalMessages() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const messages = raw ? JSON.parse(raw) : [];
    return messages.filter((message) => !isBlockedContent(message.name, message.text));
  } catch {
    return [];
  }
}

function writeLocalMessages(messages) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

function normalizeMessage(message) {
  return {
    id: message.id,
    name: message.name,
    text: message.text,
    createdAt: message.createdAt || message.created_at || new Date().toISOString(),
  };
}

function isBlockedContent(name = "", text = "") {
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

async function readErrorMessage(response) {
  try {
    const data = await response.json();
    return data.error || "Unable to send your message.";
  } catch {
    return "Unable to send your message.";
  }
}

export function useGuestMessages() {
  const [messages, setMessages] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [usingLocalFallback, setUsingLocalFallback] = useState(false);
  const [error, setError] = useState("");

  const loadMessages = useCallback(async ({ reset = false, offset = 0 } = {}) => {
    if (reset) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    setError("");

    try {
      const response = await fetch(`/api/messages?limit=${PAGE_SIZE}&offset=${offset}`);

      if (!response.ok) {
        if (response.status === 503) {
          throw new Error("Database unavailable");
        }

        throw new Error(await readErrorMessage(response));
      }

      const data = await response.json();
      const nextMessages = (data.messages || []).map(normalizeMessage);

      setUsingLocalFallback(false);
      setTotal(Number(data.total || nextMessages.length));
      setMessages((prev) => (reset ? nextMessages : [...prev, ...nextMessages]));
    } catch (error) {
      const localMessages = readLocalMessages();

      setUsingLocalFallback(true);
      setTotal(localMessages.length);
      setMessages(localMessages);
      setError(
        error.message === "Database unavailable"
          ? "Database is not connected yet, so messages are only saved on this device."
          : "Guest messages are temporarily unavailable. Please refresh in a moment.",
      );
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    clearLegacyMessages();
    loadMessages({ reset: true });
  }, [loadMessages]);

  const refresh = useCallback(() => loadMessages({ reset: true }), [loadMessages]);

  const loadMore = useCallback(() => {
    if (!loadingMore && messages.length < total) {
      loadMessages({ offset: messages.length });
    }
  }, [loadMessages, loadingMore, messages.length, total]);

  const addMessage = useCallback(async ({ name, text }) => {
    const trimmedName = name.trim();
    const trimmedText = text.trim();
    if (!trimmedName || !trimmedText) return null;

    if (isBlockedContent(trimmedName, trimmedText)) {
      throw new Error("Please use a real name and message without test text, HTML, or SQL.");
    }

    const payload = { name: trimmedName, text: trimmedText };

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status < 500 && response.status !== 503) {
          throw new Error(await readErrorMessage(response));
        }

        throw new Error("Database unavailable");
      }

      const data = await response.json();
      const entry = normalizeMessage(data.message);

      setUsingLocalFallback(false);
      setError("");
      setMessages((prev) => [entry, ...prev]);
      setTotal((prev) => prev + 1);
      return entry;
    } catch (error) {
      if (error.message !== "Database unavailable" && error.name !== "TypeError") {
        throw error;
      }

      const entry = {
        id: crypto.randomUUID(),
        name: trimmedName,
        text: trimmedText,
        createdAt: new Date().toISOString(),
      };

      setUsingLocalFallback(true);
      setError("Database is not connected yet, so messages are only saved on this device.");
      setMessages((prev) => {
        const next = [entry, ...prev];
        writeLocalMessages(next);
        setTotal(next.length);
        return next;
      });

      return entry;
    }
  }, []);

  return {
    messages,
    total,
    hasMore: messages.length < total,
    loading,
    loadingMore,
    usingLocalFallback,
    error,
    addMessage,
    refresh,
    loadMore,
  };
}
