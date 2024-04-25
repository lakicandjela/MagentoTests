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
    const counterBefore = await pm.onHomepage().cartCounterLocator.textContent()

    // Open the cart menu
    await pm.onHomepage().minicartButton.click() //////////////////////////////

    const numOfProductsBefore = Number(await pm.onHomepage().numOfProductsInMinicartText.innerText())

    // Add product
    await pm.fromHelperBase().chooseProductWithSizeAndColor(product1.code, product1.size, product1.color) //////////////

    await pm.navigateTo().signInPage()
    expect(pm.onSignInPage().loginPageTitle).toBeVisible() // Assertion that the user is redirected to log in page
    pm.onSignInPage().signInWithCredentials(existingUser.email, existingUser.password) // Sign in
    // expect(pm.onHomepage().bannerTitleWhenLoggedin).toHaveText('Click “Write for us” link in the footer to submit a guest post')
    

    // Verify product added by checking cart counter change
    await expect(async () => {
        expect(await pm.onHomepage().cartCounterLocator.textContent()).not.toEqual(counterBefore);
    }).toPass();

    // Open the cart menu
    await pm.onHomepage().minicartButton.click() ///////////////////////////////
    const numOfProductsAfter = Number((await pm.onHomepage().numOfProductsInMinicartText.innerText()))

    expect(numOfProductsAfter).not.toEqual(numOfProductsBefore)

})

test('Items stay in cart after create an account', async ({ page }) => {
    const pm = new PageManager(page)

    // Record initial cart counter value
    const counterBefore = await pm.onHomepage().cartCounterLocator.textContent()

    // Open the cart menu
    await pm.onHomepage().minicartButton.click()

    const numOfProductsBefore = Number(await pm.onHomepage().numOfProductsInMinicartText.innerText())

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
        expect(await pm.onHomepage().cartCounterLocator.textContent()).not.toEqual(counterBefore);
    }).toPass();

    // Open the cart menu
    await pm.onHomepage().minicartButton.click()
    const numOfProductsAfter = Number((await pm.onHomepage().numOfProductsInMinicartText.innerText()))

    expect(numOfProductsAfter).not.toEqual(numOfProductsBefore)
})



test.describe('Items stay in cart after login with items from before', () => {
    let numOfProductsBefore: number;

    test.beforeEach(async ({ page }) => {
        const pm = new PageManager(page)
        ///////////////////////////////// Sign up, and add a product to cart
        await pm.navigateTo().signInPage()
        await pm.onSignInPage().signInWithCredentials(existingUser.email, existingUser.password) // Sign in

        // Record initial cart counter value
        var counterBefore = await pm.onHomepage().cartCounterLocator.textContent()

        // Add product
        await pm.fromHelperBase().chooseProductWithSizeAndColor(product1.code, product1.size, product1.color)
        // Verify product added by checking cart counter change
        await expect(async () => {
            await expect(pm.onHomepage().linkToCartMessageWhenProductAdded).toBeVisible();
        }).toPass();

        // get the current number of products in cart
        await pm.onHomepage().minicartButton.click()
        numOfProductsBefore = Number(await pm.onHomepage().numOfProductsInMinicartText.innerText())

        await pm.onHomepage().openUserMenuButton.click()
        await pm.onHomepage().signOutButton.click() // Log out
        await pm.onHomepage().storeLogo.click() // Go to home page
    })


    test('Items stay in cart after login with items from before', async ({ page }) => {
        const pm = new PageManager(page)
        ///////////////////////////////// Now, while logged out, user adds something in cart
        // Update cart counter value
        var counterBefore = await pm.onHomepage().cartCounterLocator.textContent()

        // Add product
        await pm.fromHelperBase().chooseProductWithSizeAndColor(product1.code, product1.size, product1.color)

        await pm.navigateTo().signInPage()
        pm.onSignInPage().signInWithCredentials(existingUser.email, existingUser.password) // Sign in

        // Verify product added by checking cart counter change
        await expect(async () => {
            expect(await pm.onHomepage().cartCounterLocator.textContent()).not.toEqual(counterBefore);
        }).toPass();

        // Open the cart menu
        await pm.onHomepage().minicartButton.click()
        const numOfProductsAfter = Number((await pm.onHomepage().numOfProductsInMinicartText.innerText()))

        // while the user was logged out, he added only 1 product, so when logged back in the total
        // should be the the memorized number of products he had in his cart already before + that one product 
        // added while logged out
        expect(numOfProductsAfter).toEqual(numOfProductsBefore + 1)
    })
})

test.afterEach(async ({ page }) => {
    const pm = new PageManager(page)
    // Click 'Remove' button
    await pm.onHomepage().removeFromCartButton.click()

    // Accept action in dialog window
    await pm.onHomepage().approveRemovalFromCartButton.click()
})