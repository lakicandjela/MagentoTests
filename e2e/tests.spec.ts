import {test, expect} from "@playwright/test"
import { PageManager } from "../page-objects/pageManager"
import {faker} from '@faker-js/faker'
import { exsistingUser, product1 } from "../helper/data"


test.beforeEach( async ({page}) => {
	await page.goto('/')
})


test('Error message is there while registering with existing email', async({page}) => {
    // Setup:
    const pm = new PageManager(page); // Create a PageManager for page interactions
    await pm.navigateTo().createAccountPage(); // Go to the account creation page

    // Generate a random user (note: this assumes the helper function does NOT use the existing user's email)
    const user = pm.fromHelperBase().genRandomUser(); 

    // Attempt to create an account using the existing user's email but random other details
    await pm.onCreateAccountPage().createAccountWithCredentials(
        (await user).firstName, 
        (await user).lastName, 
        exsistingUser.email, // Deliberately using the existing email
        (await user).password, 
        (await user).password 
    );

    // Assert that the expected error message is displayed 
    await expect(page.getByText('There is already')).toBeVisible();
});


test.describe('Go to log in page first', () => {
    test.beforeEach( async ({page}) => {
        // Setup:
        const pm = new PageManager(page)  // Create a page manager for interactions
        await pm.navigateTo().signInPage() // Navigate to sign-in
    })

    test('Removing item completely from the cart in the cart menu', async({page}) => {
        const pm = new PageManager(page)  // Create a page manager for interactions
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

    test('Error message while log in with incorrect credentials', async({page}) => {
        const pm = new PageManager(page)  // Create a page manager for interactions
        // Generate a random user (note: this assumes the helper function does NOT use the existing user's email)
        const user = pm.fromHelperBase().genRandomUser(); // Navigate to sign-in

        await pm.onSignInPage().signInWithCredentials((await user).email, (await user).password) // Sign in

        // Assert that the expected error message is displayed 
        await expect(page.getByText('The account sign-in was')).toBeVisible();      
    })

})


