import React from 'react'
import { Button, } from 'react-mdl'
import { fontFamily, modularScale, palette, } from 'theme/Theme'
import classNames from 'classnames'
import FontIcon from './FontIcon'
import injectSheet from 'react-jss'

const StyledButton = (props) => {
  const {
    action, authButton, authButtonIcon, classes, className, copy, disabled,
    fontIcon, iconClassName, imageClassName, imageContainerClassName,
    imageUrl, responsive, style,
  } = props

  return (
    <Button
      className={classNames({
        [classes.button]: true,
        [className]: className,
        [classes.responsiveButton]: responsive,
      })}
      disabled={disabled}
      onTouchTap={disabled ? null : action}
      primary
      raised
      ripple
      style={
        disabled ?
        {
          ...styles[authButton],
          ...styles.disabled,
          ...style
        } :
        {
          ...styles[authButton],
          ...style
        }
      }
    >
      {
        imageUrl ? (
          <i
            className={classNames(
              [classes.buttonIconContainer]: true,
              [imageContainerClassName]: imageContainerClassName,
            )}
          >
            <img
              className={classNames({
                [classes.buttonIcon]: true,
                [imageClassName]: imageClassName,
                [classes[authButtonIcon]]: authButtonIcon,
              })}
              src={imageUrl}
            />
          </i>
        ) : null
      }
      {
        fontIcon ? (
          <FontIcon
            className={classNames({
              [fontIcon]: fontIcon,
              [iconClassName]: iconClassName,
            })}
            fixedWidth
          />
        ) : null
      }
      {copy}
    </Button>
  )
}

const styles = {
  button: {
    '&:active': {
      backgroundColor: palette.grayLight,
    },
    borderRadius: modularScale.smallBorderRadius,
    display: 'block',
    fontFamily: fontFamily,
    margin: 'auto',
    marginBottom: modularScale.baseMargin,
    width: '280px',
    boxShadow:
      `0 4px 5px 0 rgba(0, 0, 0, 0.14),
      0 1px 10px 0 rgba(0, 0, 0, 0.12),
      0 2px 4px -1px rgba(0, 0, 0, 0.2)`,
  },
  buttonIcon: {
    height: '18px',
    position: 'relative',
    top: '-1px',
  },
  buttonIconContainer: {
    marginRight: '22px',
  },
  disabled: {
    backgroundColor: palette.grayLight,
    color: palette.blue,
  },
  facebookButton: {
    backgroundColor: palette.facebookBlue,
    color: palette.whitePrimary,
  },
  facebookButtonIcon: {
    left: '10px',
  },
  facebookButtonIconDisconnect: {
    left: 0,
  },
  fixedButton: {
    backgroundColor: palette.blue,
    color: palette.whitePrimary,
  },
  googleButton: {
    backgroundColor: palette.whiteSocialMedia,
    color: palette.blackPrimary,
  },
  twitterButton: {
    backgroundColor: palette.twitterBlue,
    color: palette.whitePrimary,
  },
  twitterButtonIcon: {
    left: '3px',
  },
  twitterButtonIconDisconnect: {
    left: '-7px',
  },
  '@media (max-width: 415px)': {
    responsiveButton: {
      width: modularScale.sixth,
    },
  },
  '@media (max-width: 380px)': {
    responsiveButton: {
      width: modularScale.fifthAndAHalf,
    },
  },
  '@media (max-width: 335px)': {
    responsiveButton: {
      width: modularScale.fifth,
    },
  },
}

export default injectSheet(styles)(StyledButton)
