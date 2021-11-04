import puppeteer, { Protocol, Browser, Page } from 'puppeteer'
import UserAgents from 'user-agents'

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

export type PageObj = {
  id: string,
  page: Page
}

export default class Parser {
  browser: Browser
  page: Page

  constructor () {
    this.setup()
  }

  async setup () {
    const args = [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]

    if (process.env.IS_HEROKU === 'true') {
      args.push(`--proxy-server=${process.env.PROXY_SERVER}`)
    }

    // puppeteer.use(StealthPlugin())

    this.browser = await puppeteer.launch({
      headless: true,
      ignoreHTTPSErrors: true,
      args: args
    })
  }

  async parse ({ id, url, cookies }: ParseConfig) {
    const res: ParseResult = {
      configId: id,
      data: '',
      status: 'error'
    }
    const page = await this.browser.newPage()
    const userAgent = new UserAgents()
    page.setUserAgent(userAgent.toString())
    try {
      for (let i = 0; i < cookies.length; i++) {
        await page.setCookie(cookies[i])
      }
      await page.goto(url)
      await page.waitForTimeout(5000)

      const content = await page.content()
      // eslint-disable-next-line prefer-regex-literals
      res.data = JSON.parse(content.replace(new RegExp('<[^>]*>', 'g'), '')).notifications
      res.status = 'success'
      console.log('parsed')
    } catch (err) {
      res.data = err
      res.status = 'error'
    }
    await page.close()
    return res
  }

  async close () {
    await this.browser.close()
  }
}
