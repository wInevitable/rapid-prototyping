import A from 'const/actionTypes'

export default (currentState, action) => {
  let updatedState = Object.assign({}, currentState)

  switch (action.type) {
    case A.CHANGE_EMAIL:
      updatedState.email = action.email
      break
    case A.DISPLAY_ERROR:
      updatedState.error = action.error
      break
    case A.SET_WHITELIST:
      updatedState.whitelist = action.whitelist
      break
    case A.SIGN_IN:
      updatedState.displayName = action.displayName
      updatedState.email = action.email
      updatedState.error = null
      updatedState.photoURL = action.photoURL
      updatedState.providerId = action.providerData[0] && action.providerData[0].providerId
      updatedState.status = 'LOGGED_IN'
      updatedState.uid = action.uid
      break
    case A.SIGNING_IN:
      updatedState.status = 'AWAITING_RESPONSE'
      break
    case A.SIGN_OUT:
      updatedState.displayName = null
      updatedState.email = null
      updatedState.error = null
      updatedState.photoURL = null
      updatedState.providerId = null
      updatedState.status = 'ANONYMOUS'
      updatedState.uid = null
      break
  }

  return updatedState
}
