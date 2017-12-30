import React from 'react'
import { IndexRoute, Route, } from 'react-router'

const Routes = (
  <Route
    path="/"
    getComponent={(location, callback) => {
      require.ensure([], require => {
        let AppWrapper = require('./userInterface/global/AppWrapper.js').default
        callback(null, AppWrapper)
      }, 'AppWrapper')
    }}
  >
    <IndexRoute
      getComponent={(location, callback) => {
        require.ensure([], require => {
          let LandingView = require('./views/users/LandingView.js').default
          callback(null, LandingView)
        }, 'LandingView')
      }}
    />
    <Route
      path="/sign-in"
      getComponent={(location, callback) => {
        require.ensure([], require => {
          let SignInView = require('./views/authentication/SignInView.js').default
          callback(null, SignInView)
        }, 'SignInView')
      }}
    />
    <Route
      path="/sign-out"
      getComponent={(location, callback) => {
        require.ensure([], require => {
          let SignOutView = require('./views/authentication/SignOutView.js').default
          callback(null, SignOutView)
        }, 'SignOutView')
      }}
    />
    <Route
      path="*"
      getComponent={(location, callback) => {
        require.ensure([], require => {
          let LandingView = require('./views/users/LandingView.js').default
          callback(null, LandingView)
        }, 'LandingView')
      }}
    />
  </Route>
)

export default Routes
