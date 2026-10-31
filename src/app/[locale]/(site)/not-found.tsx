import { getTranslations } from "next-intl/server";
import { NotFoundContent } from "@/components/not-found-content";

// For notFound() thrown inside a page; unknown URLs go to app/global-not-found.tsx.
export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <>
      <title>{`${t("metaTitle")} | DEMAL SPEDITION`}</title>
      <NotFoundContent />
    </>
  );
}
