const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

test('fits within the screen without horizontal scrolling', async ({ page }) => {
  const pageUrl = pathToFileURL(path.resolve(__dirname, '../index.html')).href;
  await page.goto(pageUrl);

  const pageWidth = await page.evaluate(() => document.documentElement.clientWidth);
  const contentWidth = await page.evaluate(() => document.documentElement.scrollWidth);

  await expect(page.getByRole('heading', { name: 'Hello world!' })).toBeVisible();
  expect(contentWidth).toBeLessThanOrEqual(pageWidth);
});
