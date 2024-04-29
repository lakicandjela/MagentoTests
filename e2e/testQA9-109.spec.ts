import { test, expect } from "@playwright/test"
import { PageManager } from "../page-objects/pageManager"
import { advancedSearchKeywords } from "../helper/data"

let pm: PageManager

test.beforeEach(async ({ page }) => {
    pm = new PageManager(page)   // Create a page manager for interactions
    await page.goto('/')
    await expect(pm.onHomePage().storeLogo).toBeVisible() // Assert that the site is opened
})

test('Advanced search for products with expected product name keywords', async ({ }) => {
    const keyword = advancedSearchKeywords[0]

    // Navigate to the Advanced Search page
    await pm.onHomePage().advancedSearchLink.click()
    expect(pm.onAdvancedSearchPage().advancedsearchPageTitle).toBeVisible() // Verify page load

    // Input the search keyword and initiate search
    await pm.onAdvancedSearchPage().productNameInputField.fill(keyword)
    await pm.onAdvancedSearchPage().searchButton.click()
    expect(pm.onAdvancedSearchPage().searchResultPageTitle).toBeVisible() // Verify search results are opened

    // Retrieve a list of product names from the results
    const listOfFoundProductNames = await pm.onAdvancedSearchPage().productsList.allTextContents()

    // Case 1: Products are found
    if (listOfFoundProductNames.length != 0) {
        let listOfFoundProductNamesLowercase = listOfFoundProductNames.map(item => item.toLowerCase());

        // Iterate and verify each product name contains the keyword
        for (let i in listOfFoundProductNamesLowercase) {
            expect(listOfFoundProductNamesLowercase[i]).toContain(keyword)
        }
    } else { // Case 2: No products found
        await expect(pm.onAdvancedSearchPage().noProductsMessage).toBeVisible()
    }
})