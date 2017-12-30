import A from 'const/actionTypes'

export default (currentState, action) => {
  let updatedState = Object.assign({}, currentState)

  switch (action.type) {
    case A.CLEAR_USERS:
      updatedState = {}
      break
    case A.DELETE_USER:
      delete updatedState[action.userId]
      break
    case A.SET_USER:
      updatedState = action.users
      break
    case A.SET_USERS:
      updatedState = Object.assign({}, updatedState, action.users)
      break
    case A.UPDATE_USER:
      updatedState[action.userId] = Object.assign(
        {},
        updatedState[action.userId],
        action.updatedUser
      )
  }

  return updatedState
}
