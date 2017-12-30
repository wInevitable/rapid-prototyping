import React from 'react'
import { modularScale, } from 'theme/Theme'
import classNames from 'classnames'
import injectSheet from 'react-jss'

const Subheading = ({ children, classes, className, id, style }) => (
  <h4
    className={classNames({
      [classes.defaultStyles]: true,
      [className]: className,
    })}
    id={id ? id : ''}
    style={style}
  >
    {children}
  </h4>
)

const styles = {
  defaultStyles: {
    marginBottom: modularScale.doubleBaseline,
    marginTop: modularScale.doubleBaseline,
  },
}

export default injectSheet(styles)(Subheading)
