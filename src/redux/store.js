import { combineReducers, configureStore } from '@reduxjs/toolkit'
import filterSlice from './slice/filterSlice'
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
