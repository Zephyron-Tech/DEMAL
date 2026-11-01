import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { company } from "@/lib/company";
import logo from "../../../public/logo_nobg.png";
import { HomeLink } from "./home-link";
import { TopStrip } from "./top-strip";
import { LanguageSwitch } from "./language-switch";
import { MainNav } from "./main-nav";
import { SiteHeaderFrame } from "./site-header-frame";

export async function SiteHeader() {
  const t = await getTranslations("Shell");
  const nav = await getTranslations("Nav");

  return (
    <SiteHeaderFrame>
      <TopStrip />
      <div className="relative mx-auto flex h-18 max-w-(--container-page) items-center justify-between gap-2 px-4 lg:gap-6 sm:px-8">
        {/* The logo tab hangs below the bar. Its fillets, sides and rounded bottom are one SVG path
            in the bar's white, so bar and tab are a single shape with no seam. */}
        {/* The tab drops 24px below the bar. The logo stays in the bar box and moves with transforms:
            expanded it sits 12px lower and full size, compact it is centred in the bar at 0.706 scale. */}
        <HomeLink label={t("homeLink")} className="relative flex h-18 w-[140px] shrink-0 items-center justify-center self-start">
          <svg
            aria-hidden="true"
            viewBox="0 -1 168 25"
            className="pointer-events-none absolute -left-3.5 top-[71px] h-[25px] w-[168px] origin-top transition-[scale] duration-600 ease-(--ease-out) motion-reduce:transition-none group-data-[compact=true]/header:scale-x-[0.88] group-data-[compact=true]/header:scale-y-0"
          >
            <path
              fill="#fff"
              d="M0,-1 L0,0 A14,14 0 0 1 14,14 V16 A8,8 0 0 0 22,24 H146 A8,8 0 0 0 154,16 V14 A14,14 0 0 1 168,0 L168,-1 Z"
            />
          </svg>
          <Image
            src={logo}
            alt=""
            loading="eager"
            sizes="150px"
            className="relative h-17 w-auto translate-y-3 transition-[translate,scale] duration-500 ease-(--ease-out) motion-reduce:transition-none group-data-[compact=true]/header:translate-x-[-18px] group-data-[compact=true]/header:translate-y-0 group-data-[compact=true]/header:scale-[0.706]"
          />
        </HomeLink>

        <div className="flex items-center gap-2 lg:gap-6 xl:gap-8">
          <LanguageSwitch bar className="lg:hidden" />
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


          <Link
            href="/poptavka"
            className="hidden min-h-12 items-center bg-marking px-5 font-display font-bold font-wide whitespace-nowrap text-asphalt press hover:bg-marking-deep lg:inline-flex"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </SiteHeaderFrame>
  );
}
