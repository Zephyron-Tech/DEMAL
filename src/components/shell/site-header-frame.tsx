"use client";

import { useEffect, useState, type ReactNode } from "react";

const BAR_HEIGHT = 72;

// Sticky header frame. Once the page scrolls, a shadow falls under the whole frame, the logo tab
// included. Once the hero has scrolled away, the tab slides back into the bar and the logo shrinks
// into the bar's centre. Styling reads data-compact through group-data variants in site-header.tsx.
export function SiteHeaderFrame({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      // Pages without the home hero compact as soon as they scroll.
      const hero = document.getElementById("hero-title")?.closest("section");
      const heroEnd = hero ? hero.getBoundingClientRect().bottom + y : 0;
      setScrolled(y > 0);
      setCompact(y > Math.max(0, heroEnd - BAR_HEIGHT));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <header
      data-compact={compact}
      className={`group/header sticky top-0 z-40 bg-white transition-[filter] duration-(--duration-ui) ease-out ${
        scrolled ? "drop-shadow-[0_6px_10px_rgb(30_34_38/0.28)]" : ""
      }`}
    >
      {children}
    </header>
  );
}
