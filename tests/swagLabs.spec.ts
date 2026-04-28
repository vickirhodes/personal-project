import { test, expect } from '@playwright/test';
import { SwagLabsPage } from './pages/swagLabs.page';

test('Go to Swag Labs and verify elements', async ({ page }) => {

// Go to the Swag Labs website and verify the presence of key elements
  const swagLabsPage = new SwagLabsPage(page);
  await swagLabsPage.goto();
  await expect(swagLabsPage.swagLabsTitle).toBeVisible();
  await expect(swagLabsPage.username).toBeVisible();
  await expect(swagLabsPage.password).toBeVisible();
  await expect(swagLabsPage.loginButton).toBeVisible();
  await expect(swagLabsPage.loginCredentials).toBeVisible();
  await expect(swagLabsPage.loginPassword).toBeVisible();
});

test('Login to Swag Labs', async ({ page }) => {
  
  // Login to the application
  const swagLabsPage = new SwagLabsPage(page);
  await swagLabsPage.goto();
  await swagLabsPage.login('standard_user', 'secret_sauce');

  // verify that the user is logged in by checking for the presence of the products page elements
  await expect(swagLabsPage.productTitle).toBeVisible();
  await expect(swagLabsPage.shoppingCartLink).toBeVisible();
  });

  test('Login with locked out user', async ({ page }) => {

    // Attempt to login with a locked out user and verify the error message
    const swagLabsPage = new SwagLabsPage(page);
    await swagLabsPage.goto();
    await swagLabsPage.login('locked_out_user', 'secret_sauce');
    await expect(swagLabsPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  });