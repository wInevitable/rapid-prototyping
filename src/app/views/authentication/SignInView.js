import React, { Component, } from 'react'
import { connect, } from 'react-redux'
import {
  Card, CardActions, CardText, Cell, Grid, Tab, Tabs,
} from 'react-mdl'
import { modularScale, palette, } from 'theme/Theme'
import actions from 'actions'
import classNames from 'classnames'
import StyledButton from 'components/StyledButton'
import heapService from 'infrastructure/HeapService'
import injectSheet from 'react-jss'
import Input from 'components/Input'
import staticStyles from 'shared/staticStyles'
import Subheader from 'typography/Subheader'

class SignInView extends Component {
  componentWillMount() {
    this.props.clearUserInterface()
  }

  constructor(props, context) {
    super(props, context)

    this.generateHeapID = this.generateHeapID.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handlePasswordAndEmailReset = this.handlePasswordAndEmailReset.bind(this)
    this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this)
    this.onEmailChange = this.onEmailChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.selectTab = this.selectTab.bind(this)
    this.signIn = this.signIn.bind(this)
    this.signUp = this.signUp.bind(this)
  }

  generateHeapID(component) {
    return heapService.generateUniqueEventID({
      component: component,
      view: 'signInView',
    })
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      let userInterface = this.props.userInterface
      if (userInterface.activeTab === 1 && userInterface.isReadyToSignUp) {
        this.signUp()
      } else if (userInterface.activeTab === 0 && userInterface.isReadyToSignIn) {
        this.signIn()
      }
    }
  }

  handlePasswordAndEmailReset() {
    this.props.routeTo('reset')
  }

  onConfirmPasswordChange(event) {
    this.props.updateUserInterface({
      confirmPassword: event.target.value,
    })
  }

  onEmailChange(event) {
    this.props.updateUserInterface({
      email: event.target.value,
    })
  }

  onPasswordChange(event) {
    this.props.updateUserInterface({
      password: event.target.value,
    })
  }

  selectTab(tabId) {
    this.props.updateUserInterface({
      activeTab: tabId,
    })
  }

  signIn() {
    this.props.signIn()
  }

  signUp() {
    this.props.signUp()
  }

  render() {
    const {
      auth, classes, userInterface, userInterface: { activeTab, },
    } = this.props
    const error = userInterface.error || auth.error ? 'Those Credentials Are Not Recognized.' : null
    const generateHeapID = this.generateHeapID
    const signingUp = userInterface.activeTab === 1

    return (
      <Grid
        className={classNames({
          [classes.content]: true,
          [classes.signInGrid]: true,
        })}
        noSpacing
      >
        <Cell
          col={12}
          className={classes.signInColumn}
          phone={12}
          tablet={12}
        >
          <Tabs
            activeTab={userInterface ? activeTab : 1}
            className={classes.tabs}
            onChange={(tabId) => this.selectTab(tabId)}
            ripple
          >
            <Tab
              className={classNames({
                [classes.activeTab]: !signingUp,
                [classes.tab]: true,
                [generateHeapID('signInTab')]: true,
              })}
            >
              Sign In
            </Tab>
            <Tab
              className={classNames({
                [classes.activeTab]: signingUp,
                [classes.tab]: true,
                [generateHeapID('createAccountTab')]: true,
              })}
            >
              Create Account
            </Tab>
          </Tabs>
          <Card
            className={classNames({
              [classes.signInCard]: true,
              [classes.borderTopLeftRadius]: signingUp,
              [classes.borderTopRightRadius]: !signingUp,
            })}
            shadow={1}
          >
            <CardText className={classes.cardText}>
              {
                signingUp ? (
                  <Subheader className={classes.signInSubheader}>
                    It's Fast And Free To Register
                  </Subheader>
                ) : null
              }
              <Input
                className={generateHeapID('emailInput')}
                error={userInterface.emailError}
                id="email"
                label="Email Address"
                labelClassName={classes.label}
                name="email"
                onBlur={this.props.validateEmail}
                onChange={this.onEmailChange}
                onKeyPress={this.handleKeyPress}
                type="text"
                wrapperStyles={staticStyles.doubleBaselineMarginTop}
              />
              <Input
                className={generateHeapID('passwordInput')}
                error={userInterface.passwordError}
                id="password"
                label="Password"
                labelClassName={classes.label}
                name="password"
                onChange={this.onPasswordChange}
                onKeyPress={this.handleKeyPress}
                type="password"
              />
              {
                signingUp ? (
                  <Input
                    className={generateHeapID('confirmPasswordInput')}
                    error={userInterface.confirmPasswordError}
                    id="confirm-password"
                    label="Confirm Password"
                    labelClassName={classes.label}
                    name="confirm-password"
                    onChange={this.onConfirmPasswordChange}
                    onKeyPress={this.handleKeyPress}
                    type="password"
                  />
                ) : null
              }
            </CardText>
            <CardActions className={classes.cardActions}>
            {
              signingUp ? (
                <StyledButton
                  action={this.signUp}
                  authButton="fixedButton"
                  className={classNames(
                    classes.signInButton,
                    generateHeapID('signUpButton')
                  )}
                  copy="Create Account"
                  disabled={!userInterface.isReadyToSignUp}
                />
              ) : (
                <StyledButton
                  action={this.signIn}
                  authButton="fixedButton"
                  className={classNames(
                    classes.signInButton,
                    generateHeapID('signInButton')
                  )}
                  copy="Sign In"
                  disabled={!userInterface.isReadyToSignIn}
                />
              )
            }
            </CardActions>
          </Card>
          <div
            className={classNames(
              classes.error,
              classes.signInError
            )}
          >
            {error}
          </div>
          {
            auth.error ? (
              <StyledButton
                action={this.handlePasswordAndEmailReset}
                authButton="fixedButton"
                className={generateHeapID('resetButton')}
                copy="Help Access My Account"
                fontIcon="fa-medkit"
                iconClassName={classes.icon}
                style={styles.helpButton}
              />
            ) : null
          }
          <Subheader className={classes.signInSubheader}>
            Continue With Social Media:
          </Subheader>
          <StyledButton
            action={this.props.signInWithGoogle}
            authButton="googleButton"
            className={generateHeapID('googleOAuthButton')}
            copy="Continue with Google"
            imageUrl="/images/google-social-icon.svg"
          />
          <StyledButton
            action={this.props.signInWithFacebook}
            authButton="facebookButton"
            authButtonIcon="facebookButtonIcon"
            className={generateHeapID('facebookOAuthButton')}
            copy="Continue with Facebook"
            imageUrl="/images/facebook-social-icon-transparent.png"
          />
          <StyledButton
            action={this.props.signInWithTwitter}
            authButton="twitterButton"
            authButtonIcon="twitterButtonIcon"
            className={generateHeapID('twitterOAuthButton')}
            copy="Continue with Twitter"
            imageUrl="/images/twitter-social-icon-white.svg"
          />
          <Subheader className={classes.signInSubheader}>
            <div>You Can Delete Your Account At Any Time</div>
            <div>We'll Never Post Without Your Permission</div>
          </Subheader>
        </Cell>
      </Grid>
    )
  }
}

