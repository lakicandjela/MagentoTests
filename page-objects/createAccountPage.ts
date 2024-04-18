import {Locator, Page} from '@playwright/test'
import { HelperBase } from './helperBase'

export class CreateAccountPage extends HelperBase{

    constructor(page: Page){
        super(page)
    }

    async createAccountWithCredentials(firstName: string, lastName: string, email: string, password: string, conf_password:string){
        await this.page.locator('#firstname').fill(firstName)
	    await this.page.locator('#lastname').fill(lastName)
        await this.page.locator('#email_address').fill(email)
	    await this.page.locator('#password').fill(password)
        await this.page.locator('#password-confirmation').fill(conf_password)
	    await this.page.getByRole('button', {name: 'Create an Account'}).click()
    }

}