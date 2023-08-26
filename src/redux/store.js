import { combineReducers, configureStore } from '@reduxjs/toolkit'
import filter from './slice/filterSlice'
import basket from './slice/basketSlice'

export const store = configureStore({
  reducer: {
    filter,
    basket
  },
})
