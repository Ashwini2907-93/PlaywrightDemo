const { test, expect } = require('@playwright/test');
const { login } = require('../../helpers/auth');

// Common locators and variables
const BASE_URL = 'https://uattimesheet-ui.sstglobal.net/';
const MONTH_INPUT = '//input[@placeholder="month"]';
const WEEK_SELECT = '//select[@name="selectWeek"]';
const SAVE_DRAFT_BUTTON = "//button[normalize-space()='Save as Draft']";
const SAVE_DRAFT_CONFIRM_DIALOG = "//div[@id='swal2-html-container']";
const SUBMIT_BUTTON = "//button[normalize-space()='Submit for Approval']";
const CONFIRM_DIALOG = "//div[@id='swal2-html-container']";
const CONFIRM_OK_BUTTON = "//button[normalize-space()='OK']";
const SUCCESS_MESSAGE = "//div[@id='swal2-html-container']";

// Helper function to check if timesheet is filled for a specific day
async function isDayFilled(page, dayIndex) {
    const hoursLocator = `//input[@id='hours-${dayIndex}']`;
    const remarksLocator = `//textarea[@id='remark-${dayIndex}']`;

    const hoursValue = await page.locator(hoursLocator).inputValue();
    const remarksValue = await page.locator(remarksLocator).inputValue();

    return hoursValue === '8' && remarksValue === 'Testing';
}

// Helper function to fill timesheet details
async function fillDayDetails(page, dayIndex, project, hours, remarks) {
    const projectLocator = `//div[@id='project_id-${dayIndex}']`; // Locator for selecting the project
    const hoursLocator = `//input[@id='hours-${dayIndex}']`; // Locator for entering hours
    const remarksLocator = `//textarea[@id='remark-${dayIndex}']`; // Locator for entering remarks

    // Select Project
    console.log(`Selecting project for day index ${dayIndex}...`);
    await page.locator(projectLocator).click();
    await page.locator("//div[@id='menu-project_id']").waitFor({ state: 'visible', timeout: 5000 });
    await page.getByRole('option', { name: project }).click();

    // Enter Hours
    console.log(`Entering hours for day index ${dayIndex}...`);
    await page.locator(hoursLocator).fill(hours);

    // Enter Remarks
    console.log(`Entering remarks for day index ${dayIndex}...`);
    await page.locator(remarksLocator).fill(remarks);
}

test.describe('TimeTracker Tests', () => {
    test.setTimeout(90000); // Increase test timeout for the entire suite

    test.beforeEach(async ({ page }) => {
        console.log("Logging in...");
        await login(page, "ashwini.langote@sstglobal.net", "Swati@123");
    });

    test('Fill Timesheet and Submit', async ({ page }) => {
        console.log("Opening TimeTracker...");

        // Navigate to TimeTracker page
        await page.locator("//a[@href='/employee/timeTracker2']").click();
        await page.waitForTimeout(3000);

        // Select month and week
        console.log("Selecting month and week...");
        await page.locator(MONTH_INPUT).waitFor({ state: 'visible', timeout: 5000 });
        await page.locator(MONTH_INPUT).evaluate((input) => input.value = '2024-12');
        await page.locator(WEEK_SELECT).waitFor({ state: 'visible', timeout: 5000 });
        await page.locator(WEEK_SELECT).selectOption('09-12-2024 to 15-12-2024');
        await page.waitForTimeout(3000);

        // Check if data is filled up to Friday
        let allDaysFilled = true;
        for (let dayIndex = 0; dayIndex <= 4; dayIndex++) {
            const isFilled = await isDayFilled(page, dayIndex);
            if (!isFilled) {
                allDaysFilled = false;
                break;
            }
        }

        if (!allDaysFilled) {
            console.log("Filling timesheet details...");
            await fillDayDetails(page, 0, 'Textile', '8', 'Testing'); // Monday
            await fillDayDetails(page, 1, 'Textile', '8', 'Testing'); // Tuesday
            await fillDayDetails(page, 2, 'TimeSheet', '8', 'Testing'); // Wednesday
            await fillDayDetails(page, 3, 'TimeSheet', '8', 'Testing'); // Thursday
            await fillDayDetails(page, 4, 'TimeSheet', '8', 'Testing'); // Friday
        } else {
            console.log("Timesheet details are already filled up to Friday.");
        }

        // Save as Draft
        console.log("Saving timesheet as draft...");
        await page.locator(SAVE_DRAFT_BUTTON).waitFor({ state: 'visible', timeout: 5000 });
        await page.locator(SAVE_DRAFT_BUTTON).click();
        await page.locator(SAVE_DRAFT_CONFIRM_DIALOG).waitFor({ state: 'visible', timeout: 5000 });
        const draftMessage = await page.locator(SAVE_DRAFT_CONFIRM_DIALOG).textContent();
        expect(draftMessage).toContain('Do you want to save as Draft?');
        await page.locator(CONFIRM_OK_BUTTON).click();

        // Verify Save as Draft Success
        console.log("Verifying save as draft success...");
        const draftSuccessMessage = await page.locator(SUCCESS_MESSAGE).textContent();
        expect(draftSuccessMessage).toContain('Successfully saved as Draft!');
        await page.locator(CONFIRM_OK_BUTTON).click();

        // Submit
        console.log("Submitting timesheet...");
        await page.locator(SUBMIT_BUTTON).waitFor({ state: 'visible', timeout: 5000 });
        await page.locator(SUBMIT_BUTTON).click();

        // Handle Submit Confirmation Dialog
        console.log("Handling Submit confirmation dialog...");
        await page.locator(CONFIRM_DIALOG).waitFor({ state: 'visible', timeout: 5000 });
        await page.locator(CONFIRM_OK_BUTTON).click();

        // Verify Success Message
        console.log("Verifying success message...");
        const successMessage = await page.locator(SUCCESS_MESSAGE).textContent();
        expect(successMessage).toContain('Successfully Submitted!');

        console.log("Timesheet submission complete.");
    });
});
