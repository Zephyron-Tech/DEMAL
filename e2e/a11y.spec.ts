import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = ["/", "/styleguide", "/podklady"];

for (const path of pages) {
  test(`${path} has no serious a11y violations`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("html")).toHaveAttribute("lang", "cs");

    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    const blocking = violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );

    expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
  });
}
