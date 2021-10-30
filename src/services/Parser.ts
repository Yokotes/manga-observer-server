import * as puppeteer from 'puppeteer'
import { Protocol, Browser, Page } from 'puppeteer'

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
  pages: PageObj[]

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

    this.browser = await puppeteer.launch({
      headless: true,
      ignoreHTTPSErrors: true,
      args: args
    })

    this.pages = []
  }

  async parse ({ id, url, cookies }: ParseConfig) {
    const res: ParseResult = {
      configId: id,
      data: '',
      status: 'error'
    }
    const pageObj = this.pages.find((p) => p.id === id)
    let currentPage: Page

    if (pageObj) {
      const { page } = pageObj
      page.reload()

      currentPage = page
    } else {
      const newPage = await this.browser.newPage()
      newPage.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36')
      newPage.setJavaScriptEnabled(true)
      this.pages.push({
        id,
        page: newPage
      })

      currentPage = newPage
    }

    try {
      for (let i = 0; i < cookies.length; i++) {
        await currentPage.setCookie(cookies[i])
      }
      await currentPage.goto(url)

      const content = await currentPage.content()
      // eslint-disable-next-line prefer-regex-literals
      res.data = JSON.parse(content.replace(new RegExp('<[^>]*>', 'g'), '')).notifications
      res.status = 'success'
    } catch (err) {
      res.data = err
      res.status = 'error'
    }

    currentPage.reload()

    return res
  }

  async close () {
    await this.browser.close()
  }
}
