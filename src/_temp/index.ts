import 'dotenv/config'
import puppeteer from 'puppeteer'
import * as SJC from './crawlers/sjc.crawler'
;(async () => {
	const browser = await puppeteer.launch({ headless: 'new' })
	const page = await browser.newPage()

	try {
		await SJC.login(page)
		await SJC.logout(page)

		console.log('Crawler Done!\n')
	} catch (error) {
		console.log('Crawler error:', error)
	} finally {
		await browser.close()
	}
})()
