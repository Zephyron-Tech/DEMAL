import { company } from "@/lib/company";
import { siteUrl } from "@/lib/site";

// schema.org description of the company for search engines; values from src/lib/company.ts.
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    email: company.dispatch.email,
    telephone: company.dispatch.phone.replace(/\s/g, ""),
    vatID: company.dic,
    taxID: company.ico,
    foundingDate: "2012-07-19",
    address: {
      "@type": "PostalAddress",
      streetAddress: company.street,
      postalCode: "375 01",
      addressLocality: "Všemyslice",
      addressCountry: "CZ",
    },
    areaServed: "EU",
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so the payload can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
