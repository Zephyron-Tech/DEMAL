import { getTranslations } from "next-intl/server";
import { MaterialTiles } from "@/components/material-tiles";
import { Link } from "@/i18n/navigation";

export async function Materials() {
  const t = await getTranslations("Home.materials");

  return (
    <section
      aria-labelledby="materials-title"
      className="mx-auto mt-24 max-w-(--container-page) px-4 sm:mt-32 sm:px-8"
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
        <h2 id="materials-title" className="text-3xl font-extrabold italic">
          {t("title")}
        </h2>
        <div>
          <p className="max-w-[46ch] text-graphite">{t("lead")}</p>
          <Link
            href="/drevni-material"
            className="mt-3 inline-block font-display font-bold font-wide text-demal underline decoration-2 underline-offset-6 hover:text-demal-deep"
          >
            {t("link")}
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <MaterialTiles />
      </div>
    </section>
  );
}
