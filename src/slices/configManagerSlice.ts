import { createSlice } from '@reduxjs/toolkit'
import { ConfigManager } from '../services'

const configManagerSlice = createSlice({
  name: 'configManagerSlice',
  initialState: {
    configManager: new ConfigManager()
  },
  reducers: {
    setConfigManager (state, { payload }) {
      state.configManager = payload
    }
  }
})

export default configManagerSlice.reducer

export const { setConfigManager } = configManagerSlice.actions
