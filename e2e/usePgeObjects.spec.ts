import {test, expect} from "@playwright/test"
import { NavigationPage } from "../page-objects/navigationPage"
import { PageManager } from "../page-objects/pageManager"



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


