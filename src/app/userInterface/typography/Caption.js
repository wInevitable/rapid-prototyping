import React from 'react'
import { modularScale, } from 'theme/Theme'
import classNames from 'classnames'
import injectSheet from 'react-jss'

const Caption = (props) => {
  const { children, classes, className, onClick, onTouchTap, style } = props

  return (
    <small
      className={classNames({
        [className]: className,
        [classes.defaultStyles]: true,
      })}
      onClick={onClick}
      onTouchTap={onTouchTap}
      style={style}
    >
      {children}
    </small>
  )
}

const styles = {
  defaultStyles: {
    fontSize: modularScale.baseline,
  },
}

export default injectSheet(styles)(Caption)
