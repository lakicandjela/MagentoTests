import {Locator, Page} from '@playwright/test'
import { HelperBase } from './helperBase'

export class SignInPage extends HelperBase{

    constructor(page: Page){
        super(page)
    }

    async signInWithCredentials(email: string, password: string){
        await this.page.locator('#email').fill(email)
	    await this.page.locator('#pass').fill(password)
	    await this.page.locator('#send2').click()
    }

}