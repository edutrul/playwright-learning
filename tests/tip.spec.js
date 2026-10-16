const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

test('shows a tip when I click the button', async ({ page }) => {
  const pageUrl = pathToFileURL(path.resolve(__dirname, '../index.html')).href;
  await page.goto(pageUrl);

  const tip = page.getByText('Playwright checks what the browser shows you.');
  await expect(tip).toBeHidden();

  await page.getByRole('button', { name: 'Show me a tip' }).click();

  await expect(tip).toBeVisible();
});
