import { createSlice } from '@reduxjs/toolkit'

const configSlice = createSlice({
  name: 'configSlice',
  initialState: {
    configs: []
  },
  reducers: {
    addConfig (state, { payload }) {
      state.configs.push(payload)
    },
    removeConfig (state, { payload }) {
      state.configs = state.configs.filter(config => config.id !== payload)
    }
  }
})

export default configSlice.reducer

export const { addConfig, removeConfig } = configSlice.actions
