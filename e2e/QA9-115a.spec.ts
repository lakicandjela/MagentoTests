import { test, expect } from "@playwright/test"
import { PageManager } from "../page-objects/pageManager"
import { existingUser } from "../helper/data"

let pm: PageManager


test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);   // Create a page manager for interactions
    await page.goto('/')
    await expect(pm.onHomePage().storeLogo).toBeVisible() // Assert that the site is opened
})


test('Is there an error message while registering with existing email', async ({ page }) => {
    // Setup:
    await pm.navigateTo().createAccountPage(); // Go to the account creation page
    expect(pm.onCreateAccountPage().createAccountPageTitle).toBeVisible()

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
