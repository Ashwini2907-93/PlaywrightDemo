const { test, expect } = require('@playwright/test');

test("Verify file upload", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/upload");
    await page.waitForTimeout(3000)
    //await page.locator("#file-upload").setInputFiles("C:/Users/SSTGI/OneDrive/Pictures/Screenshots/Screenshot 2024-12-18 143952.png");
    await page.locator("#file-upload").setInputFiles("./tests/demo/Upload/Onion.jpg");

    await page.waitForTimeout(3000)
    await page.locator("#file-submit").click();
    await page.waitForTimeout(3000)
    await expect(page.locator("h3")).toHaveText("File Uploaded!");
    await page.waitForTimeout(3000)

});
