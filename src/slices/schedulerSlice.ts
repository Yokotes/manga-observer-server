import { createSlice } from '@reduxjs/toolkit'
import { Scheduler } from '../services'

const schedulerSlice = createSlice({
  name: 'schedulerSlice',
  initialState: {
    scheduler: new Scheduler()
  },
  reducers: {
    setScheduler (state, { payload }) {
      state.scheduler = payload
    }
  }
})

export default schedulerSlice.reducer

export const { setScheduler } = schedulerSlice.actions
