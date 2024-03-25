import { configureStore } from '@reduxjs/toolkit'
import productSlice from './slice/product'
export const store = configureStore({
  reducer: {
    productsReducer: productSlice,
  },
})