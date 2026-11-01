import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { company } from "@/lib/company";
import logo from "../../../public/logo.png";
import { MainNav } from "./main-nav";

export async function SiteHeader() {
  const t = await getTranslations("Shell");
  const nav = await getTranslations("Nav");

  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="relative mx-auto flex h-18 max-w-(--container-page) items-center justify-between gap-6 px-4 sm:px-8">
        {/* The logo tab hangs below the bar. Its fillets, sides and rounded bottom are one SVG path
            in the bar's white, so bar and tab are a single shape with no seam. */}
        <Link href="/" className="relative flex w-[150px] shrink-0 self-stretch items-center justify-center" aria-label={t("homeLink")}>
          <svg
            aria-hidden="true"
            viewBox="0 -1 178 29"
            className="pointer-events-none absolute -left-3.5 top-[71px] h-[29px] w-[178px]"
          >
            <path
              fill="#fff"
              d="M0,-1 L0,0 A14,14 0 0 1 14,14 V18 A10,10 0 0 0 24,28 H154 A10,10 0 0 0 164,18 V14 A14,14 0 0 1 178,0 L178,-1 Z"
            />
          </svg>
          {/* The raster logo has a near-white background: contrast pushes it to pure white and
              multiply lets it merge into the tab. */}
          <Image
            src={logo}
            alt=""
            loading="eager"
            sizes="150px"
            className="relative h-16 w-auto contrast-[1.15] mix-blend-multiply"
          />
        </Link>

        <div className="flex items-center gap-3 lg:gap-6">
          <a
            href={company.dispatch.phoneHref}
            aria-label={`${t("dispatch")} ${company.dispatch.phone}`}
            className="press flex size-11 items-center justify-center border-2 border-asphalt lg:hidden"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2" />
            </svg>
          </a>
          <MainNav
            label={t("mainNav")}
            openLabel={t("openMenu")}
            closeLabel={t("closeMenu")}
            items={[
              { href: "/doprava", label: nav("doprava") },
              { href: "/drevni-material", label: nav("drevo") },
              { href: "/vozovy-park", label: nav("vozovyPark") },
              { href: "/o-nas", label: nav("oNas") },
              { href: "/kontakt", label: nav("kontakt") },
            ]}
            cta={{ href: "/poptavka", label: t("cta") }}
            phone={{
              label: t("dispatch"),
              number: company.dispatch.phone,
              href: company.dispatch.phoneHref,
            }}
          />

          <a
            href={company.dispatch.phoneHref}
            className="hidden flex-col leading-tight xl:flex"
          >
            <span className="text-xs text-graphite">{t("dispatch")}</span>
            <span className="font-display font-bold font-wide tabular-nums whitespace-nowrap">
              {company.dispatch.phone}
            </span>
          </a>

          <Link
            href="/poptavka"
            className="hidden min-h-12 items-center bg-marking px-5 font-display font-bold font-wide whitespace-nowrap text-asphalt press hover:bg-marking-deep lg:inline-flex"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </header>
  );
}
