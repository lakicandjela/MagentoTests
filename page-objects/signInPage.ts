import { Page, Locator } from '@playwright/test'
import { HelperBase } from './helperBase'

export class SignInPage extends HelperBase {
    readonly loginPageTitle: Locator
    readonly loginNotSuccessfulMessage: Locator

    constructor(page: Page) {
        super(page)
        this.loginPageTitle = page.getByText('Customer Login')
        this.loginNotSuccessfulMessage = page.getByText('The account sign-in was')
    }

    /**
     * Asynchronously performs a sign-in action on the site using provided credentials.
     *
     * @param {string} email - The email address of the user.
     * @param {string} password - The user's password.
     * 
     */
    async signInWithCredentials(email: string, password: string) {
        await this.page.locator('#email').fill(email)
        await this.page.locator('#pass').fill(password)
        await this.page.locator('#send2').click()
    }

}