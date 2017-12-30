import A from 'const/actionTypes'
import actions from '.'
import Config from '../config'
import firebase from 'firebase'
import firebaseService from 'infrastructure/FirebaseService'
import N from 'const/namespace'
import store from 'store'

const emailUnverifiedUser = (dispatch, userId) => {
  dispatch(actions.updateUser(userId, { emailed: true, }))
  firebase.auth().currentUser.sendEmailVerification().then(
    () => {},
    (error) => {
      if (error) { dispatch(actions.alertUserWithError(error)) }
      console.log(
        'An error occurred verifying your account: ',
        error.message.toString()
      )
    }
  )
}

const signInUser = (currentUser, dispatch) => {
  if (currentUser.email && whiteListed(currentUser.email)) {
    let authData = {
      displayName: currentUser.displayName,
      email: currentUser.email,
      photoURL: currentUser.photoURL,
      providerData: currentUser.providerData,
      uid: currentUser.uid,
    }
    dispatch(actions.startListeningToUser(authData))
    window.heap.identify(currentUser.uid)
    window.heap.addUserProperties({ email: currentUser.email })
  } else {
    signOutUnauthorizedUser(dispatch)
  }
}

const signOutUnauthorizedUser = (dispatch) => {
  dispatch({
    type: A.SIGN_OUT,
  })
  dispatch(actions.routeTo('sign-in'))

  let error = 'Your email address is not authorized for access.'
  dispatch({
    type: A.UPDATE_USER_INTERFACE,
    update: {
      error,
    },
  })
}

const routeVerifiedUser = (dispatch, route, routeParams) => {
  if (route === 'sign-in') {
    dispatch(actions.routeTo('landing'))
  } else {
    dispatch(actions.routeTo(route, routeParams))
  }
}

const whiteListed = (email) => {
  let isWhiteListed = false
  const whitelist = store.getState().auth.whitelist
  Object.keys(whitelist).map((whitelistKey) => {
    if (email.indexOf(whitelist[whitelistKey]) >= 0) {
      isWhiteListed = true
    }
  })
  return isWhiteListed
}

