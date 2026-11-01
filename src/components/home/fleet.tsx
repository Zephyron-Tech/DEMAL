import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import tractors from "../../../public/images/tahace-scania.jpg";

// Makes and trailer types from the current demalspedition.cz "Vozový park" page.
const rows = ["reefer", "walking", "tractors"] as const;

export async function Fleet() {
  const t = await getTranslations("Home.fleet");

  return (
    <section
      aria-labelledby="fleet-title"
      className="mx-auto mt-24 grid max-w-(--container-page) gap-10 px-4 sm:mt-32 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-plate">
        <Image
          src={tractors}
          alt={t("photoAlt")}
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-[50%_65%]"
        />
      </div>

      <div>
        <h2 id="fleet-title" className="text-3xl font-extrabold italic">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-md text-graphite">{t("lead")}</p>

        <table className="mt-8 w-full border-collapse text-left">
          <caption className="sr-only">{t("tableCaption")}</caption>
          <thead>
            <tr className="border-b-2 border-asphalt text-sm text-graphite">
              <th scope="col" className="w-[48%] py-2 pr-4 font-normal">
                {t("colVehicle")}
              </th>
              <th scope="col" className="py-2 font-normal">
                {t("colUse")}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row} className="border-b border-rule align-top">
                <th scope="row" className="py-4 pr-4 font-normal">
                  <span className="block font-display text-lg font-bold font-wide">
                    {t(`rows.${row}`)}
                  </span>
                  <span className="text-sm text-graphite">{t(`rows.${row}Makes`)}</span>
                </th>
                <td className="py-4">{t(`rows.${row}Use`)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Link
          href="/vozovy-park"
          className="mt-8 inline-flex min-h-12 items-center border-2 border-asphalt px-6 font-display font-bold font-wide press hover:bg-asphalt hover:text-trailer"
        >
          {t("link")}
        </Link>
      </div>
    </section>
  );
}
