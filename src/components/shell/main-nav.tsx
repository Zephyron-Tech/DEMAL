"use client";

import { LanguageSwitch } from "./language-switch";
import { useEffect, useId, useRef, useState } from "react";
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
  const [open, setOpen] = useState(false);
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
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

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

      {/* Drops 8px into place as it opens and leaves a little faster; @starting-style and a discrete
          display transition, so browsers without them simply show and hide it. */}
      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-t border-rule border-b-2 border-b-asphalt bg-white transition-[opacity,translate,display] transition-discrete duration-(--duration-ui) ease-out starting:-translate-y-2 starting:opacity-0 lg:hidden [&[hidden]]:-translate-y-2 [&[hidden]]:opacity-0 [&[hidden]]:duration-150 [&[hidden]]:ease-exit"
      >
        <ul className="mx-auto max-w-(--container-page) px-4 py-2 sm:px-8">
          {items.map((item) => (
            <li key={item.href} className="border-b border-rule last:border-b-0">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="flex min-h-14 items-center font-display text-xl font-bold font-wide transition-colors hover:text-demal aria-[current=page]:text-demal"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mx-auto grid max-w-(--container-page) gap-3 border-t-2 border-asphalt px-4 py-5 sm:grid-cols-2 sm:px-8">
          <a href={phone.href} className="flex min-h-12 flex-col justify-center">
            <span className="text-sm text-graphite">{phone.label}</span>
            <span className="font-display text-lg font-bold font-wide tabular-nums">
              {phone.number}
            </span>
          </a>
          <Link
            href={cta.href}
            onClick={() => setOpen(false)}
            className="press inline-flex min-h-12 items-center justify-center bg-marking px-6 font-display font-bold font-wide text-asphalt hover:bg-marking-deep"
          >
            {cta.label}
          </Link>
        </div>
        <div className="mx-auto max-w-(--container-page) border-t border-rule px-4 py-3 sm:px-8">
          <LanguageSwitch />
        </div>
      </div>
    </nav>
  );
}
