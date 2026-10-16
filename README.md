# Playwright: learning notes

This small project is a hands-on introduction to Playwright. It contains a local Hello world page and browser tests that open it, interact with it, and check what a visitor sees.

## What Playwright does

Playwright Test runs JavaScript tests with Node.js and controls a real browser engine. By default, the browser runs headlessly: it still loads and renders the page, runs its JavaScript, and responds to clicks, but no browser window is shown. Add `--headed` to watch the browser window while a test runs.

A test usually has three parts:

1. Open or prepare a page.
2. Do something a visitor would do, such as clicking a button.
3. Check the result with an assertion such as `toBeVisible()`.

For example, `tests/tip.spec.js` checks that a tip starts hidden, clicks **Show me a tip**, then checks that the tip appears. Playwright's `expect` assertions wait for the page to reach the expected state, so fixed pauses such as `waitForTimeout()` are usually unnecessary. The pause in `tests/hello.spec.js` is there so the browser stays visible briefly for learning.

`tests/index.spec.js` was created with Codegen. It opens the local page, but has no click or result check yet. That is a useful reminder: Codegen drafts interactions; you decide what behavior the test should verify.

## Project files

```text
index.html              The small responsive page used for practice
playwright.config.js    Playwright test settings and run profiles
tests/                  Tests discovered automatically by Playwright
```

The config is optional in Playwright, but this project uses it to set `testDir` and define two projects:

- **Desktop Chrome** runs Chromium with desktop settings.
- **Pixel 7** runs Chromium with Pixel 7 settings, including a phone-sized viewport and touch input.

“Project” means a named set of run settings. Playwright finds test files under `tests/` and runs each test in each selected project. That is why a full run currently reports tests for both Desktop Chrome and Pixel 7. Pixel 7 is device emulation, not a physical phone.

Chromium is an open-source browser project. Google Chrome is built on Chromium. Playwright installs a compatible Chromium browser for its tests; this project does not need the branded Google Chrome app.

## Commands to try

Run every test in every configured project:

```bash
npm test
```

Show browser windows while testing:

```bash
npm test -- --headed
```

Open Playwright's visual test explorer:

```bash
npm test -- --ui
```

Run one test file. With the current config, it runs in both projects:

```bash
npm test -- tests/tip.spec.js
```

Run one file only in the Pixel 7 profile, with its browser visible:

```bash
npm test -- tests/tip.spec.js --project="Pixel 7" --headed
```

The `test` script in `package.json` is a shortcut for `playwright test`. The `--` tells npm to pass the following options to Playwright.

## Try Codegen

Codegen opens the page in a browser and drafts Playwright code as you interact with it:

```bash
npx playwright codegen file:///Users/edutrul/Projects/playright-test/index.html
```

Click **Show me a tip** and watch it record the interaction. Generated code is a starting point: keep the meaningful actions, give the test a descriptive name, and add an assertion for the result you care about. The absolute `file:///Users/...` address is specific to this Mac.

## What to learn next

- **Locators:** find elements by their accessible role and name, such as `getByRole('button', { name: 'Show me a tip' })`.
- **Assertions:** check visible text, URLs, form values, and other user-visible outcomes.
- **UI Mode and Trace Viewer:** replay a run and inspect its steps, page snapshots, logs, and network activity.
- **Device emulation:** check phone and tablet layouts. Emulation helps, but does not replace testing on a physical device when that matters.
- **Other browsers:** add Firefox or WebKit projects if you want to test those engines. You do not have to run every test on every browser on every run.
- **Screenshots and accessibility:** add visual comparisons or accessibility checks when a project needs them.

## How this relates to Drupal

For a Drupal project, DTT and Playwright can complement each other:

- Use DTT for Drupal-oriented PHP tests that use Drupal APIs and existing-site helpers.
- Use Playwright for real-browser journeys, such as an editor logging in, submitting a form, and seeing the resulting page.

Plain Playwright does not automatically create Drupal test content or isolate Drupal databases. You can prepare test data through the UI, Drush, or another setup method. Drupal-specific projects add different helpers:

- [Drupal.org Playwright](https://www.drupal.org/project/playwright) describes fixtures and helper objects for Drupal sites.
- [Lullabot playwright-drupal](https://lullabot.github.io/playwright-drupal/latest/) integrates with DDEV, isolated Drupal test databases, and Drush helpers.
- [Smoke](https://www.drupal.org/project/smoke) focuses on ready-made browser health checks for DDEV sites.
- [Automated Testing Kit](https://www.drupal.org/project/automated_testing_kit) provides reusable tests and utilities, including Playwright support.

These are options to evaluate, not requirements for learning or using Playwright. Check each project's current maintenance, compatibility, security coverage, and setup before adopting it.

## AI agent tools

Playwright's planner, generator, and healer agent definitions are optional. They can help explore an application, draft a test plan, generate tests, and investigate failures. You can also ask Codex to help write tests without installing those definitions. The `npx playwright init-agents --loop=codex` command adds the optional Playwright agent workflow to a project.

## Further reading

- [Playwright best practices](https://playwright.dev/docs/best-practices)
- [Playwright browser and device projects](https://playwright.dev/docs/browsers)
- [Playwright Codegen](https://playwright.dev/docs/codegen)
- [Playwright Test Agents](https://playwright.dev/docs/test-agents)
