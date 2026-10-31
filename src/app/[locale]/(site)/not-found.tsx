import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Pathname } from "@/i18n/routing";
import { company } from "@/lib/company";

export default async function NotFound() {
  const t = await getTranslations("NotFound");
  const nav = await getTranslations("Nav");

  const links: { href: Pathname; label: string }[] = [
    { href: "/", label: t("home") },
    { href: "/doprava", label: nav("doprava") },
    { href: "/vozovy-park", label: nav("vozovyPark") },
    { href: "/kontakt", label: nav("kontakt") },
  ];

  return (
    <main className="mx-auto w-full max-w-(--container-page) flex-1 px-4 py-16 sm:px-8 sm:py-24">
      <title>{`${t("metaTitle")} | DEMAL SPEDITION`}</title>
      <p className="font-display text-lg font-bold font-wide text-demal">{t("code")}</p>
      <h1 className="mt-2 text-4xl font-extrabold italic uppercase">{t("title")}</h1>
      <p className="mt-4 max-w-(--container-prose) text-lg text-graphite">{t("text")}</p>
      <ul className="mt-8 flex flex-wrap gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex min-h-11 items-center border-2 border-asphalt px-4 font-display font-bold font-wide transition-colors hover:bg-asphalt hover:text-trailer"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <a
        href={company.dispatch.phoneHref}
        className="mt-8 inline-block font-display text-2xl font-bold font-wide tabular-nums underline-offset-4 hover:underline"
      >
        {company.dispatch.phone}
      </a>
    </main>
  );
}
