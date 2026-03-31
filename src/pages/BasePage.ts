import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage — inherited by all page objects.
 * Centralises navigation, assertions, and wait strategies.
 * No test file should interact with Playwright directly.
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async navigate(path = ''): Promise<void> {
    await this.page.goto(path || '/');
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async getUrl(): Promise<string> {
    return this.page.url();
  }

  protected locator(selector: string): Locator {
    return this.page.locator(selector);
  }

  async waitForVisible(selector: string): Promise<Locator> {
    const el = this.page.locator(selector);
    await el.waitFor({ state: 'visible' });
    return el;
  }

  async assertVisible(selector: string): Promise<void> {
    await expect(this.page.locator(selector)).toBeVisible();
  }

  async assertText(selector: string, expected: string): Promise<void> {
    await expect(this.page.locator(selector)).toHaveText(expected);
  }

  async assertContainsText(selector: string, expected: string): Promise<void> {
    await expect(this.page.locator(selector)).toContainText(expected);
  }

  async assertHref(selector: string, expected: string): Promise<void> {
    await expect(this.page.locator(selector)).toHaveAttribute('href', expected);
  }

  async getLoadTimeMs(): Promise<number> {
    const timing = await this.page.evaluate(() =>
      JSON.stringify(window.performance.timing)
    );
    const t = JSON.parse(timing);
    return t.loadEventEnd - t.navigationStart;
  }
}
