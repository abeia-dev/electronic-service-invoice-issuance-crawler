import dotenv from 'dotenv'
import puppeteer from 'puppeteer'
import * as urls from './constants/urls.constants'
import { delay } from './utils/wait'
import env from './config/environment'

dotenv.config()
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
	await page.waitForNavigation()

	console.log('Page load: Authenticated')
	const header = await page.waitForSelector('.profile-picture')
	const headerTextContent = await header?.evaluate((el) => el.textContent)

	await page.click('a.botaoSairMenu')

	await delay(1000)

	await page.waitForSelector('.swal-modal .swal-footer .swal-button--confirm')
	await delay(3000)
	await page.click('.swal-button--confirm')

	await page.waitForNavigation()
	await page.waitForSelector('[role="document"]')

	await browser.close()
})()
