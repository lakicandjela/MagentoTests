import {test, expect} from "@playwright/test"
import { NavigationPage } from "../page-objects/navigationPage"
import { PageManager } from "../page-objects/pageManager"
import { ShippingRate } from "./enums"



test.beforeEach( async ({page}) => {
	await page.goto('https://magento.softwaretestingboard.com/')

})

test('random test', async({page}) => {


})

test('navigation test', async({page}) => {
	const pm = new PageManager(page)
	await pm.navigateTo().productsPage('women')
	await pm.navigateTo().signInPage()
	await pm.navigateTo().createAccountPage()
})

test('proceed to checkout when smt in cart', async({page}) => {
	const pm = new PageManager(page)
	await page.locator('li').filter({ hasText: 'Radiant Tee Rating: 60% 3' }).getByLabel('XS').click()
	await page.locator('li').filter({ hasText: 'Radiant Tee Rating: 60% 3' }).getByLabel('Purple').click()
	await page.locator('li').filter({ hasText: 'Radiant Tee Rating: 60% 3' }).getByText('Add to Cart').click()
	await page.waitForTimeout(3000)
	

	await pm.navigateTo().proceedToCheckoutPage()
})

test('view and edit when smt in cart', async({page}) => {
	const pm = new PageManager(page)
	await page.locator('li').filter({ hasText: 'Radiant Tee Rating: 60% 3' }).getByLabel('XS').click()
	await page.locator('li').filter({ hasText: 'Radiant Tee Rating: 60% 3' }).getByLabel('Purple').click()
	await page.locator('li').filter({ hasText: 'Radiant Tee Rating: 60% 3' }).getByText('Add to Cart').click()
	await page.waitForTimeout(3000)
	

	await pm.navigateTo().viewAndEditCartPage()
})

test('login', async({page}) => {
	const pm = new PageManager(page)
	await pm.navigateTo().signInPage()

	const email = "test@test.com"
	const password = "12345678"

	await pm.onSignInPage().signInWithCredentials(email, password)
})

test('create an account', async({page}) => {
	const pm = new PageManager(page)
	await pm.navigateTo().createAccountPage()

	const firstName = "Jane"
	const lastName = "Doe"
	const email = "test@test.com"
	const password = "12345678"

	await pm.onCreateAccountPage().createAccountWithCredentials(firstName, lastName, email, password, password)

})


test('fill data for checkout', async({page}) => {
	const pm = new PageManager(page)
	await page.locator('li').filter({ hasText: 'Radiant Tee Rating: 60% 3' }).getByLabel('XS').click()
	await page.locator('li').filter({ hasText: 'Radiant Tee Rating: 60% 3' }).getByLabel('Purple').click()
	await page.locator('li').filter({ hasText: 'Radiant Tee Rating: 60% 3' }).getByText('Add to Cart').click()
	await page.waitForTimeout(5000)
	

	await pm.navigateTo().proceedToCheckoutPage()
	const email = "test@test.com"
	const firstName = "Jane"
	const lastName = "Doe"
	const company = "wfwefewf"
	const streetAddress1 = "Bulevar"
	const streetAddress2 = "876"
	const streetAddress3 = "NS"
	const city = "rgrgwr"
	const stateProvince = "Morelos"
	const zip = "24566" 
	const country = "Mexico"
	const phoneNumber = "56364654"
	const shippingRate = ShippingRate.FIXED; 

	await pm.onCheckoutPage().checkoutWhileNotSignedIn(email, firstName, lastName, company, streetAddress1, streetAddress2, streetAddress3, 
		city, zip, country, phoneNumber, stateProvince, shippingRate
	)
    
})

