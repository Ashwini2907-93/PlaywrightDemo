import { test, expect } from './Login.js'; // Import custom test with login logic

test.setTimeout(60000); // Set test timeout to 60 seconds

test('Create a new model', async ({ page }) => {
  // Step 1: Login to the application
  await page.goto('https://utility.sstglobal.net/');
  await page.getByRole('button', { name: 'Microsoft Logo Log in with' }).click();
  await page.getByLabel('Enter your email or phone').fill('ashwini-gis@sstus.net');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('#i0118').fill('A@sh123$');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByLabel('Don\'t show this again').check();
  await page.getByRole('button', { name: 'Yes' }).click();

  // Step 2: Verify login and wait for the dashboard to load
  await expect(page).toHaveURL('https://utility.sstglobal.net/dashboard');
  await page.waitForTimeout(3000);

  // Step 3: Navigate to the Models section
  await page.getByRole('button', { name: 'Models' }).click();
  await page.waitForTimeout(2000);

  // Step 4: Create a new model
  await page.getByRole('button', { name: 'Create New Model' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();

  // Step 5: Configure model details
  await page.getByLabel('Open Source').check();
  await page.getByRole('button', { name: 'Select Model' }).click();
  await page.locator('input[placeholder="Search or add model"]').fill('GPT4.00');
  await page.waitForTimeout(1000);

  // Add the new model
  const addModelLocator = `//a[normalize-space()='Add "GPT4.00" as new model']`;
  await page.locator(addModelLocator).click();

  // Step 6: Configure model settings
  const settings = [
    { label: 'Maximum token length', value: '2710' },
    { label: 'Temperature', value: '1.1' },
    { label: 'Top P', value: '0.96' },
    { label: 'Frequency Penalty', value: '0.63' },
    { label: 'Presence Penalty', value: '0.88' },
    { label: 'Sensitivity', value: '0.75' },
    { label: 'Cost Limit per Month', value: '1108' },
  ];

  for (const setting of settings) {
    const slider = page.locator('div').filter({ hasText: new RegExp(`^${setting.label}$`) }).locator('input[type="range"]');
    await slider.fill(setting.value);
  }

  // Step 7: Fill in base costs, URL, and API Key
  await page.locator('input[name="baseCostInputTokens"]').fill('$0.005'); // Replace value directly
  await page.locator('input[name="baseCostOutputTokens"]').fill('$0.007'); // Replace value directly
  await page.getByPlaceholder('stopSequence data').fill('Test');
  await page.getByPlaceholder('bias data').fill('2');
  await page.getByPlaceholder('Model URL').fill('https://google.com');
  await page.getByPlaceholder('API Key').fill('abcd');

  // Step 8: Test the API Key and handle failure
  await page.getByRole('button', { name: 'Test' }).click();
  const errorModal = page.locator('//button[normalize-space()="OK"]');
  await errorModal.waitFor({ state: 'visible', timeout: 5000 }); // Wait for the error modal to appear
  await errorModal.click(); // Click "OK" on the error modal

  // Step 9: Save the model and validate success
  await page.getByRole('button', { name: 'Save Model' }).click();

  // Step 10: Wait for the success modal and click "OK"
  const successModalOKButton = page.locator('//button[normalize-space()="OK"]');
  await successModalOKButton.waitFor({ state: 'visible', timeout: 10000 }); // Wait for the modal to appear
  await successModalOKButton.click({ force: true }); // Force click the "OK" button

  // Step 11: Navigate back to Models and log out
  await page.getByRole('button', { name: 'Go to Models' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.getByRole('button', { name: 'Log Out' }).click();

  // Step 12: Stop tracing and save the trace file
  await page.context().tracing.stop({ path: 'trace.zip' });
});
