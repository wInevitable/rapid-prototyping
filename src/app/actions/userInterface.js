import A from 'const/actionTypes'
import actions from 'actions'
import commonPasswords from 'const/commonPasswords'

const testEmail = (email) => {
  let emailError
  const expression = /\S+@\S+\.\S+/
  // TODO - consider using Regex below to minimize invalid email signups
  // const expression = new RegExp(['^(([^<>()[\]\\.,;:\\s@\"]+(\\.[^<>(),[\]\\.,;:\\s@\"]+)*)',
  //   '|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.',
  //   '[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\\.)+',
  //   '[a-zA-Z]{2,}))$'].join(''))

  if (!expression.test(email) && email) {
    emailError = 'Need a valid email address'
  } else {
    emailError = null
  }

  return emailError
}

export default {
  clearUserInterface: () => {
    return (dispatch, getState) => {
      dispatch(actions.updateUserInterface({
        activeTab: 1,
        confirmPassword: null,
        confirmPasswordError: null,
        email: null,
        error: null,
        isReadyToSignIn: false,
        isReadyToSignUp: false,
        password: null,
        passwordError: null,
      }))
    }
  },
  updateUserInterface: (update) => {
    return (dispatch, getState) => {
      dispatch({
        type: A.UPDATE_USER_INTERFACE,
        update,
      })
      const userInterface = getState().userInterface

      let error = null // wipe out Identity Provider Errors
      let password = userInterface.password
      let passwordError
      if (password && password.length < 8) {
        passwordError = 'Password needs to be 8 characters'
      } else if (password && commonPasswords.indexOf(password) > -1) {
        passwordError = `${password} is too easy to guess`
      } else if (password && password.length > 64) {
        passwordError = 'Password needs to be 64 or fewer characters'
      } else {
        passwordError = null
      }

      let confirmPasswordError
      if (password && (password !== userInterface.confirmPassword)) {
        confirmPasswordError = 'Make sure passwords match'
      } else {
        confirmPasswordError = null
      }

      let isReadyToSignIn
      if (
          !passwordError &&
          !userInterface.emailError &&
          userInterface.password &&
          userInterface.email
      ) {
        isReadyToSignIn = true
      } else {
        isReadyToSignIn = false
      }

      let isReadyToSignUp
      if (
          !passwordError &&
          !confirmPasswordError &&
          !userInterface.emailError &&
          userInterface.password &&
          userInterface.email
      ) {
        isReadyToSignUp = true
      } else {
        isReadyToSignUp = false
      }

      let isReadyToUpdateResetEmail
      if (
        !userInterface.resetEmailError &&
        userInterface.resetEmail
      ) {
        isReadyToUpdateResetEmail = true
      } else {
        isReadyToUpdateResetEmail = false
      }

      dispatch({
        type: A.UPDATE_USER_INTERFACE,
        update: {
          confirmPasswordError,
          error,
          isReadyToSignIn,
          isReadyToSignUp,
          isReadyToUpdateResetEmail,
          passwordError,
        },
      })
    }
  },
  validateEmail: () => {
    return (dispatch, getState) => {
      const email = getState().userInterface.email
      const emailError = testEmail(email)
      dispatch(actions.updateUserInterface({ emailError: emailError }))
    }
  },
  validateResetEmail: () => {
    return (dispatch, getState) => {
      const resetEmail = getState().userInterface.resetEmail
      const resetEmailError = testEmail(resetEmail)
      dispatch(actions.updateUserInterface({ resetEmailError: resetEmailError }))
    }
  },
}
