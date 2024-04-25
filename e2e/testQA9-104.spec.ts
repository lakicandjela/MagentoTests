import { test, expect } from "@playwright/test"
import { PageManager } from "../page-objects/pageManager"
import { existingUser, product1, review1 } from "../helper/data"

let pm: PageManager

test.beforeEach(async ({ page }) => {
    pm = new PageManager(page)   // Create a page manager for interactions
    await page.goto('/')
    await expect(pm.onHomepage().storeLogo).toBeVisible() // Assert that the site is opened

    // Sign in
    await pm.navigateTo().signInPage()
    expect(pm.onSignInPage().loginPageTitle).toBeVisible() // Assertion that the user is redirected to log in page
    await pm.onSignInPage().signInWithCredentials(existingUser.email, existingUser.password)
    expect(pm.onHomepage().openUserMenu).toBeVisible() // Assert that the user is successfuly signed in
})

test('Leave a review', async ({ page }) => {
    // Navigate to the product details page:
    await pm.fromHelperBase().clickOnProduct(product1.code)

    // Submit a review for the selected product:
    await pm.fromHelperBase().fillReview(review1)

    // Verify review submission success:
    await expect(page.getByText('You submitted your review for')).toBeVisible()
})