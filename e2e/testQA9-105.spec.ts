import { test, expect } from "@playwright/test"
import { PageManager } from "../page-objects/pageManager"
import { existingUser, product1 } from "../helper/data"


test.beforeEach(async ({ page }) => {
    const pm = new PageManager(page)
    await page.goto('/')
    await expect(pm.onHomepage().storeLogo).toBeVisible() // Assert that the site is opened
})

test('Items stay in cart after login', async ({ page }) => {
    const pm = new PageManager(page)

    // Record initial cart counter value
    const counter_before = await page.locator('.counter-number').textContent()

    // Open the cart menu
    await page.locator('[class="minicart-wrapper"]').click()

    const numOfProductsBefore = Number(await page.locator('#minicart-content-wrapper').locator('[title="Items in Cart"]').innerText())

    // Add product using helper function
    await pm.fromHelperBase().chooseProductWithSizeAndColor(product1.code, product1.size, product1.color)

    await pm.navigateTo().signInPage()
    pm.onSignInPage().signInWithCredentials(existingUser.email, existingUser.password) // Sign in

    // Verify product added by checking cart counter change
    await expect(async () => {
        await expect(await page.locator('.counter-number').textContent()).not.toEqual(counter_before);
    }).toPass();

    // Open the cart menu
    await page.locator('[class="minicart-wrapper"]').click()
    const numOfProductsAfter = Number((await page.locator('#minicart-content-wrapper').locator('[title="Items in Cart"]').innerText()))

    await expect(numOfProductsAfter).not.toEqual(numOfProductsBefore)

})

test('Items stay in cart after create an account', async ({ page }) => {
    const pm = new PageManager(page)

    // Record initial cart counter value
    const counter_before = await page.locator('.counter-number').textContent()

    // Open the cart menu
    await page.locator('[class="minicart-wrapper"]').click()

    const numOfProductsBefore = Number(await page.locator('#minicart-content-wrapper').locator('[title="Items in Cart"]').innerText())

    // Add product using helper function
    await pm.fromHelperBase().chooseProductWithSizeAndColor(product1.code, product1.size, product1.color)

    await pm.navigateTo().createAccountPage()

    // Generate a random user
    const user = pm.fromHelperBase().genRandomUser();

    // Attempt to create an account
    await pm.onCreateAccountPage().createAccountWithCredentials(
        (await user).firstName,
        (await user).lastName,
        (await user).email,
        (await user).password,
        (await user).password
    );

    // Verify product added by checking cart counter change
    await expect(async () => {
        await expect(await page.locator('.counter-number').textContent()).not.toEqual(counter_before);
    }).toPass();

    // Open the cart menu
    await page.locator('[class="minicart-wrapper"]').click()
    const numOfProductsAfter = Number((await page.locator('#minicart-content-wrapper').locator('[title="Items in Cart"]').innerText()))

    await expect(numOfProductsAfter).not.toEqual(numOfProductsBefore)
})

test('Items stay in cart after login with items from before', async ({ page }) => {
    const pm = new PageManager(page)  // Create a page manager for interactions
    ///////////////////////////////// Sign up, and add a product to cart
    await pm.navigateTo().signInPage()
    await pm.onSignInPage().signInWithCredentials(existingUser.email, existingUser.password) // Sign in

    // Record initial cart counter value
    var counter_before = await page.locator('.counter-number').textContent()

    // Add product
    await pm.fromHelperBase().chooseProductWithSizeAndColor(product1.code, product1.size, product1.color)
    // Verify product added by checking cart counter change
    await expect(async () => {
        // await expect(await page.locator('.counter-number').textContent()).not.toEqual(counter_before);
        await expect(await page.getByRole('link', { name: 'shopping cart' })).toBeVisible();
    }).toPass();

    // get the current number of products in cart
    await page.locator('[class="minicart-wrapper"]').click()
    const numOfProductsBefore = Number(await page.locator('#minicart-content-wrapper').locator('[title="Items in Cart"]').innerText())

    await page.getByRole('banner').locator('button').filter({ hasText: 'Change' }).click()
    await page.getByRole('link', { name: 'Sign Out' }).click() // Log out
    await page.getByLabel('store logo').click() // Go to home page

    ///////////////////////////////// Now, while logged out, user adds something in cart
    // Update cart counter value
    var counter_before = await page.locator('.counter-number').textContent()

    // Add product
    await pm.fromHelperBase().chooseProductWithSizeAndColor(product1.code, product1.size, product1.color)

    await pm.navigateTo().signInPage()
    pm.onSignInPage().signInWithCredentials(existingUser.email, existingUser.password) // Sign in

    // Verify product added by checking cart counter change
    await expect(async () => {
        await expect(await page.locator('.counter-number').textContent()).not.toEqual(counter_before);
    }).toPass();

    // Open the cart menu
    await page.locator('[class="minicart-wrapper"]').click()
    const numOfProductsAfter = Number((await page.locator('#minicart-content-wrapper').locator('[title="Items in Cart"]').innerText()))

    // while the user was logged out, he added only 1 product, so when logged back in the total
    // should be the the memorized number of products he had in his cart already before + that one product 
    // added while logged out
    await expect(numOfProductsAfter).toEqual(numOfProductsBefore + 1)
})

test.afterEach(async ({ page }) => {
    // Click 'Remove' button
    await page.getByText('Remove').click()

    // Accept action in dialog window
    await page.locator('[class="action-primary action-accept"]').click()
})