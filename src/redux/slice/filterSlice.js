import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  search: '',
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
    },
    setSearch: (state, action) => {
      state.search = action.payload
    }
  }
})

export const {setCategory, setSort, setCurrentPage, setFilters, setSearch} = filterSlice.actions
export const selectFilter = (state) => state.filter
export default filterSlice.reducer
