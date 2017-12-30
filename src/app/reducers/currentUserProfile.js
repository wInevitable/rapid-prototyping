import A from 'const/actionTypes'

export default (currentState, action) => {
  let updatedState = Object.assign({}, currentState)

  switch (action.type) {
    case A.CLEAR_CURRENT_USER_PROFILE:
      updatedState = {}
      break
    case A.CREATE_CURRENT_USER_PROFILE:
      updatedState = action.defaultUserProfile
      break
    case A.DELETE_CURRENT_USER_PROFILE:
      updatedState = {}
      break
    case A.SET_CURRENT_USER_PROFILE:
      updatedState = action.currentUserProfile
      break
    case A.UPDATE_CURRENT_USER_PROFILE:
      updatedState = Object.assign(
        {},
        updatedState,
        action.updatedCurrentUserProfile
      )
  }

  return updatedState
}
