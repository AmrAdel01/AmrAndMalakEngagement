import { useState, useEffect, useCallback } from "react";

const LEGACY_STORAGE_KEYS = ["engagement-guest-messages"];
const STORAGE_KEY = "engagement-guest-messages-fresh-start";
const PAGE_SIZE = 12;

function clearLegacyMessages() {
  LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
}

function readLocalMessages() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
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
        throw new Error("Database unavailable");
      }

      const data = await response.json();
      const nextMessages = (data.messages || []).map(normalizeMessage);

      setUsingLocalFallback(false);
      setTotal(Number(data.total || nextMessages.length));
      setMessages((prev) => (reset ? nextMessages : [...prev, ...nextMessages]));
    } catch {
      const localMessages = readLocalMessages();

      setUsingLocalFallback(true);
      setTotal(localMessages.length);
      setMessages(localMessages);
      setError("Database is not connected yet, so messages are only saved on this device.");
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

    const payload = { name: trimmedName, text: trimmedText };

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Database unavailable");
      }

      const data = await response.json();
      const entry = normalizeMessage(data.message);

      setUsingLocalFallback(false);
      setError("");
      setMessages((prev) => [entry, ...prev]);
      setTotal((prev) => prev + 1);
      return entry;
    } catch {
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
