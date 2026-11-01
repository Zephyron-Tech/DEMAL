import { getTranslations } from "next-intl/server";
import { company } from "@/lib/company";

// Each reason leads with the fact that backs it, set large; the claim and its explanation follow.
// Sources: current demalspedition.cz ("O nás") and ARES; the owner confirms them via /podklady.
const reasons = ["own", "insured", "direct"] as const;

export async function WhyDemal() {
  const t = await getTranslations("Home.why");

  return (
    <section aria-labelledby="why-title" className="mt-16 bg-plate sm:mt-32">
      <div className="mx-auto max-w-(--container-page) px-4 py-12 sm:px-8 sm:py-20">
        <h2 id="why-title" className="text-3xl font-extrabold italic">
          {t("title")}
        </h2>
        <ul className="mt-8 border-t-2 border-asphalt sm:mt-10">
          {reasons.map((reason) => (
            <li
              key={reason}
              className="grid gap-4 border-b border-rule py-6 sm:py-10 lg:grid-cols-2 lg:items-center lg:gap-16"
            >
              <div>
                {reason === "direct" ? (
                  <a
                    href={company.dispatch.phoneHref}
                    className="font-display max-lg:inline-flex max-lg:min-h-11 max-lg:items-center text-2xl sm:text-3xl leading-none font-extrabold italic font-wide whitespace-nowrap text-demal tabular-nums link-reveal"
                  >
                    {company.dispatch.phone}
                  </a>
                ) : (
                  <p className="font-display text-5xl leading-none font-extrabold italic font-wide text-demal">
                    {t(`${reason}.figure`)}
                  </p>
                )}
                <p className="mt-3 text-graphite">{t(`${reason}.caption`)}</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold italic">{t(`${reason}.claim`)}</h3>
                <p className="mt-2 max-w-(--container-prose) text-base sm:text-lg">{t(`${reason}.body`)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
