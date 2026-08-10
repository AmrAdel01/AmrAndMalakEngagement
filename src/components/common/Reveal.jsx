import { motion } from "framer-motion";

/**
 * Gentle fade + rise reveal used throughout the site for scroll-triggered
 * entrances. Kept subtle on purpose — no bouncing, no flashing.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.9,
  className = "",
  as = "div",
}) {
  const Component = motion[as] || motion.div;

  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}
