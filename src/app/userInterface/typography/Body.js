import React from 'react'

const Body = ({ children, className, style }) => (
  <p
    className={className}
    style={Object.assign({}, defaultStyles, style)}
  >
    {children}
  </p>
)

const defaultStyles = {
}

export default Body
