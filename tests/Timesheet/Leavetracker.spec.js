const { test, expect } = require('@playwright/test');
const { login } = require('../../helpers/auth');

test.describe('Leave Tracker Tests', () => {
    test.beforeEach(async ({ page }) => {
        await login(page, "ashwini.langote@sstglobal.net", "Swati@123");
    });

    test('Apply Leave Functionality Test', async ({ page }) => {
        await page.locator("a[href='/employee/leavetracker']").click();
        await page.locator("//button[@type='submit']").click();

        await page.locator("#leavetype").selectOption("Casual Leave");
        await page.locator("//select[@id='exampleFormControlSelect1']").selectOption({ label: "Full Day" });
        await page.locator("input[placeholder='From Date']").fill("2024-12-24");
        await page.locator("input[placeholder='To Date']").fill("2024-12-24");
        await page.locator("#reason").fill("Have function at my home");
        await page.locator("//button[normalize-space()='Submit']").click();
        await page.locator("//button[normalize-space()='OK']").click();
        await page.locator("//button[normalize-space()='OK']").click();
        await expect(page.locator("text=Leave Applied Successfully")).toBeVisible();
        console.log("Leave application submitted successfully.");
    });
});