export default {
  deleteAccount: () => {
    return (dispatch, getState) => {
      const userId = firebase.auth().currentUser.uid
      dispatch(actions.deleteUser(
        userId,
      ))
    }
  },
  signIn: () => {
    return (dispatch, getState) => {
      const userInterface = getState().userInterface
      firebase.auth().signInWithEmailAndPassword(userInterface.email, userInterface.password)
      .then((authResult) => {
        if (authResult && !authResult.error) {
          signInUser(firebase.auth().currentUser, dispatch)
        }
      })
      .catch((error) => { if (error) { dispatch(actions.alertUserWithError(error)) } })
    }
  },
  signInWithFacebook: () => {
    return (dispatch, getState) => {
      dispatch({
        type: A.SIGNING_IN,
      })
      const provider = new firebase.auth.FacebookAuthProvider()
      Config.FACEBOOK_SCOPES.map((scope) => provider.addScope(scope))

      firebase.auth().signInWithPopup(provider).then((authResult) => {
        if (authResult && !authResult.error) {
          signInUser(firebase.auth().currentUser, dispatch)
        }
      })
      .catch((error) => { if (error) { dispatch(actions.alertUserWithError(error)) } })
    }
  },
  signInWithGoogle: () => {
    return (dispatch, getState) => {
      dispatch({
        type: A.SIGNING_IN,
      })
      const provider = new firebase.auth.GoogleAuthProvider()

      firebase.auth().signInWithPopup(provider).then((authResult) => {
        if (authResult && !authResult.error) {
          signInUser(firebase.auth().currentUser, dispatch)
        }
      })
      .catch((error) => { if (error) { dispatch(actions.alertUserWithError(error)) } })
    }
  },
  signInWithTwitter: () => {
    return (dispatch, getState) => {
      dispatch({
        type: A.SIGNING_IN,
      })
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(provider).then((authResult) => {
        if (authResult && !authResult.error) {
          let currentUser = firebase.auth().currentUser

          if (currentUser.email) {
            signInUser(currentUser, dispatch)
          } else {
            dispatch({
              type: A.DISPLAY_ERROR,
              error: 'An email address is required in order to sign in!',
            })
            dispatch({
              type: A.SIGN_OUT,
            })
          }
        }
      })
      .catch((error) => { if (error) { dispatch(actions.alertUserWithError(error)) } })
    }
  },
  signOut: () => {
    return (dispatch, getState) => {
      firebase.auth().signOut().then(() => {
        dispatch(actions.clearCurrentUserProfile())
        dispatch(actions.clearUsers())
        dispatch(actions.clearUserInterface())
        dispatch(actions.routeTo('sign-in'))
        dispatch(actions.setCurrentUser({}))
        dispatch({ type: A.SIGN_OUT, })
      }, function (error) {
        if (error) { dispatch(actions.alertUserWithError(error)) }
      })
    }
  },
  signUp: () => {
    return (dispatch, getState) => {
      const userInterface = getState().userInterface
      if (whiteListed(userInterface.email)) {
        firebase.auth().createUserWithEmailAndPassword(userInterface.email, userInterface.password)
        .then((authResult) => {
          console.log('Welcome!')
          window.heap.identify(authResult.uid)
          window.heap.addUserProperties({ email: authResult.email })
        })
        .catch((error) => { if (error) { dispatch(actions.alertUserWithError(error)) } })
      } else {
        signOutUnauthorizedUser(dispatch)
      }
    }
  },
  startListeningToAuth: () => {
    return (dispatch, getState) => {
      firebase.auth().onAuthStateChanged((authData) => {
        if (authData) {
          if (whiteListed(authData.email)) { // if no whitelist substitute w/ authData.uid
            dispatch(actions.startListeningToUser(authData))
          } else {
            signOutUnauthorizedUser(dispatch)
          }
        }
      })
    }
  },
  startListeningToFirebase: () => {
    return (dispatch, getState) => {
      firebaseService.subscribe(
        'whitelist',
        (result) => {
          const whitelist = result.val() || {}
          dispatch({
            type: A.SET_WHITELIST,
            whitelist
          })
          dispatch(actions.startListeningToAuth())
        },
        N.USERS
      )
    }
  },
  startListeningToUser: (authData) => {
    return (dispatch, getState) => {
      const userId = authData.uid

      dispatch({
        type: A.SIGN_IN,
        displayName: authData.displayName,
        email: authData.email,
        photoURL: authData.photoURL,
        providerData: authData.providerData,
        uid: userId,
      })

      firebaseService.subscribe(
        'users/' + userId,
        (result) => {
          const currentUser = result.val() || {}

          if (!Object.keys(currentUser).length || !userId) {
            if (whiteListed(authData.email)) {
              dispatch(actions.syncUser(authData))
            } else {
              signOutUnauthorizedUser(dispatch)
            }
          } else {
            if (authData.email !== currentUser.email) {
              dispatch(actions.updateUser(userId, { email: authData.email, }))
            }
            dispatch(actions.setUser(userId, currentUser))
            dispatch(actions.setCurrentUser(currentUser))
            dispatch(actions.setCurrentUserProfile(userId))
            dispatch(actions.setCurrentUserPurchaseProfile(userId))
            dispatch(actions.clearUserInterface())

            if (currentUser.verified) {
              const route = getState().routeParams.route || 'landing'
              const routeParams = getState().routeParams
              routeVerifiedUser(dispatch, route, routeParams)
            } else {
              if (currentUser) {
                if (
                  authData.emailVerified ||
                  ['facebook.com', 'twitter.com'].includes(currentUser.initialProvider)
                ) {
                  dispatch(actions.updateUser(userId, { verified: true, }))
                } else {
                  if (!currentUser.emailed) {
                    emailUnverifiedUser(dispatch, userId)
                  } else {
                    const routeParams = getState().routeParams
                    let route = routeParams.route || 'landing'
                    route = route === 'sign-in' ? 'landing' : route
                    routeVerifiedUser(dispatch, route, routeParams)
                  }
                }
              } else {
                signOutUnauthorizedUser(dispatch)
              }
            }
          }
        },
        N.USERS
      )
    }
  },
  startListeningToUsers: () => {
    return (dispatch, getState) => {
      firebaseService.subscribe(
        'users',
        (result) => {
          const users = result.val() || {}
          dispatch({
            type: A.SET_USERS,
            users
          })
        },
        N.USERS
      )
    }
  },
}
