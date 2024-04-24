import {Page, Locator} from '@playwright/test'


export class Homepage {
    readonly page: Page;
    readonly cartCounterLocator: Locator
    readonly minicartButton: Locator
    readonly removeFromCartButton: Locator
    readonly approveRemovalFromCartButton: Locator
    readonly cartIsEmptyText: Locator

    constructor(page: Page) {
        this.page = page;   
        this.cartCounterLocator = page.locator('.counter-number')
        this.minicartButton = page.locator('[class="minicart-wrapper"]')
        this.removeFromCartButton = page.getByText('Remove')
        this.approveRemovalFromCartButton = page.locator('[class="action-primary action-accept"]')
        this.cartIsEmptyText = page.getByText('You have no items in your')
    }
}