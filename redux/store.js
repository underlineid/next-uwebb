import { configureStore } from '@reduxjs/toolkit'
import siteUser from './siteUser'
import fontList from './fontList'
import uwebbSite from './uwebbSite'

const reduxStore = configureStore({
  reducer: {
    siteUser,
    fontList,
    uwebbSite
  }
})

export default reduxStore
