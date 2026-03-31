import { test as base, expect } from '@playwright/test';
import { HomePage }  from '../pages/HomePage';
import { ApiClient } from '../api/ApiClient';

/**
 * Extended fixtures — injected into every test automatically.
 * Tests receive typed page objects and API clients without any setup boilerplate.
 */
type Fixtures = {
  homePage:  HomePage;
  apiClient: ApiClient;
};

export const test = base.extend<Fixtures>({

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await use(homePage);
  },

  apiClient: async ({ request }, use) => {
    const client = new ApiClient(request);
    await use(client);
  },
});

export { expect };
