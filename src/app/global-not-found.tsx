import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { NotFoundContent } from "@/components/not-found-content";
import { SiteFooter } from "@/components/shell/site-footer";
import { SiteHeader } from "@/components/shell/site-header";
import { VariantTitle } from "@/components/variant-title";
import { clientMessages } from "@/i18n/client-messages";
import { routing } from "@/i18n/routing";
import { archivo, publicSans } from "./fonts";
import "./globals.css";

// Unknown URLs skip the [locale] layouts entirely, so this page brings its own <html>, fonts and
// shell. It is prerendered once, as plain HTML, so it cannot know the request's language: it holds
// the page in every language and a script in <head> shows the one the URL prefix asks for
// (/de/…, /en/…) before the first paint. Without script the Czech page shows.
export default async function GlobalNotFound() {
  const titles = Object.fromEntries(
    await Promise.all(
      routing.locales.map(async (locale) => {
        const t = await getTranslations({ locale, namespace: "NotFound" });
        return [locale, `${t("metaTitle")} | DEMAL SPEDITION`];
      }),
    ),
  );
  const prefixed = routing.locales.filter((locale) => locale !== routing.defaultLocale).join("|");
  const pick = `(function(){var m=location.pathname.match(/^\\/(${prefixed})(\\/|$)/),l=m?m[1]:${JSON.stringify(routing.defaultLocale)},t=${JSON.stringify(titles).replace(/</g, "\\u003c")};document.documentElement.lang=l;document.documentElement.dataset.locale=l;document.title=t[l];})();`;
  const show = routing.locales
    .map((locale) => `html[data-locale="${locale}"] [data-variant="${locale}"]`)
    .concat(`html:not([data-locale]) [data-variant="${routing.defaultLocale}"]`)
    .join(",");

  return (
    <html
      lang={routing.defaultLocale}
      // The script below sets lang and data-locale before React sees the page.
      suppressHydrationWarning
      className={`${archivo.variable} ${publicSans.variable} h-full antialiased`}
    >
      <head>
        <title>{titles[routing.defaultLocale]}</title>
        <style>{`[data-variant]{display:none}${show}{display:flex}`}</style>
        <script dangerouslySetInnerHTML={{ __html: pick }} />
      </head>
      <body className="min-h-full flex flex-col">
        <VariantTitle titles={titles} />
        {await Promise.all(
          routing.locales.map(async (locale) => (
            <div key={locale} data-variant={locale} lang={locale} className="min-h-full flex-1 flex-col">
              <NextIntlClientProvider locale={locale} messages={clientMessages(await getMessages({ locale }))}>
                <SiteHeader locale={locale} />
                <NotFoundContent locale={locale} />
                <SiteFooter locale={locale} />
              </NextIntlClientProvider>
            </div>
          )),
        )}
      </body>
    </html>
  );
}
