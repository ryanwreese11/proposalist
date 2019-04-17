import { createStore, applyMiddleware } from 'redux'
import userReducer from './ducks/userReducer'
import promiseMiddleware from 'redux-promise-middleware'
import {composeWithDevTools} from 'redux-devtools-extension'



export default createStore(userReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)))