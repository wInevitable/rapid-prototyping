import A from 'const/actionTypes'

export default {
  showSnackbar: (snackbar) => {
    return (dispatch, getState) => {
      snackbar.active = true
      dispatch({
        type: A.SHOW_SNACKBAR,
        snackbar,
      })
    }
  },
  hideSnackbar: () => {
    return (dispatch, getState) => {
      dispatch({
        type: A.HIDE_SNACKBAR,
      })
    }
  },
}
