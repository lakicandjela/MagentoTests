import { Page, Locator, expect } from '@playwright/test'
import { product1 } from '../helper/data';


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

    async signOut(pm) {
        await pm.onHomepage().openUserMenuButton.click()
        expect(pm.onHomepage().signOutButton).toBeVisible()
        await pm.onHomepage().signOutButton.click() // Log out
        expect(pm.onHomepage().signedOutPageTitle).toBeVisible()
        await pm.onHomepage().storeLogo.click() // Go to home page
        expect(pm.onHomepage().hotSellersTitle).toBeVisible()
    }

    async goToSiteAndAddProduct(pm, counterBefore, numOfProductsBefore) {
        await expect(pm.onHomepage().storeLogo).toBeVisible() // Assert that the site is opened

        // Record initial cart counter value
        counterBefore = await pm.onHomepage().cartCounterLocator.textContent()

        // Open the cart menu
        await pm.onHomepage().minicartButton.click()
        expect(pm.onHomepage().closeMinicartButton).toBeVisible()

        numOfProductsBefore = Number(await pm.onHomepage().numOfProductsInMinicartText.innerText())

        // Add product
        await pm.fromHelperBase().chooseProductWithSizeAndColor(product1.code, product1.size, product1.color)

        return {counterBefore, numOfProductsBefore}
    }
}