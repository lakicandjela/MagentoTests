import { Page, Locator, expect } from '@playwright/test'
import { product1 } from '../helper/data';
import { PageManager } from './pageManager';


export class Homepage {
    readonly page: Page;
    readonly cartCounterLocator: Locator
    readonly minicartButton: Locator
    readonly removeFromCartButton: Locator
    readonly approveRemovalFromCartButton: Locator
    readonly cartIsEmptyText: Locator
    readonly bannerTitleWhenLoggedin: Locator
    readonly closeMinicartButton: Locator
    readonly removeFromCartPopupQuestionTitle: Locator
    readonly storeLogo: Locator
    readonly numOfProductsInMinicartText: Locator
    readonly linkToCartMessageWhenProductAdded: Locator
    readonly openUserMenuButton: Locator
    readonly signOutButton: Locator
    readonly openUserMenu: Locator
    readonly signedOutPageTitle: Locator
    readonly hotSellersTitle: Locator

    constructor(page: Page) {
        this.page = page;
        this.cartCounterLocator = page.locator('.counter-number')
        this.minicartButton = page.locator('[class="minicart-wrapper"]')
        this.removeFromCartButton = page.getByTitle('Remove item')
        this.approveRemovalFromCartButton = page.locator('[class="action-primary action-accept"]')
        this.cartIsEmptyText = page.getByText('You have no items in your')
        this.bannerTitleWhenLoggedin = page.getByRole('banner').getByText('Click “Write for us” link in')
        this.closeMinicartButton = page.locator('#btn-minicart-close')
        this.removeFromCartPopupQuestionTitle = page.getByText('Are you sure you would like')
        this.storeLogo = page.getByLabel('store logo')
        this.numOfProductsInMinicartText = page.locator('#minicart-content-wrapper').locator('[title="Items in Cart"]')
        this.linkToCartMessageWhenProductAdded = page.getByRole('link', { name: 'shopping cart' })
        this.openUserMenuButton = page.getByRole('banner').locator('button').filter({ hasText: 'Change' })
        this.signOutButton = page.getByRole('link', { name: 'Sign Out' })
        this.openUserMenu = page.getByRole('banner').locator('button').filter({ hasText: 'Change' })
        this.signedOutPageTitle = page.getByText('You are signed out')
        this.hotSellersTitle = page.getByText('Hot Sellers')
    }

    async signOut() {
        // Open the user menu
        await this.openUserMenuButton.click()
        expect(this.signOutButton).toBeVisible() // Verify sign-out option is available

        // Click the sign-out button
        await this.signOutButton.click()
        expect(this.signedOutPageTitle).toBeVisible() // Verify sign-out was successful

        // Navigate to the home page
        await this.storeLogo.click()
        expect(this.hotSellersTitle).toBeVisible() // Confirm arrival at the home page
    }

    /**
     * Adds a product to the cart and updates the counter and number of products variables.
     * @param {PageManager} pm - The PageManager instance.
     * @param {*} counterBefore - The initial value of the cart counter.
     * @param {number} numOfProductsBefore - The initial number of products in the cart.
     * @returns {Object} An object containing the updated counterBefore and numOfProductsBefore values.
     */
    async addProductAndUpdateVariables(pm, counterBefore, numOfProductsBefore) {
        // Record cart counter value
        counterBefore = await this.cartCounterLocator.textContent()

        // Open the cart menu
        await this.minicartButton.click()
        expect(this.closeMinicartButton).toBeVisible() // Verify that the cart is opened

        // Get the number of products in the minicart
        numOfProductsBefore = Number(await this.numOfProductsInMinicartText.innerText())

        // Add product
        await pm.fromHelperBase().chooseProductWithSizeAndColor(product1.code, product1.size, product1.color)

        return { counterBefore, numOfProductsBefore }
    }

    async emptyCart() {
        // Click 'Remove' button
        await this.removeFromCartButton.click()
        expect(this.removeFromCartPopupQuestionTitle).toBeVisible() // Verify that a dialog window is opened

        // Accept action in dialog window
        await this.approveRemovalFromCartButton.click()
        await expect(this.cartIsEmptyText).toBeVisible() // Verify that the action is successful
    }

    /**
     * Verifies that the cart counter has changed after an item has been added, 
     * indicating that the product was successfully placed in the cart.
     * @param initialCounter - value of counter before the refreshing the cart
     */
    async assertCartCounterUpdated(initialCounter) {
        await expect(async () => {
            expect(await this.cartCounterLocator.textContent()).not.toEqual(initialCounter)
        }).toPass()
    }

    /**
     * Opens the minicart menu and reads the number of product in cart
     * @returns number of products found in the cart
     */
    async openMinicartAndGetNumberOfItems() {
        await this.minicartButton.click()
        expect(this.closeMinicartButton).toBeVisible() // Verify that the cart is opened
        const numOfProductsAfter = Number((await this.numOfProductsInMinicartText.innerText()))

        return numOfProductsAfter
    }
}