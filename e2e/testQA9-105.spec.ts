import {test, expect} from "@playwright/test"
import { PageManager } from "../page-objects/pageManager"
import {faker} from '@faker-js/faker'
import { exsistingUser, product1, hotSellerProducts } from "../helper/data"


test.beforeEach( async ({page}) => {
	await page.goto('/')
})

test('Items stay in cart after login', async({page}) => {
    const pm = new PageManager(page) 

    // Record initial cart counter value
    const counter_before = await page.locator('.counter-number').textContent()

    // Open the cart menu
    await page.locator('[class="minicart-wrapper"]').click()
    
    const numOfProductsBefore = Number(await page.locator('#minicart-content-wrapper').locator('[title="Items in Cart"]').innerText())
 
    // Add product using helper function
    await pm.fromHelperBase().chooseProductWithSizeAndColor(product1.code, product1.size, product1.color)

    await pm.navigateTo().signInPage()
    pm.onSignInPage().signInWithCredentials(exsistingUser.email, exsistingUser.password) // Sign in

    // Verify product added by checking cart counter change
    await expect(async () => {
        await expect(await page.locator('.counter-number').textContent()).not.toEqual(counter_before);
    }).toPass();

    // Open the cart menu
    await page.locator('[class="minicart-wrapper"]').click()
    const numOfProductsAfter = Number((await page.locator('#minicart-content-wrapper').locator('[title="Items in Cart"]').innerText()))

    await expect(numOfProductsAfter).not.toEqual(numOfProductsBefore)

})

test('Items stay in cart after create an account', async({page}) => {
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

    // Attempt to create an account using the existing user's email but random other details
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

test('Items stay in cart after login with items from before', async({page}) => {
    const pm = new PageManager(page)  // Create a page manager for interactions
    await pm.navigateTo().signInPage()
    await pm.onSignInPage().signInWithCredentials(exsistingUser.email, exsistingUser.password) // Sign in

    // Record initial cart counter value
    const counter_before = await page.locator('.counter-number').textContent()

    // Open the cart menu
    await page.locator('[class="minicart-wrapper"]').click()
    
    const numOfProductsBefore = Number(await page.locator('#minicart-content-wrapper').locator('[title="Items in Cart"]').innerText())
 
    // Add product using helper function
    await pm.fromHelperBase().chooseProductWithSizeAndColor(product1.code, product1.size, product1.color)
    // Verify product added by checking cart counter change
    await expect(async () => {
        await expect(await page.locator('.counter-number').textContent()).not.toEqual(counter_before);
    }).toPass();

    await page.getByRole('banner').locator('button').filter({ hasText: 'Change' }).click()
    await page.getByRole('link', {name: 'Sign Out'}).click()
    await page.getByLabel('store logo').click()




})

// test.afterEach( async({page}) => {
//     // Click 'Remove' button
//     await page.getByText('Remove').click()

//     // Accept action in dialog window
//     await page.locator('[class="action-primary action-accept"]').click()
// })