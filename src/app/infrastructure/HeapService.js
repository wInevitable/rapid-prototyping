class HeapService {
  initialize() {
    // TODO ...
  }

  generateUniqueEventID({
    component,
    view,
  }) {
    return `event-${view}-${component}`
  }
}

const heapService = new HeapService()

export default heapService
