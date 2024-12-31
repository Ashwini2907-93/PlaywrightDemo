const { test, expect } = require('@playwright/test');
const { login } = require('../../helpers/auth');

test.describe('Login Tests', () => {
    test('Valid Login Test', async ({ page }) => {
        await login(page, "ashwini.langote@sstglobal.net", "Swati@123");
        await page.waitForTimeout(3000)
        await expect(page).toHaveURL(/dashboard/);
        console.log("Successfully logged in and navigated to the dashboard.");
    });

    test('Invalid Login Test', async ({ page }) => {
        await page.goto('https://uattimesheet-ui.sstglobal.net/');
        await page.locator("button[id='login-button']").click();
        await page.fill("#Username", "invalid.user@example.com");
        await page.fill("#Password", "WrongPassword123");
        await page.locator("button[type='submit']").click();
        await expect(page.locator("text=Invalid username or password")).toBeVisible();
        console.log("Invalid login test passed.");
    });
});
