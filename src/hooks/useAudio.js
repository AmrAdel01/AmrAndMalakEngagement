import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Shared background audio. Call `play()` from a user gesture (e.g. the Begin
 * button) so browsers allow autoplay; optional `autoPlay` covers intro-disabled flows.
 */
export function useAudio(src, { autoPlay = false, enabled = true } = {}) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio(src);
      audio.loop = true;
      audio.volume = 0.35;
      audioRef.current = audio;
    }
    return audioRef.current;
  }, [src]);

  const play = useCallback(() => {
    if (!enabled) return Promise.resolve();
    const audio = getAudio();
    return audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  }, [enabled, getAudio]);

  useEffect(() => {
    if (!enabled) return undefined;

    getAudio();

    if (autoPlay) {
      play();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, [src, autoPlay, enabled, getAudio, play]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      play();
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  return { isPlaying, isMuted, play, toggle, toggleMute };
}
