import { createSlice } from '@reduxjs/toolkit'

export const uwebbSite = createSlice({
  name: 'uwebbSite',
  initialState: {
    value: false
  },
  reducers: {
    setUwebbSite: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setUwebbSite } = uwebbSite.actions
export default uwebbSite.reducer
