"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { fieldClass, popupClass } from "./field-styles";

export type DateLabels = {
  choose: string;
  prev: string;
  next: string;
  clear: string;
  today: string;
};

const POPUP_HEIGHT = 380;
// Placeholder month for the prerendered page: the real current date is read only when the calendar opens.
const EPOCH = new Date(2000, 0, 1);
// 3 January 2000 was a Monday, which anchors the weekday labels.
const EPOCH_MONDAY = new Date(2000, 0, 3);
const pad = (n: number) => String(n).padStart(2, "0");
const toIso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromIso = (s: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null;
};
const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const addMonths = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth() + n, 1);

// Custom date field. Submits the same YYYY-MM-DD value as a native date input. The calendar opens
// below the field (or above when there is no room), starts weeks on Monday, and follows the
// keyboard: arrows move by day and week, PageUp and PageDown by month, Escape closes.
export function DateField({
  id,
  name,
  locale,
  labels,
  defaultValue,
  "aria-invalid": invalid,
  "aria-describedby": describedBy,
}: {
  id: string;
  name: string;
  locale: string;
  labels: DateLabels;
  defaultValue: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
}) {
  const dialogId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const initial = fromIso(defaultValue);
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [flip, setFlip] = useState(false);
  const [focused, setFocused] = useState<Date>(initial ?? EPOCH);
  const [view, setView] = useState<Date>(startOfMonth(initial ?? EPOCH));

  const selected = fromIso(value);
  const dayFormat = new Intl.DateTimeFormat(locale, { day: "numeric", month: "numeric", year: "numeric" });
  const titleFormat = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" });
  const weekdayFormat = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const dayLabelFormat = new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  // Keep keyboard focus on the day the calendar is showing, after every move.
  useEffect(() => {
    if (!open) return;
    gridRef.current?.querySelector<HTMLButtonElement>("button[tabindex='0']")?.focus();
  }, [open, focused]);

  function show() {
    const base = fromIso(value) ?? new Date();
    const rect = wrapRef.current?.getBoundingClientRect();
    if (rect) {
      const below = window.innerHeight - rect.bottom;
      setFlip(below < POPUP_HEIGHT && rect.top > below);
    }
    setFocused(base);
    setView(startOfMonth(base));
    setOpen(true);
  }

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  function pick(date: Date | null) {
    setValue(date ? toIso(date) : "");
    if (date) setFocused(date);
    close();
  }

  function move(next: Date) {
    setFocused(next);
    if (next.getMonth() !== view.getMonth() || next.getFullYear() !== view.getFullYear()) {
      setView(startOfMonth(next));
    }
  }

  function onGridKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const moves: Record<string, () => Date> = {
      ArrowLeft: () => addDays(focused, -1),
      ArrowRight: () => addDays(focused, 1),
      ArrowUp: () => addDays(focused, -7),
      ArrowDown: () => addDays(focused, 7),
      PageUp: () => addMonths(focused, -1),
      PageDown: () => addMonths(focused, 1),
    };
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (moves[event.key]) {
      event.preventDefault();
      move(moves[event.key]());
    }
  }

  // Monday-first grid of six weeks around the visible month.
  const offset = (view.getDay() + 6) % 7;
  const gridStart = addDays(view, -offset);
  const days = Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));
  const weekdays = Array.from({ length: 7 }, (_, i) => weekdayFormat.format(addDays(EPOCH_MONDAY, i)));
  const today = open ? new Date() : EPOCH;

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        id={id}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={dialogId}
        aria-labelledby={`${id}-label ${id}-value`}
        aria-describedby={describedBy}
        onClick={() => (open ? close() : show())}
        className={`${fieldClass} flex cursor-pointer items-center justify-between gap-3 text-left ${invalid ? "border-alert border-b-alert" : ""}`}
      >
        <span id={`${id}-value`} className={selected ? "" : "text-steel"}>
          {selected ? dayFormat.format(selected) : labels.choose}
        </span>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3.5" y="5" width="17" height="15.5" />
          <path d="M3.5 10h17M8 3v4M16 3v4" />
        </svg>
      </button>
      <input type="hidden" name={name} value={value} />
      {open ? (
        <div
          id={dialogId}
          role="dialog"
          aria-label={labels.choose}
          onKeyDown={onGridKeyDown}
          className={`${popupClass} w-[18.5rem] max-w-[calc(100vw-2rem)] p-3 ${flip ? "bottom-full mb-1" : "top-full mt-1"}`}
        >
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              aria-label={labels.prev}
              onClick={() => move(addMonths(focused, -1))}
              className="press flex size-11 items-center justify-center hover:bg-plate"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <p className="font-display text-sm font-bold capitalize font-wide" aria-live="polite">
              {titleFormat.format(view)}
            </p>
            <button
              type="button"
              aria-label={labels.next}
              onClick={() => move(addMonths(focused, 1))}
              className="press flex size-11 items-center justify-center hover:bg-plate"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
          <div className="mt-2 grid grid-cols-7 text-center text-xs text-graphite" aria-hidden="true">
            {weekdays.map((day) => (
              <span key={day} className="py-1 capitalize">
                {day}
              </span>
            ))}
          </div>
          <div ref={gridRef} role="group" aria-label={titleFormat.format(view)} className="mt-1 grid grid-cols-7 gap-1">
            {days.map((day) => {
              const isSelected = selected ? sameDay(day, selected) : false;
              const isToday = sameDay(day, today);
              const outside = day.getMonth() !== view.getMonth();
              return (
                <button
                  key={toIso(day)}
                  type="button"
                  tabIndex={sameDay(day, focused) ? 0 : -1}
                  aria-label={dayLabelFormat.format(day)}
                  aria-pressed={isSelected}
                  onClick={() => pick(day)}
                  className={`flex size-10 items-center justify-center text-sm tabular-nums transition-colors ${
                    isSelected
                      ? "bg-asphalt font-bold text-trailer"
                      : isToday
                        ? "border-2 border-demal font-semibold"
                        : "hover:bg-plate"
                  } ${outside && !isSelected ? "text-steel" : ""}`}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-rule pt-2">
            <button type="button" onClick={() => pick(null)} className="press min-h-11 px-2 text-sm font-semibold text-alert link-underline">
              {labels.clear}
            </button>
            <button type="button" onClick={() => pick(today)} className="press min-h-11 px-2 text-sm font-semibold text-demal link-underline">
              {labels.today}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
