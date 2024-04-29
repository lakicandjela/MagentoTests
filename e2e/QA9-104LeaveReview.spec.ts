import { test, expect } from "@playwright/test"
import { PageManager } from "../page-objects/pageManager"
import { product1, review1 } from "../helper/data"

let pm: PageManager

test.beforeEach(async ({ page }) => {
    pm = new PageManager(page)   // Create a page manager for interactions
    await page.goto('/')
    await expect(pm.onHomePage().storeLogo).toBeVisible() // Assert that the site is opened

    // Sign in
    await pm.onSignInPage().goToLoginPageAndLoginWithExistingUser(pm)
})

test('Verify that a product review could be made', async ({ page }) => {
    // Navigate to the product details page:
    await pm.fromHelperBase().clickOnProduct(product1.code)

    // Submit a review for the selected product:
    await pm.fromHelperBase().fillReview(review1)

    // Verify review submission success:
    await expect(await pm.onHomePage().successfulReviewMessage).toBeVisible()
})