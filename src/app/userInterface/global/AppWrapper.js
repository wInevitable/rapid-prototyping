import React, { Component, } from 'react'
import { Cell, Grid, Snackbar, } from 'react-mdl'
import { connect, } from 'react-redux'
import { fontFamily, modularScale, } from 'theme/Theme.js'
import actions from 'actions'
import AppDialog from './AppDialog'
import AppFooter from './AppFooter'
import AppHeader from './AppHeader'
import AppNavDrawer from './AppNavDrawer'
import classNames from 'classnames'
import coreStyles from 'css/styles.scss'
import heapService from 'infrastructure/HeapService'
import injectSheet from 'react-jss'

class AppWrapper extends Component {
  constructor() {
    super()

    this.state = {
      drawerOpen: false,
    }
    this.generateHeapID = this.generateHeapID.bind(this)
    this.routeTo = this.routeTo.bind(this)
    this.toggleDrawer = this.toggleDrawer.bind(this)
  }

  generateHeapID(component) {
    return heapService.generateUniqueEventID({
      component: component,
      view: 'appWrapper',
    })
  }

  routeTo(route) {
    this.props.routeTo(route)
  }

  toggleDrawer() {
    this.setState({ drawerOpen: !this.state.drawerOpen })
  }

  render() {
    const {
      appBar, auth, children, classes, currentUser, currentUserProfile, dialog,
      hideDialog, location, routeParams: { route, }, snackbar,
    } = this.props
    const generateHeapID = this.generateHeapID

    return (
      <div>
        <AppHeader
          appBar={appBar}
          auth={auth}
          generateHeapID={generateHeapID}
          location={location}
          route={route}
          routeTo={this.routeTo}
          toggleDrawer={this.toggleDrawer}
          username={currentUser.email}
        />
        <Grid noSpacing>
          <Cell col={12} phone={12} tablet={12}>
            {
              this.state.drawerOpen ? (
                <AppNavDrawer
                  generateHeapID={generateHeapID}
                  routeTo={this.routeTo}
                  toggleDrawer={this.toggleDrawer}
                />
              ) : null
            }
            <Snackbar
              action={snackbar.action || 'OK'}
              active={snackbar.active || false}
              className={classNames(
                classes.snackbar,
                generateHeapID('snackbar'),
              )}
              onActionClick={() => {
                this.props.hideSnackbar()
                if (snackbar.onActionClick) {
                  snackbar.onActionClick
                }
              }}
              onTimeout={() => {
                this.props.hideSnackbar()
                if (snackbar.onTimeout) {
                  snackbar.onTimeout
                }
              }}
              timeout={snackbar.timeout}
            >
              {snackbar.message || ' '}
            </Snackbar>
            {
              dialog.open ? (
                <AppDialog
                  currentUserProfile={currentUserProfile}
                  dialog={dialog}
                  generateHeapID={generateHeapID}
                  hideDialog={hideDialog}
                />
              ) : null
            }
            <div
              className={classNames({
                [classes.children]: route !== '',
                [classes.childrenDrawerOpen]: this.state.drawerOpen && auth.uid,
              })}
            >
              {children}
            </div>
          </Cell>
        </Grid>
        <AppFooter
          generateHeapID={generateHeapID}
          location={location}
          routeTo={this.routeTo}
        />
      </div>
    )
  }
}

const styles = {
  children: {
    marginTop: modularScale.pageMargin,
  },
  snackbar: {
    // backgroundColor: palette.blue,
    // border: `1px solid ${palette.blueShaded}`,
    borderBottom: 'none',
    fontFamily: fontFamily,
    width: modularScale.seventh,
  },
  '@media (max-width: 840px)': {
    childrenDrawerOpen: {
      display: 'none',
    },
  },
}

const mapDispatchToProps = {
  hideDialog: actions.hideDialog,
  hideSnackbar: actions.hideSnackbar,
  routeTo: actions.routeTo,
}

const mapStateToProps = (state) => {
  return {
    appBar: state.appBar,
    auth: state.auth,
    currentUser: state.currentUser,
    currentUserProfile: state.currentUserProfile,
    dialog: state.dialog,
    routeParams: state.routeParams,
    snackbar: state.snackbar,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(Object.assign({}, coreStyles, styles))(AppWrapper))
