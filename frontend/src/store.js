import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

const reducer = {}

const middleware = [thunk]

const store = configureStore(reducer, middleware)

export default store
