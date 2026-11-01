"use client";

import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

const BAR_HEIGHT = 72;

// The mobile menu shares its state with the frame: while it is open the header folds exactly as it
// does on scroll, so the logo tab retracts and the logo sits centred in the bar.
const HeaderMenuContext = createContext<{ menuOpen: boolean; setMenuOpen: Dispatch<SetStateAction<boolean>> }>({
  menuOpen: false,
  setMenuOpen: () => {},
});

export const useHeaderMenu = () => useContext(HeaderMenuContext);

// Sticky header frame. Rendered folded, so the bar reads as one piece. Once mounted, a page at the
// top unfolds: the logo tab grows out of the bar and the logo grows into place. Once the hero has
// scrolled away the header stays folded. A shadow falls under the frame from the first pixel.
export function SiteHeaderFrame({ children }: { children: ReactNode }) {
  const [compact, setCompact] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

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
    <>
      <header
        data-compact={compact || menuOpen}
        className="group/header sticky top-0 z-40 bg-white drop-shadow-[0_6px_10px_rgb(30_34_38/0.28)]"
      >
        <HeaderMenuContext value={{ menuOpen, setMenuOpen }}>{children}</HeaderMenuContext>
      </header>
      {/* Stands in for the strip's collapsed height, so the page below never moves while it folds. */}
      <div
        aria-hidden="true"
        className={`hidden transition-[height] duration-600 ease-(--ease-out) motion-reduce:transition-none lg:block ${
          compact ? "h-[38px]" : "h-0"
        }`}
      />
    </>
  );
}
