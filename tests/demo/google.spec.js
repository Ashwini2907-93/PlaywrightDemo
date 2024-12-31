const { test, expect } = require('@playwright/test');
const { console } = require('node:inspector/promises');

test('Verify Application Title', async function ({ page }) {

await page.goto("https://www.google.com/")
const url=page.url()
console.log("Title is"+url)

const title=await page.title()
console.log("This is "+title)

await expect(page).toHaveTitle("Google")
});