import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  category: 0,
  currentPage: 1,
  sort: {
    id: 0,
    title:'популярности(по возрастанию)', 
    sortProperty: '-rating' 
  }
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload
    },
    setSort: (state, action) => {
      state.sort = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload 
    },
    setFilters: (state, action) => {
      state.sort = action.payload.sort
      state.category = Number(action.payload.category)
      state.currentPage = Number(action.payload.currentPage)
    }
  }
})

export const {setCategory, setSort, setCurrentPage, setFilters} = filterSlice.actions

export default filterSlice.reducer
