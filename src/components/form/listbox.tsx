"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { fieldClass, popupClass } from "./field-styles";

export type ListboxOption = { value: string; label: string };

const POPUP_HEIGHT = 240;

// Custom select. A combobox keeps focus and drives a listbox popup, so it reads and submits like
// a native select: arrows move, Enter or Space choose, Escape closes. The popup opens upwards when
// there is no room below the field.
export function Listbox({
  id,
  name,
  options,
  defaultValue,
  onChange,
  "aria-invalid": invalid,
  "aria-describedby": describedBy,
}: {
  id: string;
  name: string;
  options: ListboxOption[];
  defaultValue: string;
  onChange?: (value: string) => void;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
}) {
  const listId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [flip, setFlip] = useState(false);
  const selected = Math.max(0, options.findIndex((o) => o.value === value));

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  function show() {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (rect) {
      const below = window.innerHeight - rect.bottom;
      setFlip(below < POPUP_HEIGHT && rect.top > below);
    }
    setActive(selected);
    setOpen(true);
  }

  function choose(index: number) {
    const next = options[index].value;
    setValue(next);
    onChange?.(next);
    setOpen(false);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        show();
      }
      return;
    }
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActive((a) => Math.min(a + 1, options.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setActive(0);
        break;
      case "End":
        event.preventDefault();
        setActive(options.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        choose(active);
        break;
      case "Escape":
        event.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  return (
    <div ref={wrapRef} className="relative">
      <div
        id={id}
        role="combobox"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={`${id}-label`}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKeyDown}
        className={`${fieldClass} flex cursor-pointer items-center justify-between gap-3 text-left`}
      >
        <span>{options[selected].label}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={`size-4 shrink-0 transition-transform duration-(--duration-ui) ease-(--ease-out) ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
      <input type="hidden" name={name} value={value} />
      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={`${id}-label`}
          className={`${popupClass} max-h-60 w-full overflow-y-auto py-1 ${flip ? "bottom-full mb-1" : "top-full mt-1"}`}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            return (
              <li
                key={option.value}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={isSelected}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => choose(index)}
                onPointerEnter={() => setActive(index)}
                className={`flex min-h-11 cursor-pointer items-center justify-between gap-3 px-3 py-2 ${
                  index === active ? "bg-plate" : ""
                } ${isSelected ? "font-semibold text-demal" : ""}`}
              >
                <span>{option.label}</span>
                {isSelected ? (
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
