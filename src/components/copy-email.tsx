"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "copied" | "failed";

// An e-mail address that copies itself on click. The label swaps to "Zkopírováno" with a check
// for two seconds, the swap fades in, and a live region announces the result for screen readers.
// `inline` is for running text in the legal notice; `field` is for the contact fields.
export function CopyEmail({
  email,
  variant = "field",
  className = "",
}: {
  email: string;
  variant?: "field" | "inline";
  className?: string;
}) {
  const t = useTranslations("Shell");
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    let next: Status = "copied";
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      next = "failed";
    }
    setStatus(next);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus("idle"), 2000);
  }

  const label = status === "copied" ? t("copied") : status === "failed" ? t("copyFailed") : email;

  return (
    <>
    <button
      type="button"
      onClick={copy}
      title={t("copyEmail")}
      className={`${className} ${
        variant === "inline" ? "font-semibold text-demal link-underline" : "text-left link-reveal"
      }`}
    >
      <span key={status} className="inline-flex items-center gap-2 break-all motion-safe:animate-field-in">
        {status === "idle" ? (
          <>
            {email}
            {variant === "field" ? <CopyIcon /> : null}
          </>
        ) : (
          <>
            {status === "copied" ? <CheckIcon /> : null}
            {label}
          </>
        )}
      </span>
    </button>
    {/* Announces the result for screen readers; kept outside the button so its name stays the address. */}
    <span role="status" className="sr-only">
      {status === "copied" ? t("copied") : status === "failed" ? t("copyFailed") : ""}
    </span>
    </>
  );
}

// Lucide copy and check icons (ISC licence).
function CopyIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 shrink-0 opacity-70" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="8" width="14" height="14" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
