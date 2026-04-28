import { test, expect } from '@playwright/test';

test('Go to Swag Labs and verify elements', async ({ page }) => {

// Go to the Swag Labs website and verify the presence of key elements
  await page.goto('https://www.saucedemo.com/');
  await expect(page.getByText('Swag Labs')).toBeVisible();
  await expect(page.locator('[data-test="username"]')).toBeVisible();
  await expect(page.locator('[data-test="password"]')).toBeVisible();
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  await expect(page.locator('[data-test="login-credentials"]')).toBeVisible();
  await expect(page.locator('[data-test="login-password"]')).toBeVisible();
});

test('Login to Swag Labs', async ({ page }) => {
  // Login to the application
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible();
  await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
  });