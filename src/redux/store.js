import { combineReducers, configureStore } from '@reduxjs/toolkit'
import filter from './slice/filterSlice'
import basket from './slice/basketSlice'
import pizzas from './slice/pizzasSlice'

export const store = configureStore({
  reducer: {
    filter,
    basket,
    pizzas
  },
})
