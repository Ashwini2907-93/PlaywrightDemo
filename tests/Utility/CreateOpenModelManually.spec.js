import { test, expect } from './Login.js'; // Import the login logic

test('Create a new model with manual name entry', async ({ page }) => {
  // Reuse login functionality
  await test.login({ page });

  // Navigate to dashboard
  await page.goto('https://utility.sstglobal.net/dashboard');
  await expect(page).toHaveURL('https://utility.sstglobal.net/dashboard');

  // Navigate to Models page
  await page.getByRole('button', { name: 'Models' }).click();

  // Click "Create New Model"
  await page.getByRole('button', { name: 'Create New Model' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();

  // Fill model details manually
  await page.getByRole('textbox', { name: 'Enter model name' }).click();
  await page.getByRole('textbox', { name: 'Enter model name' }).fill('ManualModelName');

  // Configure sliders and input fields
  await page.locator('div').filter({ hasText: /^Maximum token length$/ }).locator('input').fill('919');
  await page.locator('div').filter({ hasText: /^Temperature$/ }).locator('input').fill('0.55');
  await page.locator('div').filter({ hasText: /^Top P$/ }).locator('input').fill('0.23');
  await page.locator('div').filter({ hasText: /^Frequency Penalty$/ }).locator('input').fill('0.8');
  await page.locator('div').filter({ hasText: /^Presence Penalty$/ }).locator('input').fill('0.9');
  await page.locator('div').filter({ hasText: /^Sensitivity$/ }).locator('input').fill('0.25');
  await page.locator('div').filter({ hasText: /^Cost Limit per Month$/ }).locator('input').fill('1398');
  await page.locator('input[name="baseCostInputTokens"]').fill('$0.005');
  await page.locator('input[name="baseCostOutputTokens"]').fill('$0.007');

  // Fill other mandatory fields
  await page.getByPlaceholder('stopSequence data').fill('Test');
  await page.getByPlaceholder('bias data').fill('2');
  await page.getByPlaceholder('Model URL').fill('https://google.com');
  await page.getByPlaceholder('API Key').fill('your_api_key_here');

  // Save and validate
  await page.getByRole('button', { name: 'Save Model' }).click();
  await expect(page.getByText('Model created successfully.')).toBeVisible();

  // Go back to Models and logout
  await page.getByRole('button', { name: 'Go to Models' }).click();
  await page.getByRole('button', { name: 'Log Out' }).click();
});
