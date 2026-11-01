"use client";

import { useEffect, useRef, useState } from "react";

const SHOW_AFTER = 600;

// Reads the colour of whatever sits under the button: the first element around its centre that
// paints a background, walking up through transparent ancestors. Returns true for dark surfaces.
function isDarkUnder(button: HTMLElement) {
  const rect = button.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const below = document.elementsFromPoint(x, y).find((el) => !button.contains(el));
  let el: Element | null = below ?? null;
  while (el) {
    const match = getComputedStyle(el).backgroundColor.match(/[\d.]+/g);
    if (match && (match.length < 4 || Number(match[3]) > 0.5)) {
      const [r, g, b] = match.map(Number);
      return 0.2126 * r + 0.7152 * g + 0.0722 * b < 140;
    }
    el = el.parentElement;
  }
  return false;
}

// Floating button for returning to the top of any page. It fades in once the page is scrolled
// well past the first screen, glides up unless reduced motion is requested, and switches colour
// over dark surfaces so it never disappears into the footer.
export function ScrollToTop({ label }: { label: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setVisible(window.scrollY > SHOW_AFTER);
        if (ref.current) setDark(isDarkUnder(ref.current));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function toTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  const tone = dark
    ? "bg-marking text-asphalt hover:bg-marking-deep"
    : "bg-asphalt text-trailer hover:bg-demal";

  return (
    <button
      ref={ref}
      type="button"
      onClick={toTop}
      aria-label={label}
      tabIndex={visible ? 0 : -1}
      className={`focus-on-dark press fixed cursor-pointer right-4 bottom-4 z-30 flex size-12 items-center justify-center shadow-[0_6px_16px_rgb(30_34_38/0.3)] transition-[opacity,translate,visibility,background-color,color] duration-300 ease-(--ease-out) motion-reduce:transition-none sm:right-8 sm:bottom-8 ${tone} ${
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
