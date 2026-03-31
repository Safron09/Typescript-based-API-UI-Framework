import { test, expect } from '../../src/fixtures/fixtures';

/**
 * HTTP / API-level tests — status codes, headers, static assets, performance.
 * No browser is launched. Uses Playwright's APIRequestContext directly.
 * Tags: @api @smoke
 */

test.describe('Site HTTP — response validation', () => {

  test('homepage returns HTTP 200 @smoke @api', async ({ apiClient }) => {
    const response = await test.step('GET /', () => apiClient.get('/'));

    await test.step('Assert 200 status', () =>
      apiClient.assertStatus(response, 200)
    );
  });

  test('homepage response is HTML @api', async ({ apiClient }) => {
    const response = await test.step('GET /', () => apiClient.get('/'));

    await test.step('Assert content-type is text/html', () =>
      apiClient.assertHeader(response, 'content-type', 'text/html')
    );
  });

  test('resume PDF asset returns HTTP 200 @api', async ({ apiClient }) => {
    const response = await test.step(
      'GET /static/resume/Yuriy_Safronnynov_AutomationQAEngineer.pdf',
      () => apiClient.get('/static/resume/Yuriy_Safronnynov_AutomationQAEngineer.pdf')
    );

    await test.step('Assert 200 status', () =>
      apiClient.assertStatus(response, 200)
    );

    await test.step('Assert content-type is PDF', () =>
      apiClient.assertHeader(response, 'content-type', 'pdf')
    );
  });

  test('stylesheet asset returns HTTP 200 @api', async ({ apiClient }) => {
    const response = await test.step(
      'GET /static/profilecard/styles.css',
      () => apiClient.get('/static/profilecard/styles.css')
    );

    await test.step('Assert 200 status', () =>
      apiClient.assertStatus(response, 200)
    );
  });

  test('homepage responds within 2000ms @smoke @api', async ({ apiClient }) => {
    const ms = await test.step('Measure response time', () =>
      apiClient.getResponseTimeMs('/')
    );

    await test.step(`Assert under 2000ms (got ${ms}ms)`, () => {
      expect(ms).toBeLessThan(2000);
    });
  });
});
