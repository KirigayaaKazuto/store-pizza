import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  totalPrice: 0,
  items: []
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const findItem = state.items.find(obj => obj.id === action.payload.id)
      if(findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        })
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + (obj.price * obj.count)
      }, 0)
    },
    decrementItem: (state, action) => {
      const findItem = state.items.find(obj => obj.id === action.payload.id)
      if(findItem) findItem.count--
      const price = state.totalPrice
      state.totalPrice = price - action.payload.price
      if(findItem.count === 0) state.items = state.items.filter(obj => obj.id !== action.payload.id)
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(obj => obj.id !== action.payload.id)
      const price = state.totalPrice
      state.totalPrice = price - (action.payload.price * action.payload.count)
      
    },
    clearItem: (state) => {
      state.items = []
      state.totalPrice = 0
    }
  }
})

export const {addItem, removeItem, clearItem, decrementItem} = basketSlice.actions

export default basketSlice.reducer
