import { expect } from '@playwright/test';

export class CartPage {

  constructor(page) {

    this.page = page;

    this.cartItem =
      '[data-testid="cart-item"]';

    this.removeButton =
      '[data-testid="remove-button"]';

    this.quantityInput =
      '[data-testid="quantity-input"]';
  }

  async gotoCartPage() {

    await this.page.goto(
      'http://localhost:3000/cart'
    );
  }

  async verifyCartItemVisible() {

    await expect(
      this.page.locator(this.cartItem).first()
    ).toBeVisible();
  }

  async removeFirstItem() {

    await this.page
      .locator(this.removeButton)
      .first()
      .click();
  }

  async updateQuantity(value) {

    await this.page
      .locator(this.quantityInput)
      .first()
      .fill(value);
  }

  async verifyQuantity(value) {

    await expect(
      this.page
        .locator(this.quantityInput)
        .first()
    ).toHaveValue(value);
  }

  async verifyEmptyCart() {

    await expect(
      this.page.locator(
        'text=Your cart is empty'
      )
    ).toBeVisible();
  }
}