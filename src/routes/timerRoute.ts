import { Router } from 'express'
import store from '../store'

const timerRoute = Router()

timerRoute.put('/timer', (req, res) => {
  const scheduler = store.getState().scheduler.scheduler
  const newInterval = req.body.interval

  if (!newInterval || isNaN(parseInt(newInterval))) {
    res.send({
      message: 'New interval is not a number',
      status: 400
    })
    return
  }

  scheduler.setInterval(parseInt(newInterval))

  res.sendStatus(200)
})

export default timerRoute
