import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { QuoteCta } from "@/components/home/quote-cta";
import { Link } from "@/i18n/navigation";
import { company } from "@/lib/company";

// One page with anchored sections (decided in docs/sitemap.md); content from the current
// demalspedition.cz home and "O nás" pages.
const sections = [
  { key: "relace", id: "relace" },
  { key: "chlazene", id: "chlazene-prepravy" },
  { key: "walking", id: "walking-floor" },
  { key: "spedice", id: "spedice" },
  { key: "pojisteni", id: "pojisteni" },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Transport");
  return { title: t("title"), description: t("metaDescription") };
}

export default async function TransportPage() {
  const t = await getTranslations("Transport");
  const s = (path: string) => t(`sections.${path}`);
  const linkClass = "mt-5 inline-block font-semibold text-demal underline underline-offset-4";

  return (
    <main>
      <div className="mx-auto max-w-(--container-page) px-4 pt-12 sm:px-8 sm:pt-16">
        <h1 className="text-4xl font-extrabold italic uppercase">{t("title")}</h1>
        <p className="mt-4 max-w-(--container-prose) text-lg text-graphite">{t("lead")}</p>

        <nav aria-labelledby="toc-title" className="mt-10">
          <h2 id="toc-title" className="text-sm text-graphite">
            {t("tocLabel")}
          </h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="inline-flex min-h-11 items-center border-2 border-asphalt px-4 font-display font-bold font-wide transition-colors hover:bg-asphalt hover:text-trailer"
                >
                  {s(`${section.key}.title`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-14 max-w-(--container-page) px-4 pb-20 sm:px-8 sm:pb-28">
        <div className="border-t-2 border-asphalt">
          {sections.map(({ key, id }) => (
            <section
              key={id}
              id={id}
              aria-labelledby={`${id}-title`}
              className="grid scroll-mt-24 gap-4 border-b border-rule py-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12"
            >
              <h2 id={`${id}-title`} className="text-2xl font-bold italic sm:text-3xl">
                {s(`${key}.title`)}
                {key === "spedice" ? (
                  <span className="mt-1 block font-sans text-base font-semibold not-italic text-demal">
                    {s("spedice.subtitle")}
                  </span>
                ) : null}
              </h2>

              <div className="max-w-(--container-prose) text-lg">
                {key === "relace" || key === "walking" ? (
                  <>
                    <p>{s(`${key}.p1`)}</p>
                    <p className="mt-4 text-graphite">{s(`${key}.p2`)}</p>
                  </>
                ) : null}

                {key === "walking" ? (
                  <Link href="/drevni-material" className={linkClass}>
                    {s("walking.link")}
                  </Link>
                ) : null}

                {key === "chlazene" ? (
                  <>
                    <p>{s("chlazene.p1")}</p>
                    <ul className="mt-5 border-t border-rule text-base">
                      {(["a", "b", "c"] as const).map((point) => (
                        <li key={point} className="border-b border-rule py-3">
                          {s(`chlazene.points.${point}`)}
                        </li>
                      ))}
                    </ul>
                    <Link href="/vozovy-park" className={linkClass}>
                      {s("chlazene.link")}
                    </Link>
                  </>
                ) : null}

                {key === "spedice" ? (
                  <>
                    <p>{s("spedice.p1")}</p>
                    <p className="mt-5 text-base text-graphite">
                      {s("spedice.call")}
                      <a
                        href={company.dispatch.phoneHref}
                        className="mt-1 block font-display text-2xl font-bold font-wide whitespace-nowrap text-asphalt tabular-nums underline-offset-4 hover:underline"
                      >
                        {company.dispatch.phone}
                      </a>
                    </p>
                  </>
                ) : null}

                {key === "pojisteni" ? (
                  <ul className="border-t border-rule text-base">
                    {(["a", "b", "c"] as const).map((point) => (
                      <li key={point} className="border-b border-rule py-3">
                        {s(`pojisteni.points.${point}`)}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}
        </div>
      </div>

      <QuoteCta />
    </main>
  );
}
