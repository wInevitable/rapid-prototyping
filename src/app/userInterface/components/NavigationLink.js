import React, { Component, } from 'react'
import { modularScale, palette, } from 'theme/Theme'
import classNames from 'classnames'
import injectSheet from 'react-jss'

class NavigationLink extends Component {
  render() {
    const {
      borderBottom, children, classes, className, hover, onMouseEnter,
      onMouseLeave, path, routeTo, style, title, toggleDrawer,
    } = this.props

    return (
      <a
        className={classNames({
          [classes.borderBottom]: borderBottom,
          [classes.navigationLink]: true,
          [classes.hover]: hover,
          [className]: true,
        })}
        href="javascript:void(0)"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onTouchTap={() => {
          routeTo(path)
          toggleDrawer && toggleDrawer()
        }}
        rel="tooltip"
        title={title}
        style={style}
      >
        {children}
      </a>
    )
  }
}

const styles = {
  borderBottom: {
    borderBottom: '3px solid ' + palette.blue,
  },
  hover: {
    '&:hover': {
      backgroundColor: palette.blue,
      color: palette.whitePrimary,
    },
  },
  navigationLink: {
    color: palette.blue,
    cursor: 'pointer',
    display: 'block',
    height: modularScale.tripleBaseline,
    padding: modularScale.basePadding,
    paddingTop: '14px',
    textAlign: 'center',
    textDecoration: 'none',
    textShadow: 'none',
    width: '100%',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}

export default injectSheet(styles)(NavigationLink)
