import authActions from './auth'
import currentUserActions from './currentUser'
import currentUserProfileActions from './currentUserProfile'
import dialogActions from './dialog'
import routeParamsActions from './routeParams'
import snackbarActions from './snackbar'
import userActions from './users'
import userInterfaceActions from './userInterface'

export default Object.assign(
  {},
  authActions,
  currentUserActions,
  currentUserProfileActions,
  dialogActions,
  routeParamsActions,
  snackbarActions,
  userActions,
  userInterfaceActions,
)
