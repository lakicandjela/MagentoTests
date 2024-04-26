import { Page } from '@playwright/test'
import { NavigationPage } from './navigationPage'
import { SignInPage } from './signInPage'
import { CreateAccountPage } from './createAccountPage'
import { CheckoutPage } from './checkoutPage'
import { HelperBase } from './helperBase'
import { Homepage } from './homepage'
import { AdvancedSearchPage } from './advancedSearchPage'

export class PageManager {
    /**
     *
     * Description. Class for navigation to other page classes on the site
     *
     */

    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly signInPage: SignInPage
    private readonly createAccountPage: CreateAccountPage
    private readonly checkoutPage: CheckoutPage
    private readonly helperBase: HelperBase
    private readonly homepage: Homepage
    private readonly advancedSearchPage: AdvancedSearchPage

    constructor(page: Page) {
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.signInPage = new SignInPage(this.page)
        this.createAccountPage = new CreateAccountPage(this.page)
        this.checkoutPage = new CheckoutPage(this.page)
        this.helperBase = new HelperBase(this.page)
        this.homepage = new Homepage(this.page)
        this.advancedSearchPage = new AdvancedSearchPage(page)
    }

    navigateTo() {
        return this.navigationPage
    }

    onSignInPage() {
        return this.signInPage
    }

    onCreateAccountPage() {
        return this.createAccountPage
    }

    onCheckoutPage() {
        return this.checkoutPage
    }

    fromHelperBase() {
        return this.helperBase
    }

    onHomepage() {
        return this.homepage
    }

    onAdvancedSearchPage() {
        return this.advancedSearchPage
    }
}