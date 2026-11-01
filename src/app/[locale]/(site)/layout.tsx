import { getTranslations } from "next-intl/server";
import { SiteFooter } from "@/components/shell/site-footer";
import { ScrollToTop } from "@/components/shell/scroll-to-top";
import { SiteHeader } from "@/components/shell/site-header";

export default async function SiteLayout({ children }: LayoutProps<"/[locale]">) {
  const t = await getTranslations("Shell");

  return (
    <>
      <a
        href="#obsah"
        className="sr-only z-50 bg-marking px-4 py-3 font-semibold text-asphalt focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        {t("skipToContent")}
      </a>
      <SiteHeader />
      <div id="obsah" tabIndex={-1} className="flex flex-1 flex-col outline-none">
        {children}
      </div>
      <SiteFooter />
      <ScrollToTop label={t("toTop")} />
    </>
  );
}
