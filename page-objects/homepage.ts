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
    readonly openUserMenu: Locator
    readonly successfulReviewMessage: Locator


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
        this.openUserMenu = page.getByRole('banner').locator('button').filter({ hasText: 'Change' })
        this.successfulReviewMessage = page.getByRole('alert').getByText('You submitted your review for')
    }
}