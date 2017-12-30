import { publicRoutes, } from 'const/routes'
import { push, } from 'react-router-redux'
import A from 'const/actionTypes'
import actions from 'actions'
import P from 'const/paramTypes'

const encodeParams = (routeParams) => {
  let paramsString = ''
  Object.keys(routeParams).map((routeParamKey) => {
    if (routeParamKey !== 'route' && routeParams[routeParamKey]) {
      if (paramsString !== '') {
        paramsString += '&'
      }
      let paramKey = Object.keys(P).find((key) => { return P[key] === routeParamKey })
      paramsString += paramKey + '=' + routeParams[routeParamKey]
    }
  })
  return paramsString
}

export default {
  routeTo: (
    route,
    params
  ) => {
    return (dispatch, getState) => {
      const users = getState().users
      const userId = getState().auth.uid
      const user = users[userId]
      dispatch(actions.clearUserInterface())

      if (user) {
        if (route === 'sign-in') {
          route = 'simulator'
        }
        let path = '/' + route
        if (params) {
          path += '/' + encodeParams(params)
        }
        dispatch(push(path))
      } else {
        if (publicRoutes.includes(route)) {
          dispatch(push(route))
        } else {
          dispatch(push(''))
        }
      }
    }
  },
  updateRouteParams: (params) => {
    return (dispatch, getState) => {
      dispatch({
        type: A.UPDATE_ROUTE_PARAMS,
        params,
      })
      const routeParams = getState().routeParams
      let updatedParamsString = encodeParams(routeParams)
      const pathSegments = getState().routing.locationBeforeTransitions.pathname.split('/')
      if (pathSegments.length > 2) {
        pathSegments[2] = updatedParamsString
        dispatch(push(pathSegments.join('/')))
      }
    }
  },
}
