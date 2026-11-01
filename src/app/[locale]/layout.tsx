import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { ogLocale } from "@/i18n/alternates";
import { routing } from "@/i18n/routing";
import { isIndexable, siteUrl } from "@/lib/site";
import { archivo, publicSans } from "../fonts";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Matches the white header so the mobile browser bar blends in.
export const viewport: Viewport = { themeColor: "#ffffff" };

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  const locale = await getLocale();
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t("title"), template: "%s | DEMAL SPEDITION" },
    description: t("description"),
    openGraph: {
      type: "website",
      siteName: "DEMAL SPEDITION s.r.o.",
      locale: ogLocale[locale] ?? ogLocale.cs,
    },
    robots: isIndexable ? undefined : { index: false, follow: false },
  };
}

export default async function LocaleLayout({
  children,
}: LayoutProps<"/[locale]">) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${publicSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
