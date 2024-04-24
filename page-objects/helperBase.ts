import { Page, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'


export class HelperBase {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async waitForNumberOfSeconds(timeInSeconds: number) {
        await this.page.waitForTimeout(timeInSeconds * 1000)
    }

    /**
     * Asynchronously selects a product on the page, specifying its code, size, and color. 
     * Adds the configured product to the cart.
     *
     * @param {string} productCode - The code or identifier of the product.
     * @param {string} size - The desired size label of the product.
     * @param {string} color - The desired color label of the product.
     *  
     */
    async chooseProductWithSizeAndColor(productCode: string, size: string, color: string) {
        await this.page.locator('li').filter({ hasText: productCode }).getByLabel(size).click()
        await expect(this.page.locator('li').filter({ hasText: productCode }).getByLabel(size).getAttribute('aria-checked')).toBeTruthy()
        await this.page.locator('li').filter({ hasText: productCode }).getByLabel(color).click()
        await expect(this.page.locator('li').filter({ hasText: productCode }).getByLabel(color).getAttribute('aria-checked')).toBeTruthy()
        await this.page.locator('li').filter({ hasText: productCode }).getByText('Add to Cart').click()
    }

    /**
     * Asynchronously generates a randomized user object with first name, last name, email, and password.
     * 
     * @returns {Object} An object containing the following properties:
     *   * firstName: {string} A randomized first name.
     *   * lastName: {string} A randomized last name.
     *   * email: {string} A formatted email (e.g., firstnamelastname###@test.com).
     *   * password: {string} A generated password.
     */
    async genRandomUser() {
        var firstName = faker.person.firstName()
        var lastName = faker.person.lastName()
        var email = `${firstName.toLowerCase()}${lastName.toLowerCase()}${faker.number.int(1000)}@test.com`
        var password = faker.internet.password()

        return {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
    }

}