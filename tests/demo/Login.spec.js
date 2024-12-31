const { test, expect } = require('@playwright/test');
test.use({viewport:{width:1200, height:800}})
test('Valid Login', async ({ page }) => {
  await page.goto("https://opensource-demo.orangehrmlive.com/");
  console.log (await page.viewportSize().width)
  console.log (await page.viewportSize().height)

  await page.getByPlaceholder("Username").type("Admin",{delay:100})
await page.locator("//input[@placeholder='Password']").type("admin123",{delay:100})
await page.locator("//button[@type='submit']").click()

await page.waitForTimeout(5000)
await expect(page).toHaveURL(/dashboard/);
await page.waitForTimeout(5000)

await page.locator("//img[@class='oxd-userdropdown-img']").first().click()
await page.getByText("Logout").click()
await page.waitForTimeout(3000)

await expect(page).toHaveURL(/login/)
})
