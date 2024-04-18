import {Locator, Page} from '@playwright/test'
import { HelperBase } from './helperBase'


export class NavigationPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;    
    }

    // Structure your navigation map
    readonly navigationMap = {
        whatsNew: 3,
        women: 4, 
        men: 5, 
        gear: 6,
        training: 7,
        sale: 8,
        womenTops: 9,
        womenBottoms: 10,
        menTops: 17,
        menBottoms: 18,
        gearBags: 25,
        gearFitnessEquipment: 26,
        gearWatches: 27,
        trainingVideo: 28,
        womenTopsJackets: 11,
        womenTopsHoodiesSweatshirts: 12,
        womenTopsTees: 13,
        womenTopsBrasTanks: 14,
        womenBottomsPants: 15,
        womenBottomsShorts: 16,
        menTopsJackets: 19,
        menTopsHoodiesSweatshirts: 20,
        menTopsTees: 21,
        menTopsBrasTanks: 22,
        menBottomsPants: 23,
        menBottomsShorts: 24,
        }


    async productsPage(pageName: string) {
        const menuItemId = this.navigationMap[pageName];
        await this.page.locator(`#ui-id-${menuItemId}`).click();
    }

    async signInPage(){
        await this.page.getByRole('link', { name: 'Sign In' }).click()
    }

    async createAccountPage(){
        await this.page.getByRole('banner').getByRole('link', { name: 'Create an Account' }).click()
    }

    async proceedToCheckoutPage(){
        await this.page.locator('[class="minicart-wrapper"]').click()
	    await this.page.getByText('Proceed To Checkout').click()
    }

    async viewAndEditCartPage(){
        await this.page.locator('[class="minicart-wrapper"]').click()
	    await this.page.getByText('View and Edit Cart').click() //cart
    }


}
