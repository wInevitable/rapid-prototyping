import { combineReducers, } from 'redux'
import { routerReducer, } from 'react-router-redux'
import appBarReducer from './appBar'
import authReducer from './auth'
import cacheIndexReducer from './cacheIndex'
import currentUserProfileReducer from './currentUserProfile'
import currentUserReducer from './currentUser'
import dialogReducer from './dialog'
import routeParamsReducer from './routeParams'
import snackbarReducer from './snackbar'
import userInterfaceReducer from './userInterface'
import userReducer from './users'

const rootReducer = combineReducers({
  appBar: appBarReducer,
  auth: authReducer,
  cacheIndex: cacheIndexReducer,
  currentUser: currentUserReducer,
  currentUserProfile: currentUserProfileReducer,
  dialog: dialogReducer,
  routing: routerReducer,
  routeParams: routeParamsReducer,
  snackbar: snackbarReducer,
  userInterface: userInterfaceReducer,
  users: userReducer,
})

export default rootReducer
