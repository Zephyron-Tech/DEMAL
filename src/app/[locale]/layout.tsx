import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import ogImage from "@/content/og-image.jpg";
import { ogLocale } from "@/i18n/alternates";
import { clientMessages } from "@/i18n/client-messages";
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
  const image = { url: ogImage.src, width: ogImage.width, height: ogImage.height, alt: t("ogImageAlt") };
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t("title"), template: "%s | DEMAL SPEDITION" },
    description: t("description"),
    openGraph: {
      type: "website",
      siteName: "DEMAL SPEDITION s.r.o.",
      locale: ogLocale[locale] ?? ogLocale.cs,
      images: [image],
    },
    twitter: { card: "summary_large_image", images: [image] },
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
        <NextIntlClientProvider messages={clientMessages(await getMessages())}>{children}</NextIntlClientProvider>
        {/* Cookieless page-view counts only; no consent banner needed. See the privacy page. */}
        <Analytics />
      </body>
    </html>
  );
}
