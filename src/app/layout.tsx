import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://demalspedition.cz"),
  title: "DEMAL SPEDITION s.r.o. – Mezinárodní kamionová doprava",
  description:
    "Mezinárodní kamionová doprava a zasílatelství. Přepravy s kontrolovanou teplotou i walkingfloor, převážně Jižní Itálie.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="cs" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
