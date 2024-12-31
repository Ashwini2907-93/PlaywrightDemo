const { test, expect } = require('@playwright/test');

test('Verify application title using keyboard', async ({ page }) => {
    await page.goto('https://google.com');
    await page.locator("textarea[name='q']").type('Playwright');
    await page.waitForTimeout(2000);
    await page.waitForSelector("//li[@role='presentation']");
    await page.waitForTimeout(2000);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(2000);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
});

test.only('Verify application title using loop', async ({ page }) => {
    await page.goto('https://google.com');
    await page.locator("textarea[name='q']").type('Playwright');
    await page.waitForTimeout(2000);
    await page.waitForSelector("//li[@role='presentation']");
    await page.waitForTimeout(2000);

    const elements = await page.$$("//li[@role='presentation']");
    for (let i = 0; i < elements.length; i++) {
    const text = await elements[i].textContent();
    if (text && text.includes("youtube")) {
     await elements[i].click();
            break;
        }
    }
});
