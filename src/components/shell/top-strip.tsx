import { getTranslations } from "next-intl/server";
import { company } from "@/lib/company";
import { LanguageSwitch } from "./language-switch";

// Utility strip above the header, desktop only: the dispatch line and the language choice. It sits
// in the page flow and scrolls away, so the sticky bar below keeps its height and fold.
export async function TopStrip() {
  const t = await getTranslations("Shell");

  return (
    <div className="hidden bg-asphalt text-trailer lg:block">
      <div className="mx-auto flex h-11 max-w-(--container-page) items-center justify-between gap-6 px-4 text-sm sm:px-8">
        <div className="flex items-center gap-6">
          <a href={company.dispatch.phoneHref} className="flex items-center gap-2 link-reveal">
            <span className="text-rule">{t("dispatch")}</span>
            <span className="font-semibold tabular-nums">{company.dispatch.phone}</span>
          </a>
          <a href={`mailto:${company.dispatch.email}`} className="link-reveal">
            {company.dispatch.email}
          </a>
        </div>
        <LanguageSwitch dark />
      </div>
    </div>
  );
}
