import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { company } from "@/lib/company";

// Placeholder pages say plainly that details are coming and still lead to an enquiry.
export async function PendingNotice({ ctaLabel }: { ctaLabel?: string }) {
  const t = await getTranslations("Materials");

  return (
    <section aria-labelledby="pending-title" className="bg-plate px-6 py-8 sm:px-10 sm:py-10">
      <h2 id="pending-title" className="text-2xl font-bold italic">
        {t("pendingTitle")}
      </h2>
      <p className="mt-3 max-w-[56ch]">{t("pendingText")}</p>
      <div className="mt-6 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-4">
        <Link
          href={{ pathname: "/poptavka", query: { typ: "drevo" } }}
          className="inline-flex min-h-12 w-full items-center justify-center bg-marking px-6 py-2 text-center text-balance font-display font-bold font-wide text-asphalt press hover:bg-marking-deep sm:w-auto"
        >
          {ctaLabel ?? t("cta")}
        </Link>
        <p className="text-graphite">
          {t("call")}{" "}
          <a
            href={company.dispatch.phoneHref}
            className="font-display font-bold font-wide whitespace-nowrap text-asphalt tabular-nums link-reveal"
          >
            {company.dispatch.phone}
          </a>
        </p>
      </div>
    </section>
  );
}
