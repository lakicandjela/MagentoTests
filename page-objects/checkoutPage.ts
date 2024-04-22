import {Locator, Page} from '@playwright/test'
import { HelperBase } from './helperBase'
import { ShippingRate } from '../e2e/enums'

export class CheckoutPage extends HelperBase{

    constructor(page: Page){
        super(page)
    }

    async checkoutWhileNotSignedIn(email: string, firstName: string, lastName: string, company: string, streetAddress1: string, streetAddress2: string,
        streetAddress3: string, city: string, zip: string, country: string, phoneNumber: string, stateProvince: string, shippingRate: ShippingRate
    ){
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
        if(classAtr=='field _required'){
            await this.page.locator('select[name="region_id"]').selectOption(stateProvince)
        } else if(classAtr=='field'){
            await this.page.getByRole('textbox', {name: 'State/Province'}).fill(stateProvince)
        }

        if (shippingRate as string === ShippingRate.FIXED) {
            await this.page.getByLabel('Fixed').check();
        } else if (shippingRate as string === ShippingRate.TABLE_RATE) {
            await this.page.getByLabel('Table Rate').check();
        }
    }

}