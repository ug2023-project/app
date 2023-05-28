import { test as baseTest, expect as baseExpect } from '@playwright/test';
import { test, expect } from '../../../utils/polishTestWrapper';

// pl
test('Should render correct register page', async ({ page }) => {
  await page.goto('http://localhost:5173/register');
  expect(await page.textContent('h1')).toBe('Zarejestruj się');
});

test('Register button should be disabled by default', async ({ page }) => {
  await page.goto('http://localhost:5173/register');
  await expect(
    page.getByRole('button', { name: 'Zarejestruj' }),
  ).toBeDisabled();
});

//en
baseTest('Should render correct english register page', async ({ page }) => {
  await page.goto('http://localhost:5173/register');
  baseExpect(await page.textContent('h1')).toBe('Register an account');
});
