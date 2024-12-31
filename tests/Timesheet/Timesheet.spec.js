import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Increase the timeout for navigation
  await page.goto('https://uattimesheet-ui.sstglobal.net/', { timeout: 60000 });
  
  // Wait for the login button to be visible before proceeding
  await page.waitForSelector('button:has-text("Login")', { timeout: 20000 });

  await page.getByRole('button', { name: 'Login' }).click();

  // Login process
  await page.getByPlaceholder('Username').fill('ashwini.langote@sstglobal.net');
  await page.getByPlaceholder('Password').fill('Swati@123');
  await page.locator('#rememberme').check();
  await page.getByRole('button', { name: 'Submit' }).click();

  // Wait for Employee button to appear
  await page.waitForSelector('button:has-text("Employee")', { timeout: 10000 });
  await page.getByRole('button', { name: 'Employee' }).click();

  // Navigate to Time Tracker
  await page.getByRole('link', { name: ' Time Tracker' }).click();

  // Select month and week
  await page.getByPlaceholder('month').fill('2024-11');
  await page.locator('//select[@name="selectWeek"]').selectOption({ value: '11-11-2024 to 17-11-2024' });

  // Filling timesheet details
  const days = [
    { date: 'Monday, November 11, 2024', project: 'Textile', hours: '8', remarks: 'Testing application' },
    { date: 'Tuesday, November 12, 2024', project: 'TimeSheet', hours: '8', remarks: 'Testing application' },
    { date: 'Wednesday, November 13, 2024', project: 'TimeSheet', hours: '8', remarks: 'Testing Application' },
    { date: 'Thursday, November 14, 2024', project: 'TimeSheet', hours: '8', remarks: 'Testing' },
    { date: 'Friday, November 15, 2024', project: 'Textile', hours: '8', remarks: 'Testing' }
  ];

  for (const day of days) {
    const row = page.getByRole('row', { name: day.date });
    await row.getByLabel('Select Project').click();
    await page.getByRole('option', { name: day.project }).click();
    await row.getByPlaceholder('0').fill(day.hours);
    await row.getByPlaceholder('Remarks').fill(day.remarks);
  }

  // Save as Draft
  await page.getByRole('button', { name: 'Save as Draft' }).click();
  await page.getByRole('button', { name: 'OK' }).click();

  // Submit for Approval
  await page.getByRole('button', { name: 'Submit for Approval' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
});
