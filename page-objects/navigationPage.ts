import { Page } from '@playwright/test'
import { navigationMap } from '../helper/data';


export class NavigationPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async productsPage(pageName: string) {
        const menuItemId = navigationMap[pageName]; // Assume 'navigationMap' is an object mapping pages to menu item IDs
        const leng = menuItemId.length

        if (menuItemId.length === 1) {
            // Single-level menu: Click directly
            await this.page.locator(`#ui-id-${menuItemId[0]}`).click();
        } else if (menuItemId.length === 2) {
            // Two-level menu: Hover on the first level, click the second
            await this.page.locator(`#ui-id-${menuItemId[0]}`).hover();
            await this.page.locator(`#ui-id-${menuItemId[1]}`).click();
        } else {
            // Three-Level menu: Hover, hover, click
            await this.page.locator(`#ui-id-${menuItemId[0]}`).hover();
            await this.page.locator(`#ui-id-${menuItemId[1]}`).hover();
            await this.page.locator(`#ui-id-${menuItemId[2]}`).click();
        }
    }

    async signInPage() {
        await this.page.getByRole('link', { name: 'Sign In' }).click()
    }

    async createAccountPage() {
        await this.page.getByRole('banner').getByRole('link', { name: 'Create an Account' }).click()
    }

    async proceedToCheckoutPage() {
        await this.page.locator('[class="minicart-wrapper"]').click()
        await this.page.getByText('Proceed To Checkout').click()
    }

    async viewAndEditCartPage() {
        await this.page.locator('[class="minicart-wrapper"]').click()
        await this.page.getByText('View and Edit Cart').click() //cart
    }


}
