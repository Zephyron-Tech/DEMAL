"use client";

import type { ReactNode } from "react";
import { Link, usePathname } from "@/i18n/navigation";

// Logo link. On the homepage it glides back to the top instead of reloading the route.
export function HomeLink({
  label,
  className,
  children,
}: {
  label: string;
  className: string;
  children: ReactNode;
}) {
  const pathname = usePathname();

  function onClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname !== "/" || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <Link href="/" className={className} aria-label={label} onClick={onClick}>
      {children}
    </Link>
  );
}
