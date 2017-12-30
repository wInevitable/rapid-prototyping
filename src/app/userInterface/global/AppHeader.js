import React, { Component, } from 'react'
import {
  Cell, Grid,
} from 'react-mdl'
import {
  fontFamily, modularScale, palette, secondaryFontFamily, zIndex,
} from 'theme/Theme'
import { publicRoutes, } from 'const/routes'
import classNames from 'classnames'
import FontIcon from 'components/FontIcon'
import injectSheet from 'react-jss'
import Title from 'typography/Title'

class AppHeader extends Component {
  render() {
    const {
      auth, classes, generateHeapID, route, routeTo, toggleDrawer, username,
    } = this.props
    const expandedUsername = !auth.uid && publicRoutes.includes(route)

    return (
      <Grid
        className={classNames(
          classes.header,
          'header'
        )}
        noSpacing
        shadow={2}
      >
        <Cell
          hideDesktop
          col={1}
        >
          <div
            className={classNames(
              classes.drawerIcon,
              generateHeapID('appHeader-drawerIcon'),
              classes.headerIcon
            )}
          >
            <FontIcon
              className="fa-bars"
              double
              fixedWidth
              onTouchTap={toggleDrawer}
            />
          </div>
        </Cell>
        <Cell
          col={8}
          phone={3}
          tablet={4}
        >
          <Title
            className={classNames(
              classes.appHeaderTitle,
              generateHeapID('appHeader-title'),
              classes.titleMargin
            )}
            onTouchTap={() => routeTo('landing')}
          >
            wInevitable Rapid Prototyping!
          </Title>
        </Cell>
        <Cell
          col={4}
          hidePhone
          tablet={expandedUsername ? 4 : 3}
        >
          <div
            className={classNames({
              [classes.hideUsername]: !expandedUsername,
              [classes.username]: true,
              [generateHeapID('appHeader-username')]: true,
            })}
          >
            <span
              className={username ? classes.usernameLink : ''}
              onTouchTap={() => { routeTo('landing') }}
            >
              {username || 'Good Luck, Have Fun...'}
            </span>
          </div>
        </Cell>
      </Grid>
    )
  }
}

const styles = {
  appHeaderTitle: {
    cursor: 'pointer',
    float: 'left',
    marginBottom: 0,
    marginLeft: modularScale.headerMargin,
    marginTop: '28.5px',
  },
  drawerIcon: {
    marginTop: '20px !important',
  },
  header: {
    backgroundColor: palette.blue,
    borderBottomLeftRadius: modularScale.largeBorderRadius,
    borderBottomRightRadius: modularScale.largeBorderRadius,
    color: palette.whitePrimary,
    height: '88px',
    left: 0,
    margin: '0 auto',
    position: 'fixed',
    right: 0,
    zIndex: zIndex.header,
  },
  headerIcon: {
    cursor: 'pointer',
    display: 'none',
    float: 'left',
    fontSize: modularScale.first,
    marginBottom: 0,
    marginRight: modularScale.titleMargin,
    marginTop: '18px',
  },
  homeIcon: {
    marginLeft: modularScale.doubleBaseline,
  },
  listItemContent: {
    fontFamily: fontFamily,
  },
  username: {
    fontFamily: secondaryFontFamily,
    marginRight: modularScale.headerMargin,
    marginTop: '32.5px',
    textAlign: 'right',
  },
  usernameLink: {
    cursor: 'pointer',
  },
  '@media (max-width: 1211px)': {
    homeIcon: {
      display: 'block',
    },
    simulatorTitle: {
      display: 'none',
    },
  },
  '@media (max-width: 840px)': {
    drawerIcon: {
      display: 'block',
      marginLeft: modularScale.baseline,
    },
    header: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      margin: '0',
      width: '100%',
    },
    homeIcon: {
      marginLeft: modularScale.tripleBaseline,
    },
    titleMargin: {
      marginLeft: 0,
    },
  },
  '@media (max-width: 839px)': {
    homeIcon: {
      marginLeft: 0,
    },
  },
  '@media (max-width: 700px)': {
    homeIcon: {
      display: 'none',
    },
    hideUsername: {
      display: 'none',
    },
  },
  '@media (max-width: 650px)': {
    homeIcon: {
      marginLeft: modularScale.baseline
    },
    titleMargin: {
      marginLeft: modularScale.baseline
    },
  },
}

export default injectSheet(styles)(AppHeader)
