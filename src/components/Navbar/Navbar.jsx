import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { eventData } from "../../data/eventData";
import { useScrollSpy } from "../../hooks/useScrollSpy";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionIds = eventData.navigation.map((n) => n.id);
  const activeId = useScrollSpy(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 safe-top ${
        scrolled || menuOpen
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-10 h-16 sm:h-20">
        <button
          onClick={() => handleNavClick("home")}
          className="font-brand text-3xl sm:text-4xl md:text-[2.75rem] text-ink-600 leading-none shrink-0 pt-1"
        >
          {eventData.couple.groom}
          <span className="text-gold-500 mx-1 sm:mx-2">&</span>
          {eventData.couple.bride}
        </button>

        <ul className="hidden lg:flex items-center gap-6 xl:gap-9">
          {eventData.navigation.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                className={`font-body text-xs xl:text-sm tracking-wide uppercase transition-colors min-h-[44px] px-1 ${
                  activeId === item.id
                    ? "text-gold-600"
                    : "text-ink-400 hover:text-gold-600"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-ink-600 -mr-2"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="lg:hidden bg-white/98 backdrop-blur-md overflow-hidden border-t border-ink-400/10"
          >
            <ul className="flex flex-col px-6 py-4 gap-1">
              {eventData.navigation.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left font-body text-sm tracking-wide uppercase min-h-[48px] py-3 ${
                      activeId === item.id ? "text-gold-600" : "text-ink-500"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
