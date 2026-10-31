"use client";

import { useEffect, useId, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import type { Pathname } from "@/i18n/routing";

type NavItem = { href: Pathname; label: string };

type Props = {
  items: NavItem[];
  label: string;
  openLabel: string;
  closeLabel: string;
  cta: { label: string; href: Pathname };
  phone: { label: string; number: string; href: string };
};

export function MainNav({ items, label, openLabel, closeLabel, cta, phone }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: Pathname) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav aria-label={label} className="flex items-center">
      <ul className="hidden items-center gap-1 lg:flex">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className="relative flex min-h-11 items-center px-3 font-semibold text-asphalt transition-colors hover:text-demal aria-[current=page]:text-demal aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-3 aria-[current=page]:after:bottom-1 aria-[current=page]:after:h-[3px] aria-[current=page]:after:bg-demal"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-11 items-center gap-2 border-2 border-asphalt px-3 font-display font-bold font-wide lg:hidden"
      >
        <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? <path d="M3 3l10 10M13 3L3 13" /> : <path d="M1 3.5h14M1 8h14M1 12.5h14" />}
        </svg>
        {open ? closeLabel : openLabel}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-rule border-b-2 border-b-asphalt bg-white lg:hidden"
      >
        <ul className="mx-auto max-w-(--container-page) px-4 py-2 sm:px-8">
          {items.map((item) => (
            <li key={item.href} className="border-b border-rule last:border-b-0">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="flex min-h-14 items-center font-display text-xl font-bold font-wide aria-[current=page]:text-demal"
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
            className="inline-flex min-h-12 items-center justify-center bg-marking px-6 font-display font-bold font-wide text-asphalt"
          >
            {cta.label}
          </Link>
        </div>
      </div>
    </nav>
  );
}
