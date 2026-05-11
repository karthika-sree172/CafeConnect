export class MenuPage {

  constructor(page) {

    this.page = page;

    this.addCartButton =
      '[data-testid="add-cart-button"]';
  }

  async gotoMenuPage() {

    await this.page.goto(
      'http://localhost:3000/menu'
    );
  }

  async addFirstItemToCart() {

    await this.page.waitForTimeout(3000);

    const button =
      this.page
        .locator(this.addCartButton)
        .first();

    await button.click({
      force: true
    });

  }
}