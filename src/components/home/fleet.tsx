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
      className="mx-auto mt-16 grid max-w-(--container-page) gap-8 px-4 sm:mt-32 sm:gap-10 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16"
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

        {/* Below sm the rows stack (name, makes, use) because two columns leave 150 px each. The roles
            keep the table semantics for assistive tech when the display is no longer table. */}
        <table
          role="table"
          className="mt-6 w-full border-collapse text-left max-sm:block sm:mt-8"
        >
          <caption className="sr-only">{t("tableCaption")}</caption>
          <thead role="rowgroup" className="max-sm:sr-only">
            <tr role="row" className="border-b-2 border-asphalt text-sm text-graphite">
              <th role="columnheader" scope="col" className="w-[48%] py-2 pr-4 font-normal">
                {t("colVehicle")}
              </th>
              <th role="columnheader" scope="col" className="py-2 font-normal">
                {t("colUse")}
              </th>
            </tr>
          </thead>
          <tbody role="rowgroup" className="max-sm:block">
            {rows.map((row) => (
              <tr key={row} role="row" className="border-b border-rule align-top max-sm:block max-sm:py-4">
                <th role="rowheader" scope="row" className="py-4 pr-4 font-normal max-sm:block max-sm:p-0">
                  <span className="block font-display text-base font-bold font-wide sm:text-lg">
                    {t(`rows.${row}`)}
                  </span>
                  <span className="text-sm text-graphite">{t(`rows.${row}Makes`)}</span>
                </th>
                <td role="cell" className="py-4 max-sm:mt-2 max-sm:block max-sm:p-0">{t(`rows.${row}Use`)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Link
          href="/vozovy-park"
          className="mt-6 flex min-h-12 w-full items-center justify-between border-2 border-asphalt px-4 font-display font-bold font-wide press hover:bg-asphalt hover:text-trailer sm:mt-8 sm:inline-flex sm:w-auto sm:px-6"
        >
          {t("link")}
          <span aria-hidden="true" className="h-0.5 w-6 bg-current sm:hidden" />
        </Link>
      </div>
    </section>
  );
}
