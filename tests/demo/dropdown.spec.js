const { test, expect } = require('@playwright/test');

test('Select values from drop down', async ({ page }) => {
    /**
     * label
     * value
     * index
     */
    
    await page.goto("https://freelance-learn-automation.vercel.app/signup");
    
    // Select option by label
    await page.locator("#state").selectOption({ label: "Goa" });

    // Optionally, you can select by value or index as well
    // await page.locator("#state").selectOption({ value: "Karnataka" });
    // await page.locator("#state").selectOption({ index: 8 });

    // Wait for the dropdown to update (if necessary)
    await page.waitForTimeout(2000);

    // Get the state dropdown element
    const stateDropdown = await page.locator("#state");

    // Get all option elements within the dropdown
    const allElements = await stateDropdown.locator('option').all();

    let ddStatus = false;

    // Loop through each option and check for 'Rajasthan'
    for (let i = 0; i < allElements.length; i++) {
        let element = allElements[i];
        let value = await element.textContent();
        console.log("Value from dropdown using for loop: " + value);

        // If 'Rajasthan' is found, set ddStatus to true
        if (value.includes("Rajasthan")) {
            ddStatus = true;
            break;
        }
    }

    // Assert that 'Rajasthan' was found in the dropdown
   await expect(ddStatus).toBeTruthy();
    await page.locator("#hobbies").selectOption(['Swimming','Reading'])
    await page.waitForTimeout(3000)
});
