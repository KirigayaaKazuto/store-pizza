import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async ({currentPage, categoryId, sortBy, order}) => {
    const {data} = await axios.get(
      `https://64d663f02a017531bc12965c.mockapi.io/kfdl?page=${currentPage}&limit=4&${categoryId}&sortBy=${sortBy}&order=${order}`,
    )
    return data
  }
)

const initialState = {
  items: [],
  status: 'loading' // loading | success | error
}

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzasItems: (state, actions) => {
      state.items = actions.payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchPizzas.pending, (state) => {
      state.status = 'loading' 
      })
    .addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = 'success'
      state.items = action.payload
    })
    .addCase(fetchPizzas.rejected, (state) => {
      state.status = 'error'
      state.items = []
    })
    
  }
})
export const selectPizzaData = state => state.pizzas
export const {setPizzasItems} = pizzasSlice.actions
export default pizzasSlice.reducer