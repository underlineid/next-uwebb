import { createSlice } from '@reduxjs/toolkit'

export const fontList = createSlice({
  name: 'fontList',
  initialState: {
    value: false,
    type: false,
    grouped: false
  },
  reducers: {
    setFontList: (state, action) => {
      state.value = action.payload
    },
    setFontType: (state, action) => {
      state.type = action.payload
    },
    setFontGroup: (state, action) => {
      state.grouped = action.payload
    }
  }
})

export const { setFontList, setFontType, setFontGroup } = fontList.actions
export default fontList.reducer
