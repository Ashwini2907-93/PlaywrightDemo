const { test, expect } = require('@playwright/test');
const { login } = require('../../helpers/auth');

test.describe('My Documents Tests', () => {
    // Extend the test timeout to handle any delays
    test.setTimeout(60000);

    test.beforeEach(async ({ page }) => {
        console.log("Logging in before My Documents test...");
       
    });

    test.skip('Upload Document with Assertions', async ({ page }) => {
        console.log("Navigating to My Documents...");
        await page.locator("//p[normalize-space()='My Documents']").click();

        console.log("Selecting Document Type...");
        await page.locator("//span[normalize-space()='Select Document Type']").click();
        await page.locator("//li[contains(text(),'My Documents')]").click();
        await page.locator("//li[normalize-space()='Adhar Card']").click();

        console.log("Uploading document...");
        await page.locator("//input[@name='username']").setInputFiles("D:/Ashwini documents/Documents Self/AshwiniLangoteUID.pdf");

        console.log("Filling Remarks...");
        await page.locator("input[placeholder='Remarks']").fill("This is my UID");

        console.log("Submitting document...");
        await page.locator("button[type='submit']").click();

       // Assert confirmation message using updated XPath
       console.log("Waiting for confirmation message...");
       const confirmationMessage = page.locator("//div[@id='swal2-html-container']");
       await expect(confirmationMessage).toHaveText("Are you sure you want to upload document?", { timeout: 10000 });
       console.log("Confirmation message displayed: Are you sure you want to upload document?");
       await page.locator("//button[normalize-space()='OK']").click();

       // Assert success message using updated XPath
       console.log("Waiting for success message...");
       const successMessage = page.locator("//div[@id='swal2-html-container']");
       await expect(successMessage).toHaveText("Successfully uploaded document", { timeout: 10000 });
       console.log("Success message displayed: Successfully uploaded document");
       await page.locator("//button[normalize-space()='OK']").click();

       console.log("Successfully uploaded document!");
   });
   test('View Specific Document', async ({ page }) => {
    console.log("Navigating to My Documents...");
    await page.getByRole('link', { name: ' My Documents' }).click();

    console.log("Selecting 'All Documents' from dropdown...");
    await page.getByLabel('All Documents').click();
    await page.getByRole('option', { name: 'My Documents' }).click();

    console.log("Selecting specific folder...");
    await page.getByRole('cell', { name: 'My Documents-Adhar Card' }).click();

    console.log("Verifying document viewer...");
    const documentViewer = page.locator("//div[contains(@class, 'document-viewer')]");
    await expect(documentViewer).toBeVisible({ timeout: 10000 });

    console.log("Scrolling to view the document...");
    await page.evaluate(() => {
      document.querySelector('.document-viewer').scrollIntoView();
    });

    console.log("Setting zoom level to 100%...");
    await page.getByTestId('zoom__popover-target').click(); // Open zoom options
    await page.getByRole('menuitem', { name: '100%' }).click();

    console.log("Zoom level set to 100%.");
  });
});
