"use client";

import { useEffect, useState, type ReactNode } from "react";

const BAR_HEIGHT = 72;

// Sticky header frame. Once the hero has scrolled away, data-compact flips and the header folds:
// the logo tab slides into the bar, the logo shrinks and centres in it, and a shadow falls under
// the frame. Only transforms and opacity animate, so the bar never reflows during the fold.
export function SiteHeaderFrame({ children }: { children: ReactNode }) {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      // Pages without the home hero compact as soon as they scroll.
      const hero = document.getElementById("hero-title")?.closest("section");
      const heroEnd = hero ? hero.getBoundingClientRect().bottom + y : 0;
      setCompact(y > Math.max(0, heroEnd - BAR_HEIGHT));
    };
    // First pass on the next frame, so a page reloaded mid-scroll paints expanded and then folds
    // up instead of snapping. The scroll event that follows scroll restoration does the rest.
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("pageshow", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("pageshow", update);
    };
  }, []);

  return (
    <header
      data-compact={compact}
      className="group/header sticky top-0 z-40 bg-white data-[compact=true]:drop-shadow-[0_6px_10px_rgb(30_34_38/0.28)]"
    >
      {children}
    </header>
  );
}
