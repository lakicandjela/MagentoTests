import { test, expect } from "@playwright/test"
import { PageManager } from "../page-objects/pageManager"
import { product1 } from "../helper/data"

let pm: PageManager

test.describe('Do items added while logged out stay in cart after login or create account', () => {
    let numOfProductsBefore: number;
    let counterBefore: any;
    test.beforeEach(async ({ page }) => {
        pm = new PageManager(page)
        await page.goto('/')
        await expect(pm.onHomePage().storeLogo).toBeVisible() // Assert that the site is opened

        // Call function to add product and capture returned values
        const {
            counterBefore: updatedCounterBefore,
            numOfProductsBefore: updatedNumOfProductsBefore
        } = await pm.onHomePage()
            .addProductAndUpdateVariables(pm, counterBefore, numOfProductsBefore)

        // Update the variables with the returned values
        counterBefore = updatedCounterBefore;
        numOfProductsBefore = updatedNumOfProductsBefore;
    })

    test('Do items added while loged out stay in cart after login', async ({ page }) => {
        pm.onSignInPage().goToLoginPageAndLoginWithExistingUser(pm) // Sign in

        // Verify product added
        await pm.onHomePage().assertCartCounterUpdated(counterBefore)

        // Open the cart menu and get number of products
        const numOfProductsAfter = pm.onHomePage().openMinicartAndGetNumberOfItems()

        expect(numOfProductsAfter).not.toEqual(numOfProductsBefore)

    })

    test('Do items added while logged out stay in cart after create an account', async ({ page }) => {
        pm.onCreateAccountPage().goToCreateaccountAndSignUpWithRandomUser(pm) // Create a new account

        // Verify product added
        await pm.onHomePage().assertCartCounterUpdated(counterBefore)

        // Open the cart menu and get number of products
        const numOfProductsAfter = pm.onHomePage().openMinicartAndGetNumberOfItems()

        expect(numOfProductsAfter).not.toEqual(numOfProductsBefore)
    })
})

test.describe('Do items added while logged out stay in cart after login with items added before while logged in', () => {
    let numOfProductsBefore: number;

    test.beforeEach(async ({ page }) => {
        pm = new PageManager(page)
        await page.goto('/')
        await expect(pm.onHomePage().storeLogo).toBeVisible() // Assert that the site is opened
        /*
            Sign up, and add a product to cart
        */
        // Sign in with valid credentials
        await pm.onSignInPage().goToLoginPageAndLoginWithExistingUser(pm)

        // Get cart counter number, for later assertion
        let counterBefore = await pm.onHomePage().cartCounterLocator.textContent()

        // Add product
        await pm.fromHelperBase().chooseProductWithSizeAndColor(product1.code, product1.size, product1.color)

        // Verify product added
        await pm.onHomePage().assertCartCounterUpdated(counterBefore)

        // Open the cart menu and get number of products
        numOfProductsBefore = Number(await pm.onHomePage().openMinicartAndGetNumberOfItems())

        // Sign out
        await pm.onHomePage().signOut()
    })


    test('Do items added while logged out stay in cart after login with items added before while logged in', async ({ page }) => {
        /*
            Now, while logged out, user adds something in cart, and log back in afterwards
        */
        // Get cart counter value
        var counterBefore = await pm.onHomePage().cartCounterLocator.textContent()

        // Add product
        await pm.fromHelperBase().chooseProductWithSizeAndColor(product1.code, product1.size, product1.color)

        // Sign in
        pm.onSignInPage().goToLoginPageAndLoginWithExistingUser(pm)

        // Assert that the cart is updated and the product is added
        await pm.onHomePage().assertCartCounterUpdated(counterBefore)

        // Open the cart menu and get number of products
        const numOfProductsAfter = await pm.onHomePage().openMinicartAndGetNumberOfItems()

        /*
            While the user was logged out, he added only 1 product, so when logged back in the total
            should be the the memorized number of products he had in his cart already before + that one product 
            added while logged out
        */
        expect(numOfProductsAfter).toEqual(numOfProductsBefore + 1)
    })
})

test.afterEach(async ({ page }) => {
    await pm.onHomePage().emptyCart()
})