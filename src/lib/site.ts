// Canonical production origin. The site runs on demal.zephyron.tech until the domain cutover.
export const siteUrl = "https://demalspedition.cz";

// Search engines may index the site only where SITE_INDEXABLE=true (set on Vercel at cutover),
// so the staging domain never competes with the real one.
export const isIndexable = process.env.SITE_INDEXABLE === "true";
