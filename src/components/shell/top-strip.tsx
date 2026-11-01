import { getTranslations } from "next-intl/server";
import { company } from "@/lib/company";
import { LanguageSwitch } from "./language-switch";
import { CopyEmail } from "@/components/copy-email";

// Utility strip at the top of the sticky header. On phones it is a thin stripe with no text; the
// number is in the menu. On desktop it also carries the e-mail and the language choice, and it folds into a
// stripe once the hero has scrolled away, on the same timing as the logo tab.
export async function TopStrip() {
  const t = await getTranslations("Shell");

  return (
    <div className="h-1.5 overflow-hidden bg-asphalt text-trailer transition-[height] duration-600 ease-(--ease-out) motion-reduce:transition-none lg:h-11 lg:group-data-[compact=true]/header:h-1.5">
      <div className="mx-auto hidden h-full max-w-(--container-page) items-center justify-between gap-6 px-4 text-sm transition-opacity duration-300 ease-out lg:flex lg:group-data-[compact=true]/header:opacity-0 sm:px-8">
        <div className="flex items-center gap-6">
          <a href={company.dispatch.phoneHref} className="flex items-center gap-2 link-reveal">
            <span className="text-rule max-sm:sr-only">{t("dispatch")}</span>
            <span className="font-semibold tabular-nums">{company.dispatch.phone}</span>
          </a>
          <CopyEmail email={company.dispatch.email} className="hidden lg:inline" />
        </div>
        <LanguageSwitch dark className="hidden lg:block" />
      </div>
    </div>
  );
}
