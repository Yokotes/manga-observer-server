import { createSlice } from '@reduxjs/toolkit'

const mangaSlice = createSlice({
  name: 'mangaSlice',
  initialState: {
    mangaList: []
  },
  reducers: {
    addManga (state, { payload }) {
      state.mangaList.push(payload)
    },
    removeManga (state, { payload }) {
      state.mangaList = state.mangaList.filter(manga => manga.id !== payload)
    }
  }
})

export default mangaSlice.reducer

export const { addManga, removeManga } = mangaSlice.actions
