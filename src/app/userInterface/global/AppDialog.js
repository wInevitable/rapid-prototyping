import React, { Component, } from 'react'
import { Button, Card, CardActions, CardText, CardTitle, } from 'react-mdl'
import { modularScale, palette, secondaryFontFamily, zIndex, } from 'theme/Theme'
import classNames from 'classnames'
import injectSheet from 'react-jss'
import FontIcon from 'components/FontIcon'
import staticStyles from 'shared/staticStyles'
import Title from 'typography/Title'

class AppDialog extends Component {
  constructor(props) {
    super(props)

    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown(event) {
    if (event.key === 'Escape') {
      this.props.hideDialog()
    }
  }

  render() {
    const { classes, dialog, generateHeapID, hideDialog, } = this.props

    return (
      <div className={classes.dialog}>
        <Card
          className={classNames({
            [classes.dialogCard]: true,
            [classes.extendedDialogCard]: dialog.fontIcon,
          })}
          shadow={5}
        >
          <CardTitle className={classes.cardTitle}>
            <Title
              className={classes.dialogTitle}
              noMargin
            >
              {dialog.title}
            </Title>
            <Button
              className={classNames(
                classes.closeButton,
                generateHeapID('appDialog-topRightDialogRejectButton')
              )}
              onTouchTap={(event) => {
                event.preventDefault()
                hideDialog()
              }}
            >
              X
            </Button>
          </CardTitle>
          <div>
            <CardText
              className={classNames({
                [classes.achievementContent]: dialog.fontIcon,
                [classes.dialogContent]: true,
                [classes.largeText]: dialog.largeText,
              })}
              style={dialog.contentStyles}
            >
              {
                dialog.fontIcon ? (
                  <div
                    className={classNames(
                      classes.fontIconWrapper,
                      classes.dialogFontIconWrapper,
                    )}
                  >
                    <FontIcon
                      className={classNames({
                        [dialog.fontIcon]: true,
                        [classes.dialogIcon]: true,
                      })}
                      fixedWidth
                      quintuple
                    />
                  </div>
                ) : null
              }
            </CardText>
            <CardActions
              border
              className={classes.cardActions}
            >
              <Button
                className={classNames({
                  [classes.acceptAction]: dialog.acceptActionClass,
                  [classes.dialogAction]: true,
                  [generateHeapID('appDialog-acceptCallback')]: true,
                })}
                onTouchTap={() => {
                  hideDialog()
                  if (dialog.acceptCallback) {
                    dialog.acceptCallback()
                  }
                }}
              >
                {dialog.acceptCaption}
              </Button>
              {
                dialog.rejectCaption ? (
                  <Button
                    className={classNames(
                      classes.dialogAction,
                      generateHeapID('appDialog-rejectCallback')
                    )}
                    onTouchTap={() => {
                      hideDialog()
                      if (dialog.rejectCallback) {
                        dialog.rejectCallback()
                      }
                    }}
                  >
                    {dialog.rejectCaption}
                  </Button>
                ) : null
              }
              {
                dialog.tertiaryCaption ? (
                  <Button
                    className={classNames(
                      classes.dialogAction,
                      generateHeapID('appDialog-tertiaryCallback')
                    )}
                    onTouchTap={() => {
                      hideDialog()
                      if (dialog.tertiaryCallback) {
                        dialog.tertiaryCallback()
                      }
                    }}
                  >
                    {dialog.tertiaryCaption}
                  </Button>
                ) : null
              }
            </CardActions>
          </div>
        </Card>
      </div>
    )
  }
}

const styles = {
  acceptAction: {
    color: palette.red,
  },
  achievementContent: {
    marginBottom: modularScale.doubleBaseline,
    textAlign: 'center',
  },
  cardActions: {
    display: 'flex',
    height: modularScale.quintupleBaseline,
    padding: modularScale.baseline,
  },
  cardTitle: {
    padding: `${modularScale.doubleBaseline} ${modularScale.doubleBaseline} 0`,
  },
  closeButton: {
    minWidth: modularScale.baseline,
    padding: 0,
    position: 'absolute',
    right: modularScale.baseline,
    top: 0,
    width: modularScale.baseline,
  },
  dialog: {
    backgroundColor: palette.grayTransparent,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    left: 0,
    position: 'fixed',
    top: 0,
    width: '100vw',
    zIndex: zIndex.dialog,
  },
  dialogAction: {
    flexBasis: '33%',
    float: 'right',
    height: modularScale.tripleBaseline,
    padding: 0,
  },
  dialogCard: {
    height: modularScale.sixth,
    margin: 'auto',
    width: modularScale.seventh,
    zIndex: zIndex.dialog,
  },
  dialogContent: {
    boxSizing: 'content-box',
    color: palette.blackPrimary,
    fontSize: modularScale.base,
    padding: modularScale.doubleBaseline,
    width: '362px',
  },
  dialogFontIconWrapper: {
    marginBottom: modularScale.tripleBaseline,
    marginTop: modularScale.doubleBaseline,
  },
  dialogIcon: {
    marginTop: '20px',
  },
  dialogTitle: {
    margin: '0px auto !important',
    paddingTop: modularScale.tripleBaseline,
    textAlign: 'center',
  },
  extendedDialogCard: {
    height: modularScale.seventh,
  },
  largeText: {
    fontFamily: secondaryFontFamily,
  },
  '@media (max-width: 415px)': {
    dialogCard: {
      width: '100vw',
    },
    dialogContent: {
      width: '90vw',
    },
  },
}

export default injectSheet(
  Object.assign({}, staticStyles, styles)
)(AppDialog)
