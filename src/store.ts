import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import configManagerSlice from './slices/configManagerSlice'

import configSlice from './slices/configSlice'
import mangaSlice from './slices/mangaSlice'
import schedulerSlice from './slices/schedulerSlice'

const rootReducer = combineReducers({
  manga: mangaSlice,
  config: configSlice,
  scheduler: schedulerSlice,
  configManager: configManagerSlice
})

const customMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

const store = configureStore({
  reducer: rootReducer,
  middleware: customMiddleware
})

export default store
