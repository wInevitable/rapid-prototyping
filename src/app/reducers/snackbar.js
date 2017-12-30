import A from 'const/actionTypes'

export default (currentState, action) => {
  let updatedState = Object.assign({}, currentState)

  switch (action.type) {
    case A.SHOW_SNACKBAR:
      updatedState = action.snackbar
      break
    case A.HIDE_SNACKBAR:
      updatedState = {
        open: false,
      }
      break
  }

  return updatedState
}
