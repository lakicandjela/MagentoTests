import { test, expect } from "@playwright/test"
import { PageManager } from "../page-objects/pageManager"
import { existingUser, product1 } from "../helper/data"


test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test('Removing item completely from the cart in the cart menu', async ({ page }) => {
    // Setup:
    const pm = new PageManager(page)  // Create a page manager for interactions
    await pm.navigateTo().signInPage() // Navigate to sign-in
    await expect(pm.onSignInPage().loginPageTitle).toHaveText('Customer Login')
    pm.onSignInPage().signInWithCredentials(existingUser.email, existingUser.password) // Sign in

    await expect(pm.onHomepage().bannerTitleWhenLoggedin).toHaveText('Click “Write for us” link in the footer to submit a guest post')

    // Record initial cart counter value
    const counterBefore = await pm.onHomepage().cartCounterLocator.textContent()

    // Add product 
    await pm.fromHelperBase().chooseProductWithSizeAndColor(product1.code, product1.size, product1.color)

    // Verify product added by checking cart counter change
    await expect(async () => {
        expect(await pm.onHomepage().cartCounterLocator.textContent()).not.toEqual(counterBefore);
    }).toPass();

    // Open the cart menu
    await pm.onHomepage().minicartButton.click()
    await expect(pm.onHomepage().closeMinicartButton).toBeVisible()

    // Click 'Remove' button
    await pm.onHomepage().removeFromCartButton.click()
    await expect(pm.onHomepage().removeFromCartPopupQuestionTitle).toBeVisible()

    // Approve removal from cart
    await pm.onHomepage().approveRemovalFromCartButton.click()

    // Final assertion: verify the cart is empty
    await expect(pm.onHomepage().cartIsEmptyText).toBeVisible()
})


