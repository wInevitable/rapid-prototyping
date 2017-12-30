import A from 'const/actionTypes'

export default (currentState, action) => {
  let updatedState = Object.assign({}, currentState)

  switch (action.type) {
    case A.UPDATE_USER_INTERFACE:
      updatedState = Object.assign(updatedState, action.update)
      break
  }

  return updatedState
}
