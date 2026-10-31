import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Old WordPress URLs on demalspedition.cz (see docs/sitemap.md). /o-nas/, /kontakt/ and
// /vozovy-park/ keep their path; Next.js drops the trailing slash on its own.
const oldSiteRedirects = [
  { source: "/sluzby/:slug*", destination: "/doprava" },
  { source: "/gdpr", destination: "/ochrana-osobnich-udaju" },
  { source: "/smazani-osobnich-dat-gdpr", destination: "/ochrana-osobnich-udaju" },
  { source: "/zasady-pouzivani-cokies", destination: "/ochrana-osobnich-udaju" },
  { source: "/blog", destination: "/" },
  { source: "/unie-chce-zezelenit-kamiony", destination: "/" },
  { source: "/vznikla-prvni-elektrodalnice", destination: "/" },
  { source: "/zkusebni-stranka", destination: "/" },
  { source: "/kategorie/:slug*", destination: "/" },
  { source: "/testimonials/:slug*", destination: "/" },
  { source: "/staff/:slug*", destination: "/" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return oldSiteRedirects.map((redirect) => ({ ...redirect, permanent: true }));
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
