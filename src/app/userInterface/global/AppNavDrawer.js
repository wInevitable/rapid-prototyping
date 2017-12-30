import React, { Component, } from 'react'
import { modularScale, palette, } from 'theme/Theme'
import classNames from 'classnames'
import FontIcon from 'components/FontIcon'
import injectSheet from 'react-jss'
import navigation from 'const/navigation'
import NavigationLink from 'components/NavigationLink'
import Title from 'typography/Title'

class AppNavDrawer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes, generateHeapID, routeTo, toggleDrawer, } = this.props

    return (
      <div className={classes.drawer}>
        <ul className={classes.drawerList}>
        {
          Object.keys(navigation).map((path) => {
            const data = navigation[path]

            return (
              <li
                className={generateHeapID('appNavDrawer-' + path)}
                key={path}
              >
                <NavigationLink
                  borderBottom
                  className={classNames({
                    [classes.disabled]: data.disabled,
                    [classes.enabled]: !data.disabled,
                  })}
                  hover
                  path={path}
                  routeTo={routeTo}
                  title={data.tooltip}
                  toggleDrawer={toggleDrawer}
                >
                  <FontIcon
                    className={classNames({
                      [classes.drawerListItemIcon]: true,
                      [data.fontIconClass]: true,
                    })}
                    double
                    fixedWidth
                  />
                  <Title
                    className={classes.drawerListItemTitle}
                    noMargin
                  >
                    {data.text}
                  </Title>
                </NavigationLink>
              </li>
            )
          })
        }
        </ul>
      </div>
    )
  }
}

const styles = {
  disabled: {
    backgroundColor: palette.grayTransparent,
  },
  drawer: {
    color: palette.blue,
    height: '100%',
    marginTop: modularScale.pageMargin,
    position: 'fixed',
    width: '100%',
    'overflow-x': 'hidden',
    'overflow-y': 'scroll',
    '-webkit-overflow-scrolling': 'touch',
  },
  drawerList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    paddingBottom: modularScale.pageMargin,
  },
  drawerListItemIcon: {
    float: 'left',
    marginLeft: modularScale.titleMargin,
    marginRight: modularScale.titleMargin,
  },
  drawerListItemTitle: {
    float: 'left',
  },
  enabled: {
    backgroundColor: palette.whitePrimary,
  },
  '@media (min-width: 840px)': {
    drawer: {
      display: 'none',
    },
  },
}

export default injectSheet(styles)(AppNavDrawer)
