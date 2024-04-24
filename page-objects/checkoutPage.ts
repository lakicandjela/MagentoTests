import { Page } from '@playwright/test'
import { HelperBase } from './helperBase'
import { ShippingRate } from '../helper/enums'

export class CheckoutPage extends HelperBase {

    constructor(page: Page) {
        super(page)
    }

    /**
     * Asynchronously completes the checkout process as a guest user (not signed in). Handles entering 
     * shipping details and selecting a shipping rate.
     *
     * @param {string} email - The email address for the order.
     * @param {string} firstName - The billing address first name.
     * @param {string} lastName - The billing address last name.
     * @param {string} company - The billing address company name (optional).
     * @param {string} streetAddress1 - Street Address Line 1.
     * @param {string} streetAddress2 - Street Address Line 2 (optional).
     * @param {string} streetAddress3 - Street Address Line 3 (optional).
     * @param {string} city - The billing address city.
     * @param {string} zip - The billing address zip/postal code.
     * @param {string} country - The billing address country.
     * @param {string} phoneNumber - The billing address phone number.
     * @param {string} stateProvince - The billing address state/province.
     * @param {ShippingRate} shippingRate - An enum value specifying the shipping rate type (e.g., Fixed, Table Rate).
     */
    async checkoutWhileNotSignedIn(email: string, firstName: string, lastName: string, company: string, streetAddress1: string, streetAddress2: string,
        streetAddress3: string, city: string, zip: string, country: string, phoneNumber: string, stateProvince: string, shippingRate: ShippingRate
    ) {
        await this.page.waitForTimeout(2000)
        await this.page.locator('#checkout-step-shipping').locator('#customer-email-fieldset').getByRole('textbox').fill(email)
        await this.page.locator('#shipping-new-address-form').getByLabel('First Name').fill(firstName)
        await this.page.locator('#shipping-new-address-form').getByLabel('Last Name').fill(lastName)
        await this.page.locator('#shipping-new-address-form').getByLabel('Company').fill(company)
        await this.page.locator('#shipping-new-address-form').getByLabel('Street Address: Line 1').fill(streetAddress1)
        await this.page.locator('#shipping-new-address-form').getByLabel('Street Address: Line 2').fill(streetAddress2)
        await this.page.locator('#shipping-new-address-form').getByLabel('Street Address: Line 3').fill(streetAddress3)
        await this.page.locator('#shipping-new-address-form').getByLabel('City').fill(city)
        await this.page.locator('#shipping-new-address-form').getByLabel('Zip/Postal Code').fill(zip)
        await this.page.locator('#shipping-new-address-form').getByLabel('Country').selectOption(country)
        await this.page.locator('#shipping-new-address-form').getByLabel('Phone Number').fill(phoneNumber)

        const classAtr = await this.page.getByText('State/Province Please Select').getAttribute("class")
        if (classAtr == 'field _required') {
            // State/Province is a required dropdown
            await this.page.locator('select[name="region_id"]').selectOption(stateProvince)
        } else if (classAtr == 'field') {
            // State/Province is a free-form text field
            await this.page.getByRole('textbox', { name: 'State/Province' }).fill(stateProvince)
        }

        // Select Shipping Rate
        if (shippingRate as string === ShippingRate.FIXED) {
            await this.page.getByLabel('Fixed').check();
        } else if (shippingRate as string === ShippingRate.TABLE_RATE) {
            await this.page.getByLabel('Table Rate').check();
        }
    }

}