import { createSlice } from '@reduxjs/toolkit'
import MongoConfigManager from '../services/MongoConfigManager'

const configManagerSlice = createSlice({
  name: 'configManagerSlice',
  initialState: {
    configManager: new MongoConfigManager()
  },
  reducers: {
    setConfigManager (state, { payload }) {
      state.configManager = payload
    }
  }
})

export default configManagerSlice.reducer

export const { setConfigManager } = configManagerSlice.actions
