import { getTranslations } from "next-intl/server";
import { company } from "@/lib/company";
import { LanguageSwitch } from "./language-switch";

// Utility strip at the top of the sticky header, desktop only: dispatch line and language choice.
// Once the hero has scrolled away it folds into a plain stripe, on the same timing as the logo tab.
export async function TopStrip() {
  const t = await getTranslations("Shell");

  return (
    <div className="hidden h-11 overflow-hidden bg-asphalt text-trailer transition-[height] duration-600 ease-(--ease-out) motion-reduce:transition-none group-data-[compact=true]/header:h-1.5 lg:block">
      <div className="mx-auto flex h-11 max-w-(--container-page) items-center justify-between gap-6 px-4 text-sm transition-opacity duration-300 ease-out group-data-[compact=true]/header:opacity-0 sm:px-8">
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
