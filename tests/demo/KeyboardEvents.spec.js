const { test, expect } = require('@playwright/test');

test('keyboard events in playwright', async ({ page }) => {
   await page.goto('https://google.com');
    await page.locator("textarea[name='q']").type('Mukesh Otwani');
   /* await page.keyboard.press("Meta+A")
    await page.keyboard.press("Meta+C")
    await page.keyboard.press("Backspace")
    await page.keyboard.press("Meta+V")
    //await page.keyboard.press("Enter")*/ 
await page.keyboard.type("Mukesh Otwani!")
await page.keyboard.press("ArrowLeft")
await page.keyboard.down("Shift")
for(let i=0;i<6;i++){
    await page.keyboard.press("ArrowLeft")
}
await page.keyboard.up("Shift")

await page.keyboard.press("Backspace")
});
