"use client";

import { useEffect } from "react";

// app/global-not-found.tsx: hydration puts the prerendered Czech <title> back, so once the page is
// live the title follows the language the <head> script picked (html[data-locale]).
export function VariantTitle({ titles }: { titles: Record<string, string> }) {
  useEffect(() => {
    const title = titles[document.documentElement.dataset.locale ?? ""];
    if (title) document.title = title;
  }, [titles]);
  return null;
}
