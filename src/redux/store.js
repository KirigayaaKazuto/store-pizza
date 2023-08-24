import { combineReducers, configureStore } from '@reduxjs/toolkit'
import filterSlice from './slice/filter/filterSlice'
//import {favoritesSlice} from './favorites/favorites.slice'
// const reducers = combineReducers({
//   //favorites: favoritesSlice.reducer,
//   filter: filterSlice

// })

export const store = configureStore({
  reducer: {
    filter: filterSlice
  },
})
