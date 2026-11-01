"use client";

import { useEffect, useState, type ReactNode } from "react";

const BAR_HEIGHT = 72;

// Sticky header frame. Rendered folded, so the bar reads as one piece. Once mounted, a page at the
// top unfolds: the logo tab grows out of the bar and the logo grows into place. Once the hero has
// scrolled away the header stays folded. A shadow falls under the frame from the first pixel.
export function SiteHeaderFrame({ children }: { children: ReactNode }) {
  const [compact, setCompact] = useState(true);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      // Pages without the home hero fold as soon as they scroll.
      const hero = document.getElementById("hero-title")?.closest("section");
      const heroEnd = hero ? hero.getBoundingClientRect().bottom + y : 0;
      setCompact(y > Math.max(0, heroEnd - BAR_HEIGHT));
    };
    // Two frames: the folded state gets painted first, so the unfold animates on every load,
    // refresh and back navigation, including a page reloaded mid-scroll (which stays folded).
    const frame = requestAnimationFrame(() => requestAnimationFrame(update));
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
      className="group/header sticky top-0 z-40 bg-white drop-shadow-[0_6px_10px_rgb(30_34_38/0.28)]"
    >
      {children}
    </header>
  );
}
