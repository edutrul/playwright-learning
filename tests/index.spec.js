import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('file:///Users/edutrul/Projects/playright-test/index.html');
});