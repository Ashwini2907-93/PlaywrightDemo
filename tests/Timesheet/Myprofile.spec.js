const { test, expect } = require('@playwright/test');
const { login } = require('../../helpers/auth');

test.describe('My Profile Tests', () => {
    const profileData = {
        firstName: "Ashwini",
        lastName: "Langote",
        homeAddress: "51/4 Mehtab Nagar Shelagi Solapur",
        country: "India",
        city: "Gulbarga",
        pinCode: "585312",
        mobileNumber: "8542136954",
        personalEmail: "ashuharihar2@gmail.com",
        bloodGroup: "O+",
        emergencyContactName: "Shivakumar",
        emergencyContactNumber: "8600015649",
    };

    test.beforeEach(async ({ page }) => {
        await login(page, "ashwini.langote@sstglobal.net", "Swati@123");
    });

    test('Update My Profile with Valid Data and Upload Profile Picture', async ({ page }) => {
        await page.locator("a[href='/employee/user']").click();
        await page.locator("input[placeholder='First Name']").fill(profileData.firstName);
        await page.locator("input[placeholder='Last Name']").fill(profileData.lastName);
        await page.locator("input[placeholder='Home Address']").fill(profileData.homeAddress);
        await page.locator("select[placeholder='Country']").selectOption(profileData.country);
        await page.locator("input[placeholder='City']").fill(profileData.city);
        await page.locator("input[placeholder='Pin Code']").fill(profileData.pinCode);
        await page.locator("input[placeholder='Enter mobile no.']").fill(profileData.mobileNumber);
        await page.locator("input[name='personal_email_id']").fill(profileData.personalEmail);
        await page.locator("input[placeholder='Blood Group']").fill(profileData.bloodGroup);
        await page.locator("input[name='emergency_contact_name']").fill(profileData.emergencyContactName);
        await page.locator("input[name='emergency_contact_no']").fill(profileData.emergencyContactNumber);
        await page.locator('input[type="file"]').setInputFiles("C:/Users/SSTGI/OneDrive/Pictures/Screenshots/Screenshot 2024-12-18 143952.png");
        await page.locator("button[type='submit']").click();
        await expect(page.locator("text=Successfully Updated Profile")).toBeVisible();
        console.log("Profile updated successfully.");
    });
});
