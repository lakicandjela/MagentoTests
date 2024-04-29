import { test, expect } from "@playwright/test"
import { PageManager } from "../page-objects/pageManager"
import { existingUser, product1 } from "../helper/data"

let pm: PageManager

test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);  // Create a page manager for interactions
    await page.goto('/')
    await expect(pm.onHomePage().storeLogo).toBeVisible() // Assert that the site is opened
})

test('Verify that an item can be completely removed from the cart in the cart menu', async ({ page }) => {
    // Setup:
    await pm.navigateTo().signInPage() // Navigate to sign-in
    await expect(pm.onSignInPage().loginPageTitle).toBeVisible()

    await pm.onSignInPage().signInWithCredentials(existingUser.email, existingUser.password) // Sign in
    expect(await pm.onHomePage().openUserMenu).toBeVisible() // Assert that the user is successfuly signed in

    // Record initial cart counter value
    const counterBefore = await pm.onHomePage().cartCounterLocator.textContent()

    // Add product 
    await pm.fromHelperBase().chooseProductWithSizeAndColor(product1.code, product1.size, product1.color)

    // Verify product added by checking cart counter change
    await expect(async () => {
        expect(await pm.onHomePage().cartCounterLocator.textContent()).not.toEqual(counterBefore);
    }).toPass();

    // Open the cart menu
    await pm.onHomePage().minicartButton.click()
    expect(pm.onHomePage().closeMinicartButton).toBeVisible()

    // Click 'Remove' button
    await pm.onHomePage().removeFromCartButton.click()
    expect(pm.onHomePage().removeFromCartPopupQuestionTitle).toBeVisible()

    // Approve removal from cart
    await pm.onHomePage().approveRemovalFromCartButton.click()

    // Final assertion: verify the cart is empty
    await expect(pm.onHomePage().cartIsEmptyText).toBeVisible()
})


