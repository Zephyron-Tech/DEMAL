import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { photoCredits } from "@/content/photo-credits";

// Attribution for the openly licensed photographs (CC BY / CC BY-SA require it), linked from the footer.
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PhotoCredits");
  return { title: t("title"), description: t("metaDescription") };
}

export default async function PhotoCreditsPage() {
  const t = await getTranslations("PhotoCredits");
  const link = "font-semibold text-demal link-underline hover:text-demal-deep";

  return (
    <main className="mx-auto w-full max-w-(--container-page) px-4 pt-12 pb-24 sm:px-8 sm:pt-16">
      <h1 className="text-4xl font-extrabold italic uppercase">{t("title")}</h1>
      <p className="mt-4 max-w-(--container-prose) text-lg text-graphite">{t("lead")}</p>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-asphalt text-sm text-graphite">
              <th scope="col" className="py-2 pr-4 font-normal">{t("colPhoto")}</th>
              <th scope="col" className="py-2 pr-4 font-normal">{t("colAuthor")}</th>
              <th scope="col" className="py-2 pr-4 font-normal">{t("colLicense")}</th>
              <th scope="col" className="py-2 font-normal">{t("colSource")}</th>
            </tr>
          </thead>
          <tbody>
            {photoCredits.map((credit) => (
              <tr key={credit.page} className="border-b border-rule align-top">
                <th scope="row" className="py-4 pr-4 font-semibold">{credit.subject}</th>
                <td className="py-4 pr-4">{credit.creator}</td>
                <td className="py-4 pr-4">
                  <a href={credit.licenseUrl} className={link}>
                    {credit.license}
                  </a>
                </td>
                <td className="py-4">
                  <a href={credit.page} className={link}>
                    {t("source")}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
