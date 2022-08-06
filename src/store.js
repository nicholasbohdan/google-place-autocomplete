import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './redux/index.js'

export default configureStore({
  reducer: {
    counter: counterReducer
  }
})