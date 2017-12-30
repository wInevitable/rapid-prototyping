import A from 'const/actionTypes'
import actions from '.'
import firebase from 'firebase'
import firebaseService from 'infrastructure/FirebaseService'
import N from 'const/namespace'

const syncUserWithFirebase = (dispatch, userData) => {
  firebaseService.add(
    'users/',
    {
      email: userData.email,
      initialProvider: userData.initialProviderId,
      name: userData.displayName,
      photoURL: userData.photoURL,
      providerData: userData.providerData,
    },
    N.USERS,
    userData.userId
  )
  dispatch(actions.createCurrentUserProfile(userData.userId))
  dispatch(actions.alertUser({ message: 'Account Created.', }))
}

export default {
  alertUser: (snackbar) => {
    return (dispatch, getState) => {
      dispatch(actions.showSnackbar({
        active: true,
        message: snackbar.message,
        timeout: 4000,
      }))
    }
  },
  alertUserWithError: (error) => {
    return (dispatch, getState) => {
      dispatch({
        type: A.DISPLAY_ERROR,
        error: error.message.toString(),
      })
      dispatch(actions.alertUser({ message: 'Please Try Again.', }))
    }
  },
  clearUsers: () => {
    return (dispatch, getState) => {
      dispatch({ type: A.CLEAR_USERS, })
    }
  },
  deleteUser: (userId) => {
    return (dispatch, getState) => {
      firebaseService.off('users/' + userId, N.USERS)
      dispatch({ type: A.DELETE_USER, userId, })
      dispatch(actions.deleteCurrentUserProfile(userId))

      firebase.auth().currentUser.delete().then(() => {
        console.log("Account Deleted! Goodbye :'(")
        dispatch(actions.signOut())
        dispatch(actions.alertUser({ message: 'Account Deleted.', }))
      }, (error) => {
        if (error) {
          dispatch({
            type: A.DISPLAY_ERROR,
            error: error.message.toString(),
          })
        }
        dispatch(actions.alertUser({ message: 'Please Try Again.', }))
      })
    }
  },
  resetPassword: () => {
    return (dispatch, getState) => {
      const auth = firebase.auth()
      const resetEmail = getState().userInterface.resetEmail

      auth.sendPasswordResetEmail(resetEmail).then(() => {
        dispatch(actions.alertUser({ message: 'Password Reset.', }))
      }, (error) => {
        if (error) {
          dispatch({
            type: A.DISPLAY_ERROR,
            error: error.message.toString(),
          })
        }
      })
    }
  },
  setUser: (userId, user) => {
    return (dispatch, getState) => {
      let users = getState().users || {}
      users[userId] = user

      dispatch({
        type: A.SET_USER,
        users
      })
    }
  },
  syncUser: (authData) => {
    return (dispatch, getState) => {
      const providerData = authData.providerData
      const initialProvider = providerData && providerData[0]
      const initialProviderId = initialProvider && initialProvider.providerId
      const displayName = authData.displayName
      const email = authData.email

      let userData = {
        email: email,
        userId: authData.uid,
        initialProviderId: initialProviderId,
        name: displayName,
        photoURL: authData.photoURL,
        providerData: providerData,
      }

      syncUserWithFirebase(dispatch, userData)
    }
  },
  updateUser: (userId, userData) => {
    return (dispatch, getState) => {
      if (userId) {
        let user = getState().users[userId] || {}
        let updatedUser = Object.assign({}, user, userData)

        dispatch({
          type: A.UPDATE_USER,
          userId,
          updatedUser,
        })
        dispatch(actions.setCurrentUser(updatedUser))

        firebaseService.update(
          'users/' + userId,
          updatedUser,
          (error) => {
            if (error) { dispatch(actions.alertUserWithError(error)) }
          },
          N.USERS,
        )
      }
    }
  },
}
