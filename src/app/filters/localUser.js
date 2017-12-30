const localUser = () => {
  let hasLocalStorageUser = false
  for (let key in localStorage) {
    if (key.startsWith('firebase:authUser:')) {
      hasLocalStorageUser = true
    }
  }
  return hasLocalStorageUser
}

export { localUser, }
