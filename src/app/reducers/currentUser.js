import A from 'const/actionTypes'

export default (currentState, action) => {
  let updatedState = Object.assign({}, currentState)

  switch (action.type) {
    case A.SET_CURRENT_USER:
      updatedState = action.currentUser
  }

  return updatedState
}
