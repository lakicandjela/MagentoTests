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
    await pm.onSignInPage().signInWithCredentials(existingUser.email, existingUser.password)
    expect(pm.onHomepage().openUserMenu).toBeVisible() // Assert that the user is successfuly signed in
})

test('Leave a review', async({page}) => {
    // Record initial cart counter value
    const counterBefore = await pm.onHomepage().cartCounterLocator.textContent()
    
    await pm.fromHelperBase().clickOnProduct(product1.code)
    await page.getByRole('link', { name: 'Add Your Review' }).click()
    await page.locator('#Rating_5').click()
    // await page.getByLabel('Nickname').fill('dfsfds')
    // await page.getByLabel('Summary').fill('dasdsda')
    // await page.getByLabel('Review', { exact: true }).fill('duaihudi')
    // await page.getByRole('button', { name: 'Submit Review' }).click()
    // getByRole('link', { name: 'Add Your Review' })
    // getByTitle('5 stars')
    // getByLabel('Nickname')
    // getByLabel('Summary')
    // getByLabel('Review', { exact: true })
    // getByRole('button', { name: 'Submit Review' })


    // getByText('You submitted your review for')


})