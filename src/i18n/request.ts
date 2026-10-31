import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import * as rootParams from "next/root-params";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    const paramValue = await rootParams.locale();
    // No [locale] segment at all (app/global-not-found.tsx): fall back to the default.
    if (paramValue === undefined) locale = routing.defaultLocale;
    else if (hasLocale(routing.locales, paramValue)) locale = paramValue;
    else notFound();
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
