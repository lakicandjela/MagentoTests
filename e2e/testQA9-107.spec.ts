import { test, expect } from "@playwright/test"
import { PageManager } from "../page-objects/pageManager"

let pm: PageManager

test.beforeEach(async ({ page }) => {
    pm = new PageManager(page)   // Create a page manager for interactions
    await page.goto('/')
    await expect(pm.onHomepage().storeLogo).toBeVisible() // Assert that the site is opened
})

test('Error message while log in with incorrect credentials', async ({ page }) => {
    await pm.navigateTo().signInPage() // Navigate to sign-in
    expect(pm.onSignInPage().loginPageTitle).toBeVisible() // Assertion that the user is redirected to log in page

    // Generate a random user 
    const user = pm.fromHelperBase().genRandomUser();

    await pm.onSignInPage().signInWithCredentials((await user).email, (await user).password) // Sign in

    // Assert that the expected error message is displayed 
    await expect(pm.onSignInPage().loginNotSuccessfulMessage).toBeVisible()
})



