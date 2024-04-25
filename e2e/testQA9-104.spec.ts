import { test, expect } from "@playwright/test"
import { PageManager } from "../page-objects/pageManager"
import { existingUser, product1 } from "../helper/data"

let pm: PageManager

test.beforeEach(async ({ page }) => {
    pm = new PageManager(page)   // Create a page manager for interactions
    await page.goto('/')
    await expect(pm.onHomepage().storeLogo).toBeVisible() // Assert that the site is opened

    // Sign in
    await pm.navigateTo().signInPage()
    expect(pm.onSignInPage().loginPageTitle).toBeVisible() // Assertion that the user is redirected to log in page
    pm.onSignInPage().signInWithCredentials(existingUser.email, existingUser.password)
    expect(pm.onHomepage().openUserMenu).toBeVisible() // Assert that the user is successfuly signed in
})

test('Leave a review', async({page}) => {
    // Record initial cart counter value
    const counterBefore = await pm.onHomepage().cartCounterLocator.textContent()
    
    pm.fromHelperBase().clickOnProduct(product1.code)
    


})