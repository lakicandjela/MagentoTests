import { Page, Locator } from '@playwright/test'


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
}