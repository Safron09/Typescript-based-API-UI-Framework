import { APIRequestContext, APIResponse } from '@playwright/test';

interface RequestOptions {
  headers?: Record<string, string>;
  params?:  Record<string, string>;
  data?:    unknown;
}

/**
 * ApiClient — thin wrapper around Playwright's APIRequestContext.
 * Provides typed helpers for GET / POST / HEAD and common assertions.
 */
export class ApiClient {
  private readonly baseUrl: string;

  constructor(
    private readonly request: APIRequestContext,
    baseUrl = process.env.BASE_URL ?? 'https://yuriysafron.com'
  ) {
    this.baseUrl = baseUrl;
  }

  async get(path: string, options?: RequestOptions): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}${path}`, options);
  }

  async head(path: string): Promise<APIResponse> {
    return this.request.head(`${this.baseUrl}${path}`);
  }

  async post(path: string, options?: RequestOptions): Promise<APIResponse> {
    return this.request.post(`${this.baseUrl}${path}`, options);
  }

  // --- Assertion helpers ---

  async assertStatus(response: APIResponse, expected: number): Promise<void> {
    if (response.status() !== expected) {
      throw new Error(
        `Expected status ${expected}, got ${response.status()} for ${response.url()}`
      );
    }
  }

  async assertHeader(
    response: APIResponse,
    header: string,
    contains: string
  ): Promise<void> {
    const value = response.headers()[header.toLowerCase()] ?? '';
    if (!value.includes(contains)) {
      throw new Error(
        `Expected header "${header}" to contain "${contains}", got "${value}"`
      );
    }
  }

  async getResponseTimeMs(path: string): Promise<number> {
    const start = Date.now();
    await this.get(path);
    return Date.now() - start;
  }
}
