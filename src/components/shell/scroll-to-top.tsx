"use client";

import { useEffect, useState } from "react";

const SHOW_AFTER = 600;

// Floating button for returning to the top of any page. It fades in once the page is scrolled
// well past the first screen, and scrolls with a smooth glide unless reduced motion is requested.
export function ScrollToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > SHOW_AFTER);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  function toTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label={label}
      tabIndex={visible ? 0 : -1}
      className={`focus-on-dark press fixed right-4 bottom-4 z-30 flex size-12 items-center justify-center bg-asphalt text-trailer shadow-[0_6px_16px_rgb(30_34_38/0.3)] transition-[opacity,translate,visibility] duration-300 ease-(--ease-out) hover:bg-demal motion-reduce:transition-none sm:right-8 sm:bottom-8 ${
        visible ? "visible translate-y-0 opacity-100" : "invisible translate-y-3 opacity-0"
      }`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="square"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
