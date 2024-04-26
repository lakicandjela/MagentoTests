import { test, expect, Page } from "@playwright/test"
import { PageManager } from "../page-objects/pageManager"
import { product1 } from "../helper/data"

let pm: PageManager

test.describe('Items stay in cart after login or create account', () => {
    let numOfProductsBefore: number;
    let counterBefore: any;
    test.beforeEach(async ({ page }) => {
        pm = new PageManager(page)
        await page.goto('/')
        await expect(pm.onHomepage().storeLogo).toBeVisible() // Assert that the site is opened

        // Call function to add product and capture returned values
        const {
            counterBefore: updatedCounterBefore,
            numOfProductsBefore: updatedNumOfProductsBefore
        } = await pm.onHomepage()
            .addProductAndUpdateVariables(pm, counterBefore, numOfProductsBefore)

        // Update the variables with the returned values
        counterBefore = updatedCounterBefore;
        numOfProductsBefore = updatedNumOfProductsBefore;
    })

    test('Items stay in cart after login', async ({ page }) => {
        pm.onSignInPage().goToLoginPageAndLoginWithExistingUser(pm) // Sign in

        // Verify product added
        await pm.onHomepage().assertCartCounterUpdated(counterBefore)

        // Open the cart menu and get number of products
        const numOfProductsAfter = pm.onHomepage().openMinicartAndGetNumberOfItems()

        expect(numOfProductsAfter).not.toEqual(numOfProductsBefore)

    })

    test('Items stay in cart after create an account', async ({ page }) => {
        pm.onCreateAccountPage().goToCreateaccountAndSignUpWithRandomUser(pm) // Create a new account

        // Verify product added
        await pm.onHomepage().assertCartCounterUpdated(counterBefore)

        // Open the cart menu and get number of products
        const numOfProductsAfter = pm.onHomepage().openMinicartAndGetNumberOfItems()

        expect(numOfProductsAfter).not.toEqual(numOfProductsBefore)
    })
})

test.describe('Items stay in cart after login with items from before', () => {
    let numOfProductsBefore: number;

    test.beforeEach(async ({ page }) => {
        pm = new PageManager(page)
        await page.goto('/')
        await expect(pm.onHomepage().storeLogo).toBeVisible() // Assert that the site is opened
        /*
            Sign up, and add a product to cart
        */
        // Sign in with valid credentials
        await pm.onSignInPage().goToLoginPageAndLoginWithExistingUser(pm)

        // Get cart counter number, for later assertion
        let counterBefore = await pm.onHomepage().cartCounterLocator.textContent()

        // Add product
        await pm.fromHelperBase().chooseProductWithSizeAndColor(product1.code, product1.size, product1.color)

        // Verify product added
        await pm.onHomepage().assertCartCounterUpdated(counterBefore)

        // Open the cart menu and get number of products
        numOfProductsBefore = Number(await pm.onHomepage().openMinicartAndGetNumberOfItems())

        // Sign out
        await pm.onHomepage().signOut()
    })


    test('Items stay in cart after login with items from before', async ({ page }) => {
        /*
            Now, while logged out, user adds something in cart, and log back in afterwards
        */
        // Get cart counter value
        var counterBefore = await pm.onHomepage().cartCounterLocator.textContent()

        // Add product
        await pm.fromHelperBase().chooseProductWithSizeAndColor(product1.code, product1.size, product1.color)

        // Sign in
        pm.onSignInPage().goToLoginPageAndLoginWithExistingUser(pm)

        // Assert that the cart is updated and the product is added
        await pm.onHomepage().assertCartCounterUpdated(counterBefore)

        // Open the cart menu and get number of products
        const numOfProductsAfter = await pm.onHomepage().openMinicartAndGetNumberOfItems()

        /*
            While the user was logged out, he added only 1 product, so when logged back in the total
            should be the the memorized number of products he had in his cart already before + that one product 
            added while logged out
        */
        expect(numOfProductsAfter).toEqual(numOfProductsBefore + 1)
    })
})

test.afterEach(async ({ page }) => {
    await pm.onHomepage().emptyCart()
})