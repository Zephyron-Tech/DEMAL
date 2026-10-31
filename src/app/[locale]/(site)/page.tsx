import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("Home");

  return (
    <main className="flex flex-1 items-center justify-center p-8">
      <h1 className="font-display text-2xl font-semibold">{t("placeholder")}</h1>
    </main>
  );
}
