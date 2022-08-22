import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filter: (state) => {

    }
  },
})

export const { filter } = filterSlice.actions

export default filterSlice.reducer