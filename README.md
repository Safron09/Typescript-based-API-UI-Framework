# Typescript-based-API-UI-Framework

A TypeScript test automation framework built with Playwright, covering both UI and API testing in a single unified suite. Tests run against [yuriysafron.com](https://yuriysafron.com). Designed with strict typing, custom fixtures, a Page Object Model, and full GitLab CI/CD integration with Allure reporting.

---

## What This Framework Does

- UI testing via Playwright with a Page Object Model — no raw Playwright in test files
- HTTP/API-level testing using Playwright's `APIRequestContext` — no browser launched
- End-to-end tests combining UI rendering and HTTP validation in a single flow
- Custom fixture layer — page objects and API clients injected into tests automatically
- Triple reporting: Playwright HTML report, JUnit XML (GitLab CI integration), and Allure
- Fully parallel execution across Chromium and Firefox
- Screenshot, video, and trace captured on failure
- CI/CD via GitLab — separate jobs for UI, API, and E2E, with a dedicated Allure report stage

---

## Project Structure

```
Typescript-based-API-UI-Framework/
├── src/
│   ├── pages/
│   │   ├── BasePage.ts          # Abstract base — explicit wait wrappers, shared navigation
│   │   └── HomePage.ts          # Home page object — hero, links, strong sides, projects
│   ├── api/
│   │   └── ApiClient.ts         # HTTP client wrapper with typed assertion helpers
│   └── fixtures/
│       └── fixtures.ts          # Extended test fixtures — injects homePage and apiClient
├── tests/
│   ├── ui/
│   │   ├── home.spec.ts         # Hero section, strong sides, projects
│   │   └── links.spec.ts        # Link grid, external link security attributes
│   ├── api/
│   │   └── site.spec.ts         # Status codes, headers, static assets, response time
│   └── e2e/
│       └── profile.spec.ts      # Full page load, content integrity, performance
├── allure-results/              # Allure output (git-ignored)
├── .gitlab-ci.yml               # GitLab CI pipeline — 4 stages, parallel jobs
├── playwright.config.ts         # Playwright configuration — browsers, reporters, retries
├── tsconfig.json                # Strict TypeScript config with path aliases
├── .env.example                 # Environment variable reference
└── package.json                 # Scripts and pinned dependencies
```

---

## Tech Stack

| Layer | Tool |
|---|---|
| Language | TypeScript 5 (strict mode) |
| Test Framework | Playwright |
| UI Automation | Playwright Browser |
| API Testing | Playwright APIRequestContext |
| Reporting | Playwright HTML + JUnit + Allure |
| CI/CD | GitLab CI |

---

## Architecture Decisions

**Custom fixtures** — `src/fixtures/fixtures.ts` extends Playwright's `test` with `homePage` and `apiClient`. Every test receives fully initialised objects. Zero setup boilerplate in test files.

**Page Object Model** — `BasePage` provides reusable wait and assertion primitives. `HomePage` exposes domain-specific methods (`getProfileCard()`, `getStrongSides()`). Tests read like specifications.

**Typed API client** — `ApiClient` wraps `APIRequestContext` with `assertStatus()`, `assertHeader()`, and `getResponseTimeMs()`. API tests never call Playwright request methods directly.

**`test.step()`** — every test is broken into named steps. Allure and Playwright HTML reports show step-level results, making failures immediately diagnosable without reading code.

**Triple reporter** — `html` for local review, `junit` for GitLab merge request test results, `allure-playwright` for rich artefact reports. All three run on every CI execution.

**Strict TypeScript** — `strict: true` in `tsconfig.json`. All page methods return typed objects (`ProfileCard`, `StrongSide[]`). No `any`.

---

## How to Run

### Prerequisites

```bash
npm ci
npx playwright install --with-deps
```

### Run all tests

```bash
npm test
```

### Run by layer

```bash
npm run test:ui
npm run test:api
npm run test:e2e
```

### Run smoke tests only

```bash
npm run test:smoke
```

### Run headed (visible browser)

```bash
npm run test:headed
```

### Allure report

```bash
npm run allure:serve
```

---

## CI/CD Pipeline

`.gitlab-ci.yml` defines four stages:

| Stage | Job | Description |
|---|---|---|
| `install` | `install` | `npm ci` + Playwright browser install, cached |
| `test` | `test:ui` | UI tests — Chromium + Firefox in parallel |
| `test` | `test:api` | API tests — no browser, fast |
| `test` | `test:e2e` | E2E tests — full flow with trace on failure |
| `report` | `report:allure` | Generates Allure HTML from all job results |

All test jobs run in parallel in the `test` stage. JUnit XML is published directly to GitLab merge request test reports. Allure HTML is uploaded as a downloadable artifact. Failures block the pipeline.

---

## Test Tags

| Tag | Scope |
|---|---|
| `@smoke` | Critical path — runs on every commit |
| `@ui` | Browser-based UI tests |
| `@api` | HTTP-level API tests |
| `@e2e` | Full end-to-end flows |

---

## Author

**Yuriy Safronnynov** — Senior SDET / QA Automation Architect

https://www.linkedin.com/in/yuriy-safronnynov/ | https://github.com/Safron09