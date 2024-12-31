async function login(page, username, password) {
    console.log("Navigating to login page...");
    await page.goto('https://uattimesheet-ui.sstglobal.net/', { waitUntil: 'load', timeout: 60000 }); // Increased timeout
    await page.locator("button[id='login-button']").click();
    console.log("Filling login credentials...");
    await page.fill("#Username", username);
    await page.fill("#Password", password);
    await page.locator("input[id='rememberme']").click();
    await page.locator("button[type='submit']").click();
    console.log("Login successful...");

    // Navigate to Employee site
    console.log("Navigating to Employee site...");
    await page.locator("//span[normalize-space()='Employee']").click();
    console.log("Successfully navigated to Employee site.");
}

module.exports = { login };
