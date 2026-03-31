import { test, expect } from '../../src/fixtures/fixtures';

/**
 * End-to-end tests — combines UI rendering validation with HTTP-level checks
 * to verify the full profile page experience from load to content integrity.
 * Tags: @e2e @smoke
 */

test.describe('Profile page — end-to-end', () => {

  test('full page loads and all key sections are visible @smoke @e2e', async ({ homePage, page }) => {
    await test.step('Assert hero section', () => homePage.assertHeroVisible());

    await test.step('Assert strong sides section', () =>
      homePage.assertStrongSidesVisible()
    );

    await test.step('Assert projects section', () =>
      homePage.assertProjectsVisible()
    );

    await test.step('Assert link grid is present', async () => {
      await expect(page.locator('.link-grid')).toBeVisible();
    });
  });

  test('page content matches expected profile data @e2e', async ({ homePage }) => {
    const profile = await test.step('Read profile card', () =>
      homePage.getProfileCard()
    );

    const sides = await test.step('Read strong sides', () =>
      homePage.getStrongSides()
    );

    const impacts = await test.step('Read project impacts', () =>
      homePage.getProjectImpacts()
    );

    await test.step('Validate profile completeness', () => {
      expect(profile.name).toBeTruthy();
      expect(profile.role).toBeTruthy();
      expect(sides.length).toBeGreaterThanOrEqual(3);
      expect(impacts.length).toBeGreaterThanOrEqual(1);
    });
  });

  test('page load performance is within acceptable threshold @e2e', async ({ homePage }) => {
    const loadTime = await test.step('Measure browser load time', () =>
      homePage.getLoadTimeMs()
    );

    await test.step(`Assert load under 5000ms (got ${loadTime}ms)`, () => {
      expect(loadTime).toBeLessThan(5000);
    });
  });
});
