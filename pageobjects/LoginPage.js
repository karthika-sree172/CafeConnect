export class LoginPage {

  constructor(page) {

    this.page = page;

    this.emailInput =
      '[data-testid="email-input"]';

    this.passwordInput =
      '[data-testid="password-input"]';

    this.loginButton =
      '[data-testid="login-button"]';
  }

  async gotoLoginPage() {

    await this.page.goto(
      'http://localhost:3000/login'
    );
  }

  async login(email, password) {

    await this.page.fill(
      this.emailInput,
      email
    );

    await this.page.fill(
      this.passwordInput,
      password
    );

    await this.page.locator(
      this.loginButton
    ).click({ force: true });
  }
}