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
    this.browser = await puppeteer.launch({
      headless: true,
      ignoreHTTPSErrors: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--proxy-server=31.210.210.22:10057'
      ]
    })
    this.page = await this.browser.newPage()
    this.page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36')
    this.page.setJavaScriptEnabled(true)
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
