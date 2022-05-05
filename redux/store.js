import { configureStore } from '@reduxjs/toolkit'
import siteUser from './siteUser'
import fontList from './fontList'

const reduxStore = configureStore({
  reducer: {
    siteUser,
    fontList
  }
})

export default reduxStore
