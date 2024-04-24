import {test, expect} from "@playwright/test"
import { PageManager } from "../page-objects/pageManager"
import { exsistingUser, product1 } from "../helper/data"


test.beforeEach( async ({page}) => {
	await page.goto('/')
})

test('Removing item completely from the cart in the cart menu', async({page}) => {
    // Setup:
    const pm = new PageManager(page)  // Create a page manager for interactions
    await pm.navigateTo().signInPage() // Navigate to sign-in
    pm.onSignInPage().signInWithCredentials(exsistingUser.email, exsistingUser.password) // Sign in

    // Record initial cart counter value
    const counter_before = await pm.onHomepage().cartCounterLocator.textContent() 

    // Add product 
    await pm.fromHelperBase().chooseProductWithSizeAndColor(product1.code, product1.size, product1.color)

    // Verify product added by checking cart counter change
    await expect(async () => {
		expect(await pm.onHomepage().cartCounterLocator.textContent()).not.toEqual(counter_before);
	}).toPass();

    // Open the cart menu
    await pm.onHomepage().minicartButton.click()

    // Click 'Remove' button
    await pm.onHomepage().removeFromCartButton.click()

    // Approve removal from cart
    await pm.onHomepage().approveRemovalFromCartButton.click()

    // Verify the cart is empty
    await expect(pm.onHomepage().cartIsEmptyText).toBeVisible()
})


