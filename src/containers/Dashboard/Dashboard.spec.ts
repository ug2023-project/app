import { test, expect } from '@playwright/test';

test.describe('Dashboard, load user info', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });
  test('Check if authentication works', async ({ page }) => {
    await page.goto('http://localhost:5173/collections/all');
    const xpath = '//*[@id="root"]/div[1]/div[2]/header';
    await page.waitForSelector(xpath);
    const element = await page.$(xpath);
    expect(element).toBeDefined();
  });
});
