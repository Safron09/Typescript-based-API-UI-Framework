import { test, expect } from '../../src/fixtures/fixtures';

/**
 * Link grid UI tests — external links, resume, GitHub repos.
 * Tags: @ui
 */

test.describe('Home page — link grid', () => {

  test('LinkedIn link is present and points to correct profile @ui', async ({ homePage }) => {
    await test.step('Assert LinkedIn link exists in grid', () =>
      homePage.assertLinkExists('linkedin.com/in/yuriy-safronnynov')
    );
  });

  test('GitHub link is present and points to correct profile @ui', async ({ homePage }) => {
    await test.step('Assert GitHub link exists in grid', () =>
      homePage.assertLinkExists('github.com/Safron09')
    );
  });

  test('Resume PDF link is present @smoke @ui', async ({ homePage }) => {
    await test.step('Assert resume download link exists', () =>
      homePage.assertLinkExists('/static/resume/')
    );
  });

  test('all external links have secure rel and target attributes @ui', async ({ homePage }) => {
    await test.step('Assert all external links use target=_blank and rel=noopener', () =>
      homePage.assertExternalLinksHaveSecureAttributes()
    );
  });

  test('link grid contains at least four cards @ui', async ({ homePage, page }) => {
    await test.step('Count link cards in grid', async () => {
      const cards = page.locator('.link-card');
      await expect(cards).toHaveCount(await cards.count());
      expect(await cards.count()).toBeGreaterThanOrEqual(4);
    });
  });
});
