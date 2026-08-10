import { useState, useEffect, useCallback } from "react";

const LEGACY_STORAGE_KEYS = ["engagement-guest-messages"];
const STORAGE_KEY = "engagement-guest-messages-fresh-start";

function clearLegacyMessages() {
  LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
}

function readMessages() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeMessages(messages) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

export function useGuestMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    clearLegacyMessages();
    setMessages(readMessages());
  }, []);

  const addMessage = useCallback(({ name, text }) => {
    const trimmedName = name.trim();
    const trimmedText = text.trim();
    if (!trimmedName || !trimmedText) return null;

    const entry = {
      id: crypto.randomUUID(),
      name: trimmedName,
      text: trimmedText,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => {
      const next = [entry, ...prev];
      writeMessages(next);
      return next;
    });

    return entry;
  }, []);

  return { messages, addMessage };
}
