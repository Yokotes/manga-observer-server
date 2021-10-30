/* eslint-disable no-use-before-define */

export default class Scheduler {
  private events: SchedulerEvent []

  // eslint-disable-next-line no-undef
  private timerId: NodeJS.Timeout
  interval: number

  constructor () {
    this.events = []
    this.interval = 60000
  }

  addEvent (event: SchedulerEvent) {
    this.events.push(event)
  }

  setInterval (val: number) {
    this.interval = val
  }

  getEvents () {
    return this.events
  }

  start () {
    this.__loop()
  }

  __loop () {
    this.timerId = setInterval(() => {
      this.events.forEach(event => event.exec(this))
    }, this.interval)
  }

  stop () {
    clearInterval(this.timerId)
  }
}

export type SchedulerEvent = {
  id: string,
  exec: (scheduler: Scheduler) => void
}
