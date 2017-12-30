import React from 'react'
import classNames from 'classnames'

// Font Awesome is designed to be used with inline elements
// We like the <i> tag for brevity, but using a <span> is more semantically correct.
// http://fontawesome.io/examples/
//
// If you change the font-size of the icon's container, the icon gets bigger.
// Same things goes for color, drop shadow, and anything else that gets inherited
// using CSS.
//
// If your icons are getting chopped off on top and bottom, make sure you have
// sufficient line-height.
//
// Some browsers on some platforms have issues with animated icons resulting in a
// jittery wobbling effect. See issue #671 for examples and possible workarounds.
//
// CSS3 animations aren't supported in IE8 - IE9.

const FontIcon = ({
  border = false,
  children,
  className,
  double = false,
  fixedWidth = false,
  flipHorizontal = false,
  flipVertical = false,
  inverse = false,
  large = false,
  listItem = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onTouchTap,
  pullLeft = false,
  pullRight = false,
  pulse = false,
  quadruple = false,
  quintuple = false,
  rotate90 = false,
  rotate180 = false,
  rotate270 = false,
  spin = false,
  stack1x = false,
  stack2x = false,
  style,
  triple = false,
}) => (
  <span
    className={classNames({
      [className + ' fa']: true,
      ['fa-2x']: double,
      ['fa-3x']: triple,
      ['fa-4x']: quadruple,
      ['fa-5x']: quintuple,
      ['fa-border']: border,
      ['fa-fw']: fixedWidth,
      ['fa-inverse']: inverse,
      ['fa-lg']: large, // 33% increase
      ['fa-li']: listItem, // use className 'fa-ul' on the parent <ul>
      ['fa-pull-left']: pullLeft,
      ['fa-pull-right']: pullRight,
      ['fa-pulse']: pulse,
      ['fa-rotate-90']: rotate90,
      ['fa-rotate-180']: rotate180,
      ['fa-rotate-270']: rotate270,
      ['fa-spin']: spin,
      ['fa-stack-1x']: stack1x, // use className 'fa-stack' on the parent
      ['fa-stack-2x']: stack2x, // use className 'fa-stack' on the parent
      ['fa-flip-horizontal']: flipHorizontal,
      ['fa-flip-vertical']: flipVertical,
    })}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onTouchTap={onTouchTap}
    style={style}
  >
    {children}
  </span>
)

export default FontIcon
