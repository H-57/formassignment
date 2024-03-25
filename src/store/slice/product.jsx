import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  Total: 0,
  products: [],
}

export const productSlice = createSlice({
  name: 'productSlices',
  initialState,
  reducers: {
   setTotal : (state,action) => {
    
      state.Total=action.payload
    },
    setProducts: (state, action) => {
        state.products=action.payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { setTotal, setProducts } = productSlice.actions

export default productSlice.reducer