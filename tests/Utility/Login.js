import { test as baseTest, expect } from '@playwright/test';

export const test = baseTest.extend({
  login: async ({ page }, use) => {
    // Login logic
    await page.goto('https://utility.sstglobal.net/');
    await page.getByRole('button', { name: 'Microsoft Logo Log in with' }).click();
    await page.getByLabel('Enter your email or phone').fill('ashwini-gis@sstus.net');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.locator('#i0118').fill('A@sh123$');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByLabel('Don\'t show this again').check();
    await page.getByRole('button', { name: 'Yes' }).click();

    // Pass control back to the test
    await use(page);
  }
});

export { expect }; // Export expect for assertions
