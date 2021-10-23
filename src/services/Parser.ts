import { Protocol, Browser, Page } from 'puppeteer'
import puppeteer from 'puppeteer-extra'
import AddBlockerPlugin from 'puppeteer-extra-plugin-adblocker'

export type ParseResult = {
  configId: string | null,
  data: any,
  status: 'success' | 'error'
}

export type ParseConfig = {
  id: string,
  url: string,
  cookies: Protocol.Network.CookieParam[]
}

export default class Parser {
  browser: Browser
  page: Page

  constructor () {
    this.setup()
  }

  async setup () {
    const StealthPlugin = require('puppeteer-extra-plugin-stealth')
    puppeteer.use(AddBlockerPlugin({ blockTrackers: true }))
    puppeteer.use(StealthPlugin())

    this.browser = await puppeteer.launch({
      headless: true,
      ignoreHTTPSErrors: true,
      userDataDir: './tmp',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-infobars',
        '--window-position=0,0',
        '--ignore-certifcate-errors',
        '--ignore-certifcate-errors-spki-list',
        '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'
      ]
    })
    this.page = await this.browser.newPage()
    await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36')
  }

  async parse ({ id, url, cookies }: ParseConfig) {
    const res: ParseResult = {
      configId: id,
      data: '',
      status: 'error'
    }
    try {
      for (let i = 0; i < cookies.length; i++) {
        await this.page.setCookie(cookies[i])
      }
      await this.page.goto(url)

      const content = await this.page.content()
      // eslint-disable-next-line prefer-regex-literals
      res.data = JSON.parse(content.replace(new RegExp('<[^>]*>', 'g'), '')).notifications
      res.status = 'success'
    } catch (err) {
      res.data = err
      res.status = 'error'
    }

    return res
  }

  async close () {
    await this.browser.close()
  }
}
