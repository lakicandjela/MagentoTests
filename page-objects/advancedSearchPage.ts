import { Page, Locator } from '@playwright/test'

export class AdvancedSearchPage {
    readonly page: Page
    readonly advancedsearchPageTitle: Locator
    readonly productNameInputField: Locator
    readonly searchButton: Locator
    readonly searchResultPageTitle: Locator
    readonly productsList: Locator
    readonly noProductsMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.advancedsearchPageTitle = page.getByRole('heading', { name: 'Advanced Search' }).locator('span')
        this.productNameInputField = page.getByLabel('Product Name')
        this.searchButton = page.locator('#form-validate').getByRole('button', { name: 'Search' })
        this.searchResultPageTitle = page.getByRole('heading', { name: 'Catalog Advanced Search' }).locator('span')
        this.productsList = page.getByRole('listitem').locator('[class="product name product-item-name"]')
        this.noProductsMessage = page.getByRole('link', { name: 'Modify your search.' })
    }
}