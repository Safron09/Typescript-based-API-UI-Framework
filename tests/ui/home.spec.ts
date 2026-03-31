import { test, expect } from '../../src/fixtures/fixtures';

/**
 * Home page UI tests — hero section, strong sides, projects.
 * Tags: @ui @smoke
 */

test.describe('Home page — hero section', () => {

  test('page has correct title @smoke @ui', async ({ homePage, page }) => {
    await test.step('Verify document title', async () => {
      await expect(page).toHaveTitle('Yuriy Safronnynov — Digital Business Card');
    });
  });

  test('hero displays correct name and role @smoke @ui', async ({ homePage }) => {
    const profile = await test.step('Read profile card data', () =>
      homePage.getProfileCard()
    );

    await test.step('Assert name', () => {
      expect(profile.name).toBe('Yuriy Safronnynov');
    });

    await test.step('Assert role', () => {
      expect(profile.role).toContain('Software Automation Engineer');
    });
  });

  test('strong sides section renders three cards @ui', async ({ homePage }) => {
    await test.step('Assert strong sides section is visible', () =>
      homePage.assertStrongSidesVisible()
    );

    const sides = await test.step('Read strong side titles', () =>
      homePage.getStrongSides()
    );

    await test.step('Assert expected titles', () => {
      const titles = sides.map(s => s.title);
      expect(titles).toContain('Quality Architecture');
      expect(titles).toContain('Systems Thinking');
      expect(titles).toContain('Leadership');
    });
  });

  test('projects section is visible and not empty @ui', async ({ homePage }) => {
    await test.step('Assert projects section is present', () =>
      homePage.assertProjectsVisible()
    );

    const impacts = await test.step('Read project impact statements', () =>
      homePage.getProjectImpacts()
    );

    await test.step('Assert at least one impact statement exists', () => {
      expect(impacts.length).toBeGreaterThan(0);
      expect(impacts[0].length).toBeGreaterThan(0);
    });
  });
});
