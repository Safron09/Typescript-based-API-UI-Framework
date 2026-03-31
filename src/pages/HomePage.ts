import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

interface ProfileCard {
  name: string;
  role: string;
  availability: string;
}

interface StrongSide {
  title: string;
}

/**
 * HomePage — page object for yuriysafron.com
 * Covers hero, strong-sides, projects, and link-grid sections.
 */
export class HomePage extends BasePage {

  // --- Selectors ---
  private readonly HERO_NAME       = 'h1';
  private readonly HERO_ROLE       = '.hero-title';
  private readonly HERO_EYEBROW    = '.hero .eyebrow';
  private readonly AVAILABILITY    = '.availability';
  private readonly LINK_GRID       = '.link-grid';
  private readonly LINK_CARDS      = '.link-card';
  private readonly STRONG_SIDES    = '.strong-sides';
  private readonly SIDE_CARDS      = '.strong-sides .card';
  private readonly SIDE_HEADINGS   = '.strong-sides h3';
  private readonly PROJECTS        = '.projects';
  private readonly PROJECT_CARDS   = '.project-card';
  private readonly PROJECT_IMPACT  = '.project-card .impact';

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navigate('/');
  }

  // --- Hero ---

  async getProfileCard(): Promise<ProfileCard> {
    return {
      name:         await this.locator(this.HERO_NAME).innerText(),
      role:         await this.locator(this.HERO_ROLE).innerText(),
      availability: await this.locator(this.AVAILABILITY).innerText(),
    };
  }

  async assertHeroVisible(): Promise<void> {
    await this.assertVisible(this.HERO_NAME);
    await this.assertVisible(this.HERO_ROLE);
  }

  // --- Links ---

  async getLinkCards(): Promise<{ label: string; href: string }[]> {
    const cards = this.page.locator(this.LINK_CARDS);
    const count = await cards.count();
    const result = [];
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      result.push({
        label: await card.locator('.link-label').innerText(),
        href:  (await card.getAttribute('href')) ?? '',
      });
    }
    return result;
  }

  async assertLinkExists(hrefContains: string): Promise<void> {
    await expect(
      this.page.locator(`${this.LINK_CARDS}[href*="${hrefContains}"]`)
    ).toBeVisible();
  }

  async assertExternalLinksHaveSecureAttributes(): Promise<void> {
    const links = this.page.locator('a[href^="http"]');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noopener/);
    }
  }

  // --- Strong Sides ---

  async getStrongSides(): Promise<StrongSide[]> {
    const headings = this.page.locator(this.SIDE_HEADINGS);
    const count = await headings.count();
    return Promise.all(
      Array.from({ length: count }, async (_, i) => ({
        title: await headings.nth(i).innerText(),
      }))
    );
  }

  async assertStrongSidesVisible(): Promise<void> {
    await this.assertVisible(this.STRONG_SIDES);
    await expect(this.page.locator(this.SIDE_CARDS)).toHaveCount(3);
  }

  // --- Projects ---

  async assertProjectsVisible(): Promise<void> {
    await this.assertVisible(this.PROJECTS);
    const cards = this.page.locator(this.PROJECT_CARDS);
    await expect(cards).not.toHaveCount(0);
  }

  async getProjectImpacts(): Promise<string[]> {
    const impacts = this.page.locator(this.PROJECT_IMPACT);
    const count = await impacts.count();
    return Promise.all(
      Array.from({ length: count }, (_, i) => impacts.nth(i).innerText())
    );
  }
}
