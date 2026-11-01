"use client";

import { useState } from "react";

// Set once the first page has rendered in this tab.
let firstRender = true;

// A template remounts on every navigation within the site, so the page rises in each time it
// changes. Not on the first load: the rise starts from opacity 0 and would hold back the hero
// photograph, the LCP element. The header and footer stay in the layout.
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => {
    if (typeof window === "undefined") return false;
    const navigated = !firstRender;
    firstRender = false;
    return navigated;
  });

  return (
    <div className={`flex flex-1 flex-col ${animate ? "motion-safe:animate-page-in" : ""}`}>{children}</div>
  );
}
