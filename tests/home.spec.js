import { test, expect } from '@playwright/test';

test('CafeConnect homepage loads', async ({ page }) => {

  await page.goto('http://localhost:3000');

  await expect(page).toHaveURL('http://localhost:3000/');

});

test('Menu items are visible', async ({ page }) => {

  await page.goto('http://localhost:3000/menu');

  const products = page.locator('.menu-item-card');

  await expect(products.first()).toBeVisible();

});