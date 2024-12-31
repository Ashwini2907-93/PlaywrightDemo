const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://uattimesheet-ui.sstglobal.net/');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('ashwini.langote@sstglobal.net');
  await page.getByPlaceholder('Username').press('Tab');
  await page.getByPlaceholder('Password').fill('Swati@123');
  await page.locator('#rememberme').check();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Employee' }).click();
  await page.getByRole('link', { name: ' My Documents' }).click();
  await page.getByLabel('All Documents').click();
  await page.getByRole('option', { name: 'My Documents' }).click();
  await page.getByRole('cell', { name: 'My Documents-Adhar Card' }).click();
  await page.getByTestId('zoom__popover-target').click();
  await page.getByRole('menuitem', { name: '100%' }).click();
  await page.getByRole('link', { name: ' Log out' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();