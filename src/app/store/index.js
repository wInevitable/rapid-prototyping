import { applyMiddleware, compose, createStore, } from 'redux'
import { browserHistory, } from 'react-router'
import { routerMiddleware, } from 'react-router-redux'
import Config from '../config'
import initialState from './initialState'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'

const logger = store => next => action => {
  return next(action)
}

const middleware = routerMiddleware(browserHistory)

const enhancer = compose(
  window.devToolsExtension && Config.NODE_ENV !== 'production' ? window.devToolsExtension() : f => f,
)

export default applyMiddleware(
  thunk,
  middleware,
  logger
)(createStore)(rootReducer, initialState, enhancer)
