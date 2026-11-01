import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = [
  "/", "/poptavka", "/poptavka?typ=drevo", "/ochrana-osobnich-udaju", "/kontakt", "/vozovy-park", "/doprava", "/o-nas", "/drevni-material", "/drevni-material/stepka", "/zdroje-fotografii", "/neexistujici-stranka", "/styleguide", "/podklady",
  // German and English versions of the public pages, with their translated paths.
  "/de", "/de/anfrage", "/de/transport", "/de/ueber-uns", "/de/holzmaterial", "/de/datenschutz", "/de/bildquellen", "/de/impressum", "/impressum",
  "/en", "/en/quote", "/en/freight", "/en/about-us", "/en/wood-materials", "/en/privacy", "/en/photo-credits", "/en/imprint",
];

for (const path of pages) {
  test(`${path} has no serious a11y violations`, async ({ page }) => {
    await page.goto(path);
    // The page rises in on load (endless loops such as the mobile fact marquee are ignored); axe must read the final colours, not the half-faded ones.
    await page.waitForFunction(() => document.getAnimations().every((a) => a.playState !== "running" || a.effect?.getComputedTiming().iterations === Infinity));
    const lang = path.startsWith("/en") ? "en" : path.startsWith("/de") ? "de" : "cs";
    await expect(page.locator("html")).toHaveAttribute("lang", lang);

    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    const blocking = violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );

    expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
  });
}
