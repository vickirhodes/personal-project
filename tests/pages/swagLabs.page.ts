import { expect, type Locator, type Page } from '@playwright/test';
export class SwagLabsPage {
  readonly page: Page;
  readonly swagLabsTitle: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly loginCredentials: Locator;
  readonly loginPassword: Locator;
  readonly productTitle: Locator;
  readonly shoppingCartLink: Locator;
  readonly errorMessage: Locator;


    constructor(page: Page) {
        this.page = page;
        this.swagLabsTitle = page.locator('text=Swag Labs');
        this.username = page.locator('[data-test="username"]');
        this.password = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.loginCredentials = page.locator('[data-test="login-credentials"]');
        this.loginPassword = page.locator('[data-test="login-password"]');
        this.productTitle = page.locator('.title');
        this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}