const styles = {
  activeTab: {
    backgroundColor: `${palette.blue} !important`,
    color: `${palette.whitePrimary} !important`,
  },
  borderTopLeftRadius: {
    borderTopLeftRadius: modularScale.largeBorderRadius,
  },
  borderTopRightRadius: {
    borderTopRightRadius: modularScale.largeBorderRadius,
  },
  cardActions: {
    padding: modularScale.baseline,
  },
  cardText: {
    margin: '0 auto',
    padding: modularScale.baseline,
  },
  helpButton: {
    marginTop: modularScale.baseline,
  },
  signInCard: {
    borderBottomLeftRadius: modularScale.largeBorderRadius,
    borderBottomRightRadius: modularScale.largeBorderRadius,
    margin: '-7px auto 0',
    width: modularScale.seventh,
  },
  signInColumn: {
    marginLeft: 'auto !important',
    marginRight: 'auto !important',
    marginTop: 'calc(55px + 187 * ((100vh - 800px) / 538)) !important',
  },
  signInError: {
    margin: `${modularScale.doubleBaseline} 0`,
  },
  signInGrid: {
    display: 'flex',
    marginTop: '121px',
  },
  signInSubheader: {
    margin: `${modularScale.doubleBaseline} auto`,
  },
  tab: {
    borderTopLeftRadius: modularScale.largeBorderRadius,
    borderTopRightRadius: modularScale.largeBorderRadius,
    height: modularScale.quadrupleBaseline,
    width: '50%',
  },
  tabs: {
    margin: '0 auto',
    width: modularScale.seventh,
  },
  '@media (max-width: 1000px)': {
    signInCard: {
      width: modularScale.sixthAndAHalf,
    },
    tabs: {
      width: modularScale.sixthAndAHalf,
    },
  },
  '@media (max-width: 840px)': {
    signInCard: {
      width: modularScale.seventh,
    },
    tabs: {
      width: modularScale.seventh,
    },
  },
  '@media (max-width: 660px)': {
    signInCard: {
      width: modularScale.sixthAndAHalf,
    },
    tabs: {
      width: modularScale.sixthAndAHalf,
    },
  },
  '@media (max-width: 530px)': {
    signInButton: {
      width: modularScale.sixth,
    },
    signInCard: {
      width: '100%',
    },
    signInGrid: {
      width: '90%',
    },
    tabs: {
      width: '100%',
    },
  },
  '@media (max-width: 415px)': {
    signInGrid: {
      width: '100%',
    },
  },
  '@media (max-width: 360px)': {
    signInGrid: {
      marginTop: modularScale.tredecupleBaseline,
    },
  },
  '@media (max-height: 600px)': {
    signInColumn: {
      marginTop: '0px !important',
    },
  },
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    userInterface: state.userInterface,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearUserInterface: () => dispatch(actions.clearUserInterface()),
    signIn: () => dispatch(actions.signIn()),
    signInWithFacebook: () => dispatch(actions.signInWithFacebook()),
    signInWithGoogle: () => dispatch(actions.signInWithGoogle()),
    signInWithTwitter: () => dispatch(actions.signInWithTwitter()),
    routeTo: (route, params) => dispatch(actions.routeTo(route, params)),
    signUp: () => dispatch(actions.signUp()),
    updateUserInterface: (update) => dispatch(actions.updateUserInterface(update)),
    validateEmail: () => dispatch(actions.validateEmail()),
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(injectSheet(Object.assign({}, staticStyles, styles))(SignInView))
