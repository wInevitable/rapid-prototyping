const DEFAULT_NAMESPACE = 'global/'

class FirebaseService {
  initialize(firebaseReference) {
    this.database = firebaseReference.database()
    this.firebase = firebaseReference
  }

  add(
    path,
    newItem,
    namespace = DEFAULT_NAMESPACE,
    index,
  ) {
    let itemToAdd = JSON.parse(JSON.stringify(newItem))
    itemToAdd.createdAt = this.firebase.database.ServerValue.TIMESTAMP
    itemToAdd.lastModifiedAt = this.firebase.database.ServerValue.TIMESTAMP
    let addedItem

    if (index) {
      addedItem = this.database.ref(namespace + path + index).set(itemToAdd)
    } else {
      addedItem = this.database.ref(namespace + path).push(itemToAdd).path.o.pop()
    }

    return addedItem
  }

  off(
    path,
    namespace = DEFAULT_NAMESPACE
  ) {
    this.database.ref(namespace + path).off()
  }

  once(
    path,
    namespace = DEFAULT_NAMESPACE
  ) {
    const value = this.database.ref(namespace + path).once('value').then((snapshot) => {
      return snapshot.val()
    })
    return value
  }

  remove(
    path,
    namespace = DEFAULT_NAMESPACE
  ) {
    return this.database.ref(namespace + path).remove()
  }

  subscribe(
    path,
    handler,
    namespace = DEFAULT_NAMESPACE
  ) {
    const ref = this.database.ref(namespace + path).orderByKey()
    ref.off()
    return ref.on('value', handler)
  }

  subscribeInOrder(
    path,
    field,
    handler,
    namespace = DEFAULT_NAMESPACE
  ) {
    const ref = this.database.ref(namespace + path).orderByChild(field)
    ref.off()
    return ref.on('value', handler)
  }

  subscribeByValue(
    path,
    field,
    id,
    handler,
    namespace = DEFAULT_NAMESPACE
  ) {
    const ref = this.database.ref(namespace + path).orderByChild(field).equalTo(id)
    ref.off()
    return ref.on('value', handler)
  }

  update(
    path,
    newState,
    handler,
    namespace = DEFAULT_NAMESPACE
  ) {
    newState.lastModifiedAt = this.firebase.database.ServerValue.TIMESTAMP
    return this.database.ref(namespace + path).update(newState, handler)
  }
}

const firebaseService = new FirebaseService()

export default firebaseService
