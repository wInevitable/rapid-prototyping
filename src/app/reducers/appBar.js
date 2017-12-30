import A from 'const/actionTypes'
import initialState from 'store/initialState'
import routeTitles from 'const/routeTitles'
import store from '../store'

export default (currentState, action) => {
  switch (action.type) {
    case A.LOCATION_CHANGE:
      const pathname = action.payload.pathname
      const routeName = pathname.split('/')[1]
      let title = routeTitles[routeName]
      if (title && title.charAt(0) === '_') {
        const titleSegments = title.split('_')
        title = store.getState()[titleSegments[1]][titleSegments[2]]
      }
      return {
        title,
      }
    default:
      return currentState || initialState.appBar
  }
}
