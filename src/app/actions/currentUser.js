import A from 'const/actionTypes'

export default {
  setCurrentUser: (currentUser) => {
    return (dispatch, getState) => {
      dispatch({
        type: A.SET_CURRENT_USER,
        currentUser
      })
    }
  },
}
