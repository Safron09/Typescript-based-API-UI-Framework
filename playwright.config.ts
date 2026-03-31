import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir:         './tests',
  fullyParallel:   true,
  forbidOnly:      !!process.env.CI,
  retries:         process.env.CI ? 2 : 0,
  workers:         process.env.CI ? 4 : undefined,
  timeout:         30_000,
  expect:          { timeout: 10_000 },

  reporter: [
    ['html',  { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['allure-playwright', { resultsDir: 'allure-results' }],
    ['list'],
  ],

  use: {
    baseURL:            process.env.BASE_URL ?? 'https://yuriysafron.com',
    trace:              'on-first-retry',
    screenshot:         'only-on-failure',
    video:              'on-first-retry',
    headless:           true,
    actionTimeout:      10_000,
    navigationTimeout:  20_000,
  },

  projects: [
    {
      name:  'chromium',
      use:   { ...devices['Desktop Chrome'] },
    },
    {
      name:  'firefox',
      use:   { ...devices['Desktop Firefox'] },
    },
    {
      name:  'api',
      testDir: './tests/api',
      use:   { ...devices['Desktop Chrome'] },
    },
  ],
});
