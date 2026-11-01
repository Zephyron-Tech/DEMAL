"use client";

import { useEffect, useId, useRef } from "react";
import { useHeaderMenu } from "./site-header-frame";
import { Link, usePathname } from "@/i18n/navigation";
import type { StaticPathname } from "@/i18n/routing";

type NavItem = { href: StaticPathname; label: string };

type Props = {
  items: NavItem[];
  label: string;
  openLabel: string;
  closeLabel: string;
  cta: { label: string; href: StaticPathname };
  phone: { label: string; number: string; href: string };
};

export function MainNav({ items, label, openLabel, closeLabel, cta, phone }: Props) {
  const pathname = usePathname();
  const { menuOpen: open, setMenuOpen: setOpen } = useHeaderMenu();
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      // Focus would otherwise stay on a link inside the now hidden panel.
      buttonRef.current?.focus();
    };
    // The menu covers the screen: the page below neither scrolls nor takes focus or clicks.
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    // Everything beside the header and beside each of its ancestors up to <body>, so it also works
    // where the header sits in a wrapper (app/global-not-found.tsx).
    const covered: HTMLElement[] = [];
    for (let node = buttonRef.current?.closest("header") ?? null; node && node !== document.body; node = node.parentElement) {
      for (const sibling of node.parentElement?.children ?? []) {
        if (sibling !== node && sibling instanceof HTMLElement && !sibling.inert && sibling.tagName !== "SCRIPT") {
          covered.push(sibling);
        }
      }
    }
    covered.forEach((el) => (el.inert = true));
    // Back on a wide screen the button is gone, so the menu must not stay open.
    const wide = window.matchMedia("(min-width: 1024px)");
    const onWide = () => wide.matches && setOpen(false);
    wide.addEventListener("change", onWide);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
      html.style.overflow = previousOverflow;
      covered.forEach((el) => (el.inert = false));
    };
  }, [open, setOpen]);

  const isActive = (href: StaticPathname) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav aria-label={label} className="flex items-center">
      <ul className="hidden items-center gap-1 lg:flex xl:gap-2">
        {items.map((item) => (
          <li key={item.href}>
            {/* The bar under the current page also draws in from the left under the pointer. */}
            <Link
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className="relative flex min-h-11 items-center px-3 xl:px-2.5 font-semibold whitespace-nowrap text-asphalt transition-colors after:absolute after:inset-x-3 xl:after:inset-x-2.5 after:bottom-1 after:h-[3px] after:origin-left after:scale-x-0 after:bg-demal after:transition-transform after:duration-(--duration-ui) after:ease-out hover:text-demal hover:after:scale-x-100 aria-[current=page]:text-demal aria-[current=page]:after:scale-x-100"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((value) => !value)}
        className="press group flex size-11 items-center justify-center text-asphalt lg:hidden"
      >
        {/* Three bars fold into a cross: the outer two meet in the middle and turn, the middle one goes. */}
        <svg aria-hidden="true" viewBox="0 0 16 16" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path
            d="M1 3.5h14"
            className="origin-[8px_8px] transition-transform duration-(--duration-ui) ease-out group-aria-expanded:[transform:rotate(45deg)_translateY(4.5px)]"
          />
          <path
            d="M1 8h14"
            className="origin-[8px_8px] transition-opacity duration-(--duration-ui) group-aria-expanded:opacity-0"
          />
          <path
            d="M1 12.5h14"
            className="origin-[8px_8px] transition-transform duration-(--duration-ui) ease-out group-aria-expanded:[transform:rotate(-45deg)_translateY(-4.5px)]"
          />
        </svg>
      </button>

      {/* Fills the screen under the 72px bar. Opens as a reveal from the top on the logo tab's timing and
          leaves a little faster; @starting-style and a discrete display transition, so browsers
          without them simply show and hide it. */}
      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain bg-white transition-[clip-path,display] transition-discrete duration-600 ease-(--ease-out) [clip-path:inset(0)] starting:[clip-path:inset(0_0_100%_0)] motion-reduce:transition-none lg:hidden [&[hidden]]:[clip-path:inset(0_0_100%_0)] [&[hidden]]:duration-300 [&[hidden]]:ease-exit"
      >
        <div className="mx-auto flex min-h-full max-w-(--container-page) flex-col px-4 sm:px-8">
          <ul className="border-t-2 border-asphalt">
            {items.map((item) => (
              <li key={item.href} className="border-b border-rule">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="group/item flex min-h-18 items-center justify-between font-display text-3xl font-bold font-wide transition-colors hover:text-demal aria-[current=page]:text-demal"
                >
                  {item.label}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="size-6 text-graphite transition-[translate,color] duration-(--duration-ui) ease-out group-hover/item:translate-x-1 group-hover/item:text-demal group-aria-[current=page]/item:text-demal"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto grid gap-3 border-t-2 border-asphalt py-5 sm:grid-cols-2">
            <a href={phone.href} className="flex min-h-12 flex-col justify-center">
              <span className="text-sm text-graphite">{phone.label}</span>
              <span className="font-display text-xl font-bold font-wide tabular-nums">{phone.number}</span>
            </a>
            <Link
              href={cta.href}
              onClick={() => setOpen(false)}
              className="press inline-flex min-h-12 items-center justify-center bg-marking px-6 font-display font-bold font-wide text-asphalt hover:bg-marking-deep"
            >
              {cta.label}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
