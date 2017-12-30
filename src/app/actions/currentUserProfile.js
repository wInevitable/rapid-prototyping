import { defaultUserProfile, } from 'const/userProfiles'
import A from 'const/actionTypes'
import actions from '.'
import firebaseService from 'infrastructure/FirebaseService'
import N from 'const/namespace'
import store from 'store'

const markInitialDialogAsShown = () => {
  store.dispatch(actions.updateCurrentUserTour({ initialDialogShown: true, }))
}

const notifyNewUser = (dispatch, getState) => {
  dispatch(actions.showDialog({
    acceptCallback: () => {
      store.dispatch(actions.routeTo('landing'))
    },
    acceptCaption: 'Continue',
    content: 'Welcome to the Prototype!',
    fontIcon: 'fa-star',
    largeText: true,
    title: 'Welcome to the Prototype!',
  }))
  markInitialDialogAsShown()
}

export default {
  clearCurrentUserProfile: () => {
    return (dispatch, getState) => {
      dispatch({ type: A.CLEAR_CURRENT_USER_PROFILE, })
    }
  },
  createCurrentUserProfile: (userId) => {
    return (dispatch, getState) => {
      dispatch({
        type: A.CREATE_CURRENT_USER_PROFILE,
        defaultUserProfile,
      })
      firebaseService.add(
        'userProfiles/',
        defaultUserProfile,
        N.USERS,
        userId
      )
    }
  },
  deleteCurrentUserProfile: (userId) => {
    return (dispatch, getState) => {
      firebaseService.off('userProfiles/' + userId, N.USERS)
      dispatch({ type: A.DELETE_CURRENT_USER_PROFILE, })
    }
  },
  setCurrentUserProfile: (userId) => {
    return (dispatch, getState) => {
      firebaseService.subscribe(
        'userProfiles/' + userId,
        (result) => {
          const currentUserProfile = result.val() || defaultUserProfile
          dispatch({
            type: A.SET_CURRENT_USER_PROFILE,
            currentUserProfile
          })

          if (!currentUserProfile.tour.initialDialogShown) { // TODO add && verified
            notifyNewUser(dispatch, getState)
          }
        },
        N.USERS
      )
    }
  },
  updateCurrentUserProfile: (newCurrentUserProfile) => {
    return (dispatch, getState) => {
      let userId = getState().auth.uid
      let currentUserProfile = getState().currentUserProfile || defaultUserProfile
      let updatedCurrentUserProfile = Object.assign(
        {}, currentUserProfile, newCurrentUserProfile
      )

      dispatch({
        type: A.UPDATE_CURRENT_USER_PROFILE,
        updatedCurrentUserProfile,
      })

      firebaseService.update(
        'userProfiles/' + userId,
        updatedCurrentUserProfile,
        (error) => {
          if (error) { dispatch(actions.alertUserWithError(error)) }
        },
        N.USERS,
      )
    }
  },
  updateCurrentUserTour: (tourUpdate) => {
    return (dispatch, getState) => {
      const tour = getState().currentUserProfile.tour
      const updatedTour = Object.assign({}, tour, tourUpdate)
      dispatch(actions.updateCurrentUserProfile({ tour: updatedTour, }))
    }
  },
}
