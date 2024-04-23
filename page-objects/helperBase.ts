import { Page } from '@playwright/test'
import {faker} from '@faker-js/faker'


export class HelperBase{
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async waitForNumberOfSeconds(timeInSeconds: number){
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
    async chooseProductWithSizeAndColor(productCode: string, size: string,  color: string){
        await this.page.locator('li').filter({ hasText: productCode }).getByLabel(size, {exact: true}).click()
        await this.page.locator('li').filter({ hasText: productCode }).getByLabel(color).click()
        await this.page.locator('li').filter({ hasText: productCode }).getByText('Add to Cart').click()
    }

    /**
     * Generates a random password of a specified length (default 12 characters).
     * 
     * @returns {string} The generated random password.
     */
    private genPassword() {
        var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var passwordLength = 12;
        var password = "";
        for (var i = 0; i <= passwordLength; i++) {
            var randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber +1);
        }
        return password
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
    async genRandomUser(){
        var firstName = faker.person.firstName()
        var lastName = faker.person.lastName()
        var email = `${firstName.toLowerCase()}${lastName.toLowerCase()}${faker.number.int(1000)}@test.com`
        var password = this.genPassword()
    
        return {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
    }

    async randomProperty(obj) {
        var keys = Object.keys(obj);
        return obj[keys[ keys.length * Math.random() << 0]];
    };

}