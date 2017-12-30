import 'normalize.css'
import 'react-mdl/extra/material.css'
import 'react-mdl/extra/material.js'
import React from 'react'
import { browserHistory, Router, } from 'react-router'
import { Provider, } from 'react-redux'
import { render, } from 'react-dom'
import { syncHistoryWithStore, } from 'react-router-redux'
import './index.css'
import actions from 'actions'
import config from './config'
import firebase from 'firebase'
import firebaseService from 'infrastructure/FirebaseService'
import injectTapEventPlugin from 'react-tap-event-plugin'
import jss from 'jss'
import preset from 'jss-preset-default'
import raven from 'raven-js'
import Routes from './Routes'
import store from 'store'

const firebaseConfig = {
  apiKey: config.API_KEY,
  authDomain: config.PROJECT_ID + '.firebaseapp.com',
  databaseURL: 'https://' + config.PROJECT_ID + '.firebaseio.com',
  storageBucket: config.PROJECT_ID_FOR_BUCKET + '.appspot.com',
}
const history = syncHistoryWithStore(browserHistory, store)

firebase.initializeApp(firebaseConfig)
firebaseService.initialize(firebase)
jss.setup(preset())

function initApp() {
  if (config.HEAP_API_KEY) {
    // TODO - move to heapService
    let heap = window.heap || []
    window.heap = heap
    heap.load = function (e, t) {
      window.heap.appid = e
      window.heap.config = t = t || {}
      let r = t.forceSSL || document.location.protocol === 'https:'
      let a = document.createElement('script')
      a.type = 'text/javascript'
      a.async = !0
      a.src = (r ? 'https:' : 'http:') + '//cdn.heapanalytics.com/js/heap-' + e + '.js'
      let n = document.getElementsByTagName('script')[0]
      n.parentNode.insertBefore(a, n)
      for (
        let o = function (e) {
            return function () {
              heap.push([e].concat(Array.prototype.slice.call(arguments, 0)))
            }
          },
          p = [
            'addEventProperties',
            'addUserProperties',
            'clearEventProperties',
            'identify',
            'removeEventProperty',
            'setEventProperties',
            'track',
            'unsetEventProperty'
          ],
          c = 0;
        c < p.length;
        c++
      ) {heap[p[c]] = o(p[c])}
    }
    heap.load(config.HEAP_API_KEY)
    raven.config(config.SENTRY_API_KEY).install()
  }
  // use the startListeningToAuth action directly when not restricting emails via whitelist
  // store.dispatch(actions.startListeningToAuth())
  // use the action below if users need to be whitelisted by email
  store.dispatch(actions.startListeningToFirebase())
}

window.onload = function () {
  initApp()
}

window.onunload = function () {
  window.heap.track('Page Unload')
}

injectTapEventPlugin()

render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
      {Routes}
    </Router>
  </Provider>,
  document.getElementById('app')
)
