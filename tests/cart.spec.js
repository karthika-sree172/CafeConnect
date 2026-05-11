import { test } from '@playwright/test';

import { LoginPage }
from '../pageobjects/LoginPage';

import { MenuPage }
from '../pageobjects/MenuPage';

import { CartPage }
from '../pageobjects/CartPage';

test.setTimeout(60000);

// BEFORE EACH TEST
test.beforeEach(async ({ page }) => {

  const loginPage =
    new LoginPage(page);

  await loginPage.gotoLoginPage();

  await loginPage.login(
    'test@gmail.com',
    'test123'
  );

  // STABLE WAIT
  await page.waitForTimeout(3000);

});


// ADD ITEM TEST
test('Add item to cart', async ({ page }) => {

  const menuPage =
    new MenuPage(page);

  const cartPage =
    new CartPage(page);

  // OPEN MENU
  await menuPage.gotoMenuPage();

  // WAIT
  await page.waitForTimeout(3000);

  // ADD ITEM
  await menuPage.addFirstItemToCart();

  // WAIT
  await page.waitForTimeout(3000);

  // OPEN CART
  await cartPage.gotoCartPage();

  // WAIT
  await page.waitForTimeout(3000);

  // VERIFY ITEM
  await cartPage.verifyCartItemVisible();

});


// REMOVE ITEM TEST
test('Remove item from cart', async ({ page }) => {

  const menuPage =
    new MenuPage(page);

  const cartPage =
    new CartPage(page);

  // OPEN MENU
  await menuPage.gotoMenuPage();

  // WAIT
  await page.waitForTimeout(3000);

  // ADD ITEM
  await menuPage.addFirstItemToCart();

  // WAIT
  await page.waitForTimeout(3000);

  // OPEN CART
  await cartPage.gotoCartPage();

  // WAIT
  await page.waitForTimeout(3000);

  // REMOVE ITEM
  await cartPage.removeFirstItem();

  // WAIT
  await page.waitForTimeout(3000);

  // VERIFY EMPTY CART
  await cartPage.verifyEmptyCart();

});


// QUANTITY TEST
test('Increase cart quantity', async ({ page }) => {

  const menuPage =
    new MenuPage(page);

  const cartPage =
    new CartPage(page);

  // OPEN MENU
  await menuPage.gotoMenuPage();

  // WAIT
  await page.waitForTimeout(3000);

  // ADD ITEM
  await menuPage.addFirstItemToCart();

  // WAIT
  await page.waitForTimeout(3000);

  // OPEN CART
  await cartPage.gotoCartPage();

  // WAIT
  await page.waitForTimeout(3000);

  // UPDATE QUANTITY
  await cartPage.updateQuantity('2');

  // WAIT
  await page.waitForTimeout(2000);

  // VERIFY QUANTITY
  await cartPage.verifyQuantity('2');

});