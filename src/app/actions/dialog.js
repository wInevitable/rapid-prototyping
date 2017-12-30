import A from 'const/actionTypes'

export default {
  showDialog: (dialog) => {
    return (dispatch, getState) => {
      dispatch({
        type: A.SHOW_DIALOG,
        dialog
      })
    }
  },
  hideDialog: () => {
    return (dispatch, getState) => {
      dispatch({
        type: A.HIDE_DIALOG,
      })
    }
  },
}
