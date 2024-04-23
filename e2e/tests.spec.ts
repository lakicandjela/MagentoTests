import {test, expect} from "@playwright/test"
import { PageManager } from "../page-objects/pageManager"
import {faker} from '@faker-js/faker'
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
    const counter_before = await page.locator('.counter-number').textContent()

    // Add product using helper function
    await pm.fromHelperBase().chooseProductWithSizeAndColor(product1.code, product1.size, product1.color)

    // Verify product added by checking cart counter change
    await expect(async () => {
		await expect(await page.locator('.counter-number').textContent()).not.toEqual(counter_before);
	}).toPass();

    // Open the cart menu
    await page.locator('[class="minicart-wrapper"]').click()

    // Click 'Remove' button
    await page.getByText('Remove').click()

    await page.locator('[class="action-primary action-accept"]').click()

    // Verify the cart is empty
    await expect(page.getByText('You have no items in your')).toBeVisible()

})


