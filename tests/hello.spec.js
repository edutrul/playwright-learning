const { test, expect } = require('@playwright/test');

test('shows Hello world', async ({ page }) => {
  // Put a simple heading on the browser page.
  await page.setContent('<h1>Hello world brooo</h1>');
  await page.waitForTimeout(3000);

  // Check that the heading is visible.
  await expect(page.getByRole('heading', { name: 'Hello world' })).toBeVisible();
});
