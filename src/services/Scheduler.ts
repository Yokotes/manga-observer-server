/* eslint-disable no-use-before-define */

export default class Scheduler {
  private events: SchedulerEvent []

  // eslint-disable-next-line no-undef
  private timerId: NodeJS.Timeout
  interval: number

  constructor () {
    this.events = []
    this.interval = 1000
  }

  addEvent (event: SchedulerEvent) {
    this.events.push(event)
  }

  setInterval (val: number) {
    this.interval = val
    this.stop()
    this.start()
  }

  getEvents () {
    return this.events
  }

  start () {
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
