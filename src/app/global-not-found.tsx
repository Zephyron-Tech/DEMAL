import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { NotFoundContent } from "@/components/not-found-content";
import { SiteFooter } from "@/components/shell/site-footer";
import { SiteHeader } from "@/components/shell/site-header";
import { routing } from "@/i18n/routing";
import { archivo, publicSans } from "./fonts";
import "./globals.css";

// Unknown URLs skip the [locale] layouts entirely, so this page brings its own <html>,
// fonts and shell. Rendered as plain HTML, without relying on client-side resume.
const locale = routing.defaultLocale;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("NotFound");
  return { title: `${t("metaTitle")} | DEMAL SPEDITION` };
}

export default function GlobalNotFound() {
  return (
    <html
      lang={locale}
      className={`${archivo.variable} ${publicSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider locale={locale}>
          <SiteHeader />
          <NotFoundContent />
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
