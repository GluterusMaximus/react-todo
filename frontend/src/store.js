import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { userReducer } from './reducers/userReducer'

const reducer = {
  user: userReducer,
}

const middleware = [thunk]

const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
})

export default store
