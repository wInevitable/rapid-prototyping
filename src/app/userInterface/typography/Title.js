import React from 'react'
import { modularScale, palette, } from 'theme/Theme'
import classNames from 'classnames'
import injectSheet from 'react-jss'

const Title = ({
  children,
  classes,
  className,
  id,
  noMargin,
  onClick,
  onTouchTap,
  styles,
}) => (
  <h3
    className={classNames({
      [classes.defaultStyles]: true,
      [className]: className,
    })}
    id={id ? id : ''}
    onClick={onClick}
    onTouchTap={onTouchTap}
    style={Object.assign({}, noMargin && noMarginStyles, styles)}
  >
    {children}
  </h3>
)

const noMarginStyles = {
  margin: 0,
}

const defaultStyles = {
  defaultStyles: {
    fontSize: '23px',
    fontWeight: palette.fontWeightStrong,
    lineHeight: '32px',
    margin: 'auto',
    marginBottom: modularScale.titleMargin,
    marginTop: modularScale.titleMargin,
  },
}

export default injectSheet(
  Object.assign({}, defaultStyles)
)(Title)
