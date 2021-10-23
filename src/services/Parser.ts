import * as puppeteer from 'puppeteer'

export type ParseResult = {
  configId: string | null,
  data: any,
  status: 'success' | 'error'
}

export type ParseConfig = {
  id: string,
  url: string,
  cookies: puppeteer.Protocol.Network.CookieParam[]
}

export default class Parser {
  browser: puppeteer.Browser
  page: puppeteer.Page

  constructor () {
    this.setup()
  }

  async setup () {
    this.browser = await puppeteer.launch({

    })
    this.page = await this.browser.newPage()
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
