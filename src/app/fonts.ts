import localFont from "next/font/local";
import { Public_Sans } from "next/font/google";

// Archivo, self-hosted and cut down for this site: width fixed at 125 %, weights 500–800,
// one file per style with the Latin, Czech, German and English characters the site uses.
// 71 KB instead of ~360 KB for the full variable font, which slowed the mobile LCP.
// Source: Google Fonts css2 (Archivo:ital,wdth,wght@0,125,500..800;1,125,500..800 &text=…),
// SIL Open Font License. Regenerate with that query if new characters are needed.
export const archivo = localFont({
  variable: "--font-archivo",
  src: [
    { path: "../fonts/archivo-wide.woff2", weight: "500 800", style: "normal" },
    { path: "../fonts/archivo-wide-italic.woff2", weight: "500 800", style: "italic" },
  ],
  declarations: [{ prop: "font-stretch", value: "125%" }],
});

export const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin", "latin-ext"],
});
