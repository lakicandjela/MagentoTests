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

        // Call function and capture returned values
        const { 
            counterBefore: updatedCounterBefore, 
            numOfProductsBefore: updatedNumOfProductsBefore 
        } = await pm.onHomepage()
            .AddProductAndUpdateVariables(pm, counterBefore, numOfProductsBefore)
             
        // Update the variables with the returned values
        counterBefore = updatedCounterBefore;
        numOfProductsBefore = updatedNumOfProductsBefore;
    })

    test('Items stay in cart after login', async ({ page }) => {
        pm.onSignInPage().goToLoginPageAndLoginWithExistingUser(pm) // Sign in

        await pm.onHomepage().assertCartCounterUpdated(counterBefore)

        // Open the cart menu
        await pm.onHomepage().minicartButton.click()
        expect(pm.onHomepage().closeMinicartButton).toBeVisible()
        const numOfProductsAfter = Number((await pm.onHomepage().numOfProductsInMinicartText.innerText()))

        expect(numOfProductsAfter).not.toEqual(numOfProductsBefore)

    })

    test('Items stay in cart after create an account', async ({ page }) => {
        pm.onCreateAccountPage().goToCreateaccountAndSignUpWithRandomUser(pm) // Create a new account

        await pm.onHomepage().assertCartCounterUpdated(counterBefore)

        // Open the cart menu
        await pm.onHomepage().minicartButton.click()
        expect(pm.onHomepage().closeMinicartButton).toBeVisible()
        const numOfProductsAfter = Number((await pm.onHomepage().numOfProductsInMinicartText.innerText()))

        expect(numOfProductsAfter).not.toEqual(numOfProductsBefore)
    })
})

test.describe('Items stay in cart after login with items from before', () => {
    let numOfProductsBefore: number;

    test.beforeEach(async ({ page }) => {
        pm = new PageManager(page)
        await page.goto('/')
        await expect(pm.onHomepage().storeLogo).toBeVisible() // Assert that the site is opened
        
        ///////////////////////////////// Sign up, and add a product to cart
        pm.onSignInPage().goToLoginPageAndLoginWithExistingUser(pm) // Sign in

        // Add product
        await pm.fromHelperBase().chooseProductWithSizeAndColor(product1.code, product1.size, product1.color)

        // Verify product added by checking cart counter change
        await expect(async () => {
            await expect(pm.onHomepage().linkToCartMessageWhenProductAdded).toBeVisible();
        }).toPass();

        // get the current number of products in cart
        await pm.onHomepage().minicartButton.click()
        expect(pm.onHomepage().closeMinicartButton).toBeVisible()
        numOfProductsBefore = Number(await pm.onHomepage().numOfProductsInMinicartText.innerText())

        // Sign out
        pm.onHomepage().signOut()
    })


    test('Items stay in cart after login with items from before', async ({ page }) => {
        ///////////////////////////////// Now, while logged out, user adds something in cart
        // Get cart counter value
        var counterBefore = await pm.onHomepage().cartCounterLocator.textContent()

        // Add product
        await pm.fromHelperBase().chooseProductWithSizeAndColor(product1.code, product1.size, product1.color)

        // Sign in
        pm.onSignInPage().goToLoginPageAndLoginWithExistingUser(pm)

        await pm.onHomepage().assertCartCounterUpdated(counterBefore)

        // Open the cart menu
        await pm.onHomepage().minicartButton.click()
        expect(pm.onHomepage().closeMinicartButton).toBeVisible()
        const numOfProductsAfter = Number((await pm.onHomepage().numOfProductsInMinicartText.innerText()))

        // while the user was logged out, he added only 1 product, so when logged back in the total
        // should be the the memorized number of products he had in his cart already before + that one product 
        // added while logged out
        expect(numOfProductsAfter).toEqual(numOfProductsBefore + 1)
    })
})

test.afterEach(async ({ page }) => {
    await pm.onHomepage().emptyCart()
})