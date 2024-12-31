import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  console.log("Navigating to the login page...");
  await page.goto('https://qa-utility.sstglobal.net/');

  console.log("Clicking on the 'Log in with Microsoft' button...");
  await page.getByRole('button', { name: 'Microsoft Logo Log in with' }).click();

  console.log("Filling the email field...");
  const emailField = page.getByPlaceholder('Email or phone');
  await emailField.waitFor({ timeout: 15000 }); // Ensure the field is visible
  await emailField.fill('ashwini-gis@sstus.net');

  console.log("Clicking the 'Next' button...");
  const nextButton = page.getByRole('button', { name: 'Next' });
  await nextButton.waitFor({ timeout: 15000 }); // Ensure the button is ready
  await nextButton.click();

  console.log("Filling the password field...");
  const passwordField = page.locator('#i0118');
  await passwordField.waitFor({ timeout: 15000 }); // Ensure the password field is visible
  await passwordField.fill('A@sh123$');

  console.log("Clicking the 'Sign in' button...");
  const signInButton = page.getByRole('button', { name: 'Sign in' });
  await signInButton.waitFor({ timeout: 15000 }); // Ensure the button is ready
  await signInButton.click();

  console.log("Handling 'Don't show this again' checkbox...");
  const dontShowCheckbox = page.getByLabel("Don't show this again");
  await dontShowCheckbox.waitFor({ timeout: 15000 }); // Ensure the checkbox is visible
  await dontShowCheckbox.check();

  console.log("Clicking the 'Yes' button...");
  const yesButton = page.getByRole('button', { name: 'Yes' });
  await yesButton.waitFor({ timeout: 15000 }); // Ensure the button is ready
  await yesButton.click();

  console.log("Navigating to the dashboard...");
  await page.waitForTimeout(5000); // Wait for any redirections
  await page.goto('https://qa-utility.sstglobal.net/dashboard');

  console.log("Test completed successfully.");
});
