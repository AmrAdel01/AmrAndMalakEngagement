import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";

import Loader from "./components/Loader/Loader";
import Welcome from "./components/Welcome/Welcome";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import QuranVerse from "./components/QuranVerse/QuranVerse";
import OurStory from "./components/OurStory/OurStory";
import ChildhoodMemories from "./components/ChildhoodMemories/ChildhoodMemories";
import Countdown from "./components/Countdown/Countdown";
import EventDetails from "./components/EventDetails/EventDetails";
import Location from "./components/Location/Location";
import GuestMessages from "./components/GuestMessages/GuestMessages";
import Footer from "./components/Footer/Footer";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import BackToTop from "./components/BackToTop/BackToTop";
import { eventData } from "./data/eventData";
import { useAudio } from "./hooks/useAudio";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [entered, setEntered] = useState(!eventData.intro.enabled);
  const introEnabled = eventData.intro.enabled;
  const musicEnabled = eventData.music.enabled;
  const shouldPlayOnEnter = useRef(introEnabled && musicEnabled);

  const audio = useAudio(eventData.music.src, {
    enabled: musicEnabled,
    autoPlay: musicEnabled && !introEnabled,
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    setEntered(true);
    if (shouldPlayOnEnter.current) {
      audio.play();
    }
  };

  return (
    <>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>

      <AnimatePresence>
        {!loading && !entered && <Welcome onEnter={handleEnter} />}
      </AnimatePresence>

      {!loading && entered && (
        <div className="relative overflow-x-hidden">
          <Navbar />
          <main>
            <Hero />
            <QuranVerse />
            <OurStory />
            <ChildhoodMemories />
            <Countdown />
            <EventDetails />
            <Location />
            <GuestMessages />
          </main>
          <Footer />
          {musicEnabled && (
            <MusicPlayer
              isPlaying={audio.isPlaying}
              isMuted={audio.isMuted}
              toggle={audio.toggle}
              toggleMute={audio.toggleMute}
            />
          )}
          <BackToTop />
        </div>
      )}
    </>
  );
}
