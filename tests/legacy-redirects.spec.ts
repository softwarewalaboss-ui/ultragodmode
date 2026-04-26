import { test, expect } from "../playwright-fixture";

/**
 * Legacy redirect smoke test.
 *
 * For each legacy URL we ensure:
 *  1. The browser ends up on /super-admin-system/role-switch (the unified control panel).
 *  2. None of the removed "Dashboard Preview" UI strings ever render.
 */

const LEGACY_ROUTES: Array<{ path: string; expectedRole: string }> = [
  { path: "/dashboard", expectedRole: "boss_owner" },
  { path: "/franchise/dashboard", expectedRole: "franchise_manager" },
  { path: "/franchise/wallet", expectedRole: "franchise_manager" },
  { path: "/owner", expectedRole: "boss_owner" },
  { path: "/master-admin", expectedRole: "boss_owner" },
];

// Strings that belonged to the deleted preview components — must NEVER appear.
const FORBIDDEN_PREVIEW_STRINGS = [
  "Your Dashboard Preview",
  "Franchise Dashboard Preview",
  "Reseller Dashboard Preview",
  "Dashboard Preview",
];

for (const { path, expectedRole } of LEGACY_ROUTES) {
  test(`legacy route ${path} redirects to control panel without preview UI`, async ({ page }) => {
    await page.goto(path, { waitUntil: "networkidle" });

    // 1. URL ends up on the unified role-switch dashboard.
    await expect(page).toHaveURL(/\/super-admin-system\/role-switch/);
    expect(page.url()).toContain(`role=${expectedRole}`);

    // 2. No forbidden preview text anywhere in the DOM.
    const bodyText = await page.locator("body").innerText();
    for (const forbidden of FORBIDDEN_PREVIEW_STRINGS) {
      expect(
        bodyText,
        `Forbidden preview string "${forbidden}" appeared after visiting ${path}`,
      ).not.toContain(forbidden);
    }
  });
}

test("franchise landing page does not render the old DashboardPreview", async ({ page }) => {
  await page.goto("/franchise-landing", { waitUntil: "networkidle" }).catch(() => {});
  await page.goto("/franchise", { waitUntil: "networkidle" }).catch(() => {});
  const bodyText = await page.locator("body").innerText();
  for (const forbidden of FORBIDDEN_PREVIEW_STRINGS) {
    expect(bodyText).not.toContain(forbidden);
  }
});
