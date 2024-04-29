import { Page, Locator, expect } from '@playwright/test'
import { HelperBase } from './helperBase'

export class CreateAccountPage extends HelperBase {
    readonly createAccountPageTitle: Locator
    readonly errorMessageExistingMail: Locator

    constructor(page: Page) {
        super(page)
        this.createAccountPageTitle = page.getByText('Create New Customer Account')
        this.errorMessageExistingMail = page.getByText('There is already')
    }

    /**
     * Asynchronously creates a new user account on the registration page.
     * 
     * @param {string} firstName - The first name of the user.
     * @param {string} lastName - The last name of the user. 
     * @param {string} email - The email address for the new account.
     * @param {string} password - The desired account password.
     * @param {string} conf_password - The password confirmation (must match password).
     * 
     */
    async createAccountWithCredentials(firstName: string, lastName: string, email: string, password: string, conf_password: string) {
        await this.page.locator('#firstname').fill(firstName)
        await this.page.locator('#lastname').fill(lastName)
        await this.page.locator('#email_address').fill(email)
        await this.page.locator('#password').fill(password)
        await this.page.locator('#password-confirmation').fill(conf_password)
        await this.page.getByRole('button', { name: 'Create an Account' }).click()
    }

    async goToCreateaccountAndSignUpWithRandomUser(pm) {
        await pm.navigateTo().createAccountPage()
        expect(pm.onCreateAccountPage().createAccountPageTitle).toBeVisible()

        // Generate a random user
        const user = pm.fromHelperBase().genRandomUser();

        // Attempt to create an account
        await pm.onCreateAccountPage().createAccountWithCredentials(
            (await user).firstName,
            (await user).lastName,
            (await user).email,
            (await user).password,
            (await user).password
        );
        expect(pm.onHomePage().openUserMenu).toBeVisible() // Assert that the user has created an account
    }

}