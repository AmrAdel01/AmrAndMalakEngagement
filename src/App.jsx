import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import Loader from "./components/Loader/Loader";
import Welcome from "./components/Welcome/Welcome";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import QuranVerse from "./components/QuranVerse/QuranVerse";
import Countdown from "./components/Countdown/Countdown";
import EventDetails from "./components/EventDetails/EventDetails";
import Location from "./components/Location/Location";
import GuestMessages from "./components/GuestMessages/GuestMessages";
import Footer from "./components/Footer/Footer";
import BackToTop from "./components/BackToTop/BackToTop";
import { eventData } from "./data/eventData";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [entered, setEntered] = useState(!eventData.intro.enabled);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    setEntered(true);
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
            <Countdown />
            <EventDetails />
            <Location />
            <GuestMessages />
          </main>
          <Footer />
          <BackToTop />
        </div>
      )}
    </>
  );
}
