const { test, expect } = require('@playwright/test');

test("verify Error message", async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/");
    await page.getByPlaceholder("Username").type("Admin");
    await page.getByPlaceholder("Password").type("admindas");
    await page.locator("//button[@type='submit']").click();
    await page.waitForTimeout(3000)
    const errorMessage = await page.locator("//div[@class='oxd-alert-content oxd-alert-content--error']").textContent();
    await page.waitForTimeout(3000)
    console.log("Error Message is: " + errorMessage.trim());
    expect(errorMessage.includes("Invalid")).toBeTruthy()
    expect(errorMessage==="Invalid credential").toBeTruthy()
});
