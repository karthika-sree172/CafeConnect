import { test, expect } from '@playwright/test';

test('Valid login test', async ({ page }) => {

  await page.goto('http://localhost:3000/login');

  await page.fill('[data-testid="email-input"]', 'test@gmail.com');

  await page.fill('[data-testid="password-input"]', 'test123');

  await page.click('[data-testid="login-button"]');

  await page.waitForTimeout(3000);

  await expect(page).toHaveURL('http://localhost:3000/');

});

test('Invalid login test', async ({ page }) => {

  await page.goto('http://localhost:3000/login');

  await page.fill('[data-testid="email-input"]', 'wrong@gmail.com');

  await page.fill('[data-testid="password-input"]', 'wrongpass');

  await page.click('[data-testid="login-button"]');

  await page.waitForTimeout(2000);

  await expect(page.locator('.error-alert')).toBeVisible();

});

test('Empty login fields test', async ({ page }) => {

  await page.goto('http://localhost:3000/login');

  await page.click('[data-testid="login-button"]');

  await page.waitForTimeout(2000);

  // Intentional bug validation
  await expect(page).toHaveURL(/login/);

});