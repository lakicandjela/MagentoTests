import { Page, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'


export class HelperBase {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
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
        expect(this.page.locator('li').filter({ hasText: productCode }).getByLabel(size).getAttribute('aria-checked')).toBeTruthy()
        await this.page.locator('li').filter({ hasText: productCode }).getByLabel(color).click()
        expect(this.page.locator('li').filter({ hasText: productCode }).getByLabel(color).getAttribute('aria-checked')).toBeTruthy()
        await this.page.locator('li').filter({ hasText: productCode }).getByText('Add to Cart').click()
    }

    async clickOnProduct(productCode: string) {
        await this.page.locator('li').filter({ hasText: productCode }).click()
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

    /*
    * Purpose: Asynchronously fills out and submits a product review form.
    * 
    * Parameters:
    *   userReview (object): An object containing the review details:
    *     * rating (number): The user's star rating for the product.
    *     * nickname (string): The user's chosen nickname.  
    *     * summary (string): A brief summary of the review.
    *     * review (string): The full text of the review.
    */
    async fillReview(userReview) {
        await this.page.getByRole('link', { name: 'Add Your Review' }).click()
        await this.page.locator('[class="control review-control-vote"]').locator(`#Rating_${userReview.rating}`).click({ force: true })
        await this.page.getByLabel('Nickname').fill(userReview.nickname)
        await this.page.getByLabel('Summary').fill(userReview.summary)
        await this.page.getByLabel('Review', { exact: true }).fill(userReview.review)
        await this.page.getByLabel('Reviews').locator('button').click()
    }

}