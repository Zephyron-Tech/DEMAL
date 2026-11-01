"use client";

import { useEffect, useState, type ReactNode } from "react";

// Sticky header frame. Once the page scrolls, a shadow falls under the whole frame, the logo tab
// included, so the white bar and tab stay apart from the content passing beneath them.
export function SiteHeaderFrame({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 0);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-white transition-[filter] duration-(--duration-ui) ease-out ${
        scrolled ? "drop-shadow-[0_6px_10px_rgb(30_34_38/0.28)]" : ""
      }`}
    >
      {children}
    </header>
  );
}
