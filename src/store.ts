import { combineReducers, configureStore } from '@reduxjs/toolkit'
import configSlice from './slices/configSlice'
import mangaSlice from './slices/mangaSlice'
import schedulerSlice from './slices/schedulerSlice'

const rootReducer = combineReducers({
  manga: mangaSlice,
  config: configSlice,
  scheduler: schedulerSlice
})

const store = configureStore({
  reducer: rootReducer
})

export default store
