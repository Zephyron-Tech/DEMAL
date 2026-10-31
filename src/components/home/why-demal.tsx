import { getTranslations } from "next-intl/server";
import { company } from "@/lib/company";

// Each claim carries its proof, set like a note in the margin of a document.
// Sources: current demalspedition.cz ("O nás") and ARES; the owner confirms them via /podklady.
const reasons = ["own", "insured", "direct"] as const;

export async function WhyDemal() {
  const t = await getTranslations("Home.why");

  return (
    <section aria-labelledby="why-title" className="mt-24 bg-plate sm:mt-32">
      <div className="mx-auto max-w-(--container-page) px-4 py-16 sm:px-8 sm:py-20">
        <h2 id="why-title" className="text-3xl font-extrabold italic">
          {t("title")}
        </h2>
        <ul className="mt-10 border-t-2 border-asphalt">
          {reasons.map((reason) => (
            <li
              key={reason}
              className="grid gap-3 border-b border-rule py-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,5fr)_minmax(0,3fr)] lg:gap-10"
            >
              <h3 className="text-2xl font-bold italic">{t(`${reason}.claim`)}</h3>
              <p className="max-w-(--container-prose) text-graphite">{t(`${reason}.body`)}</p>
              <p className="border-l-2 border-demal pl-4 text-sm">
                <span className="block text-graphite">{t("proofLabel")}</span>
                {reason === "direct" ? (
                  <a
                    href={company.dispatch.phoneHref}
                    className="font-semibold tabular-nums underline-offset-4 hover:underline"
                  >
                    {t("direct.proof", { phone: company.dispatch.phone })}
                  </a>
                ) : (
                  <span className="font-semibold">{t(`${reason}.proof`)}</span>
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
