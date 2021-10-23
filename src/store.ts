import { combineReducers, configureStore } from '@reduxjs/toolkit'
import configSlice from './slices/configSlice'
import mangaSlice from './slices/mangaSlice'

const rootReducer = combineReducers({
  manga: mangaSlice,
  config: configSlice
})

const store = configureStore({
  reducer: rootReducer
})

export default store
