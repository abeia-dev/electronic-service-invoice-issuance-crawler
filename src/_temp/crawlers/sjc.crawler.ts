import { Page } from 'puppeteer'
import * as urls from '../constants/urls.constants'
import { delay } from '../../utils/wait'
import env from '../../config/environment'

export const login = async (page: Page): Promise<void> => {
	try {
		await page.goto(urls.sjc.auth)
		await page.setViewport({ width: 1080, height: 1024 })

		console.log('Filling up auth fields')
		await page.type('#input-56', env.auth_login)
		await page.type('#input-61', env.auth_password)

		console.log('Signing in')
		await page.click('.v-card__actions button')

		console.log('Waiting for a page load')
		await page.waitForNavigation()

		console.log('Page load: Authenticated')
		const header = await page.waitForSelector('.profile-picture')
		// const headerTextContent = await header?.evaluate((el) => el.textContent)
	} catch (error) {
		console.error('Crawler SJC Login Error:', error)
		throw new Error('Crawler SJC Login Error')
	}
}

export const logout = async (page: Page): Promise<void> => {
	try {
		console.log('Clicking on exit button')
		await page.click('#navbartop li a.botaoSairMenu')

		console.log('Waiting for confirmation modal')
		await page.waitForSelector('.swal-modal .swal-footer .swal-button--confirm')

		console.log('Clicking on confirmation button')
		await page.click('.swal-button--confirm')

		console.log('Waiting for homepage')
		await page.waitForSelector('[role="document"]')
	} catch (error) {
		console.error('Crawler SJC Logout Error:', error)
		throw new Error('Crawler SJC Logout Error')
	}
}
