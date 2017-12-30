import A from 'const/actionTypes'

export default (currentState, action) => {
  let updatedState = Object.assign({}, currentState)

  switch (action.type) {
    case A.INDEX_CACHE:
      updatedState[action.cachedType] = Object.assign({}, updatedState[action.cachedType])
      updatedState[action.cachedType][action.id] = true
  }

  return updatedState
}
