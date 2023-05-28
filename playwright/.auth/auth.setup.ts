import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.getByLabel("Email").fill("test@yopmail.com");
  await page.getByLabel("Password").fill("!Qwerty123");
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL('http://localhost:5173/collections/all');

  await page.context().storageState({ path: authFile });
})