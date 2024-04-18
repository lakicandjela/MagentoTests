import { Locator, Page } from '@playwright/test'
import { NavigationPage } from './navigationPage'
import { SignInPage } from './signInPage'
import { CreateAccountPage } from './createAccountPage'

export class PageManager{

    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly signInPage: SignInPage
    private readonly createAccountPage: CreateAccountPage

    constructor(page: Page){
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.signInPage = new SignInPage(this.page)
        this.createAccountPage = new CreateAccountPage(this.page)
    }

    navigateTo(){
        return this.navigationPage
    }

    onSignInPage(){
        return this.signInPage
    }

    onCreateAccountPage(){
        return this.createAccountPage
    }
}