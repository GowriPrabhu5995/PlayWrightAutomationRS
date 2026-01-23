import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.amazon.com/');
  await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();

  await page.getByRole('link', { name: 'Sign in', exact: true }).click();
  await page.getByRole('textbox', { name: 'Enter mobile number or email' }).fill('7');
  await page.locator('span').nth(4).click();
  await expect(page.getByRole('option', { name: 'Afghanistan +' })).toBeVisible();

  await page.getByRole('option', { name: 'India +' }).click();
  await expect(page.getByRole('link', { name: 'Amazon' })).toBeVisible();

  await page.getByRole('textbox', { name: 'Enter mobile number or email' }).click();
  await page.getByRole('textbox', { name: 'Enter mobile number or email' }).fill('765902221');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByRole('link', { name: 'Amazon' })).toBeVisible();

  await page.locator('#claim-input-container').click();
});