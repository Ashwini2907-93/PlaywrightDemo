import { test, expect } from '@playwright/test';

test('Check holidays for each month', async ({ page }) => {
  test.setTimeout(60000); // Extend timeout to 60 seconds

  // Open the timesheet website
  await page.goto('https://uattimesheet-ui.sstglobal.net/');
  await page.waitForLoadState('networkidle'); // Wait for the page to fully load

  // Log in to the website
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByPlaceholder('Username').fill('ashwini.langote@sstglobal.net');
  await page.getByPlaceholder('Password').fill('Swati@123');
  await page.getByRole('button', { name: 'Submit' }).click();

  // Wait for the Employee button to appear and click it
  await page.waitForSelector('button:has-text("Employee")', { timeout: 15000 });
  await page.getByRole('button', { name: 'Employee' }).click();

  // Navigate to the Holidays section
  await page.getByRole('link', { name: /Holidays/i }).click();
  await page.waitForSelector('text=Holidays Of Year', { timeout: 15000 });

  // Select the year 2025
  await page.getByRole('combobox').selectOption('2025');
  await page.waitForSelector('text=Holidays Of Year 2025', { timeout: 15000 });

  // Verify the heading
  const heading = await page.getByRole('heading', { name: /Holidays Of Year 2025/i });
  await expect(heading).toHaveText('Holidays Of Year 2025');

  // Wait for the holiday table rows to reload
  const holidayRows = await page.locator('table tbody tr');
  await holidayRows.first().waitFor();

  const rowCount = await holidayRows.count();
  const holidaysByMonth = {};
  let totalHolidays = 0;

  // Process holiday rows for 2025
  for (let i = 0; i < rowCount; i++) {
    const date = (await holidayRows.nth(i).locator('td').nth(0).textContent()).trim();
    const holidayName = (await holidayRows.nth(i).locator('td').nth(2).textContent()).trim();
    const remark = (await holidayRows.nth(i).locator('td').nth(3).textContent()).trim();

    // Check if the date is in 2025
    if (date.includes('2025')) {
      const [month, day] = date.split(' '); // Extract month and day
      if (!holidaysByMonth[month]) {
        holidaysByMonth[month] = [];
      }
      holidaysByMonth[month].push(`${date} - ${holidayName} (${remark})`);
      totalHolidays++;
    }
  }

  // Print holidays by month
  for (const month in holidaysByMonth) {
    console.log(`${month}: ${holidaysByMonth[month].length} holidays - ${holidaysByMonth[month].join(', ')}`);
  }

  // Print total holidays
  console.log(`Total holidays in the year: ${totalHolidays}`);

  // Log out
  const logoutButton = await page.locator('a.nav-link[href="/employee/logout"]'); // More specific locator
  await logoutButton.click();

  await page.getByRole('button', { name: 'Yes' }).click();
});
