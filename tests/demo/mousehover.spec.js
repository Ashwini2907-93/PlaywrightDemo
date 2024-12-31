// Import Playwright Test package
const { test, expect } = require('@playwright/test');

test('test codegenBranded', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://freelance-learn-automation.vercel.app/login');

  // Perform login
  await page.getByPlaceholder("Enter Email").type("admin25@gmail.com");
  await page.getByPlaceholder("Enter Password").type("admin@123");
  await page.getByRole("button", { name: 'Sign in' }).click();
 await page.waitForTimeout(5000)
  // Hover over the cart button
  await page.locator("//button[@class='cartBtn']").hover({force:true});
  await page.waitForTimeout(3000)
    await page.locator("//button[@class='cartBtn']").click();

});
