import { test, expect } from "@playwright/test"
import { PageManager } from "../page-objects/pageManager"
import { existingUser } from "../helper/data"


test.beforeEach(async ({ page }) => {
    const pm = new PageManager(page);
    await page.goto('/')
    await expect(pm.onHomepage().storeLogo).toBeVisible() // Assert that the site is opened
})


test('Error message is there while registering with existing email', async ({ page }) => {
    // Setup:
    const pm = new PageManager(page); // Create a PageManager for page interactions
    await pm.navigateTo().createAccountPage(); // Go to the account creation page
    await expect(pm.onCreateAccountPage().createAccountPageTitle).toBeVisible()

    // Generate a random user (note: this assumes the helper function does NOT use the existing user's email)
    const user = pm.fromHelperBase().genRandomUser();

    // Attempt to create an account using the existing user's email but random other details
    await pm.onCreateAccountPage().createAccountWithCredentials(
        (await user).firstName,
        (await user).lastName,
        existingUser.email, // Deliberately using the existing email
        (await user).password,
        (await user).password
    );

    // Assert that the expected error message is displayed 
    await expect(page.getByText('There is already')).toBeVisible();
});