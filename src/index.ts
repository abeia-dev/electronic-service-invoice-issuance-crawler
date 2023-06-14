import 'dotenv/config'
import puppeteer from 'puppeteer'
import * as urls from './constants/urls.constants'
import { delay } from './utils/wait'
import env from './config/environment'
;(async () => {
	const browser = await puppeteer.launch({ headless: false })
	const page = await browser.newPage()

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
	const headerTextContent = await header?.evaluate((el) => el.textContent)

	console.log('Clicking on exit button')
	await page.click('#navbartop li a.botaoSairMenu')

	console.log('Waiting for confirmation modal')
	await page.waitForSelector('.swal-modal .swal-footer .swal-button--confirm')

	console.log('Clicking on confirmation button')
	await page.click('.swal-button--confirm')

	console.log('Waiting for homepage')
	await page.waitForSelector('[role="document"]')

	await browser.close()

	console.log('Done, browser closed')
})()
