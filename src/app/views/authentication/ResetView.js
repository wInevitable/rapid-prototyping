import React, { Component, } from 'react'
import { Card, } from 'rmwc/Card'
import { connect, } from 'react-redux'
import actions from 'actions'
import classNames from 'classnames'
import heapService from 'infrastructure/HeapService'
import injectSheet from 'react-jss'
import Input from 'components/Input'
import staticStyles from 'shared/staticStyles'
import StyledButton from 'components/StyledButton'
import Title from 'typography/Title'

class ResetView extends Component {
  componentWillMount() {
    this.props.clearUserInterface()
  }

  constructor(props) {
    super(props)

    this.generateHeapID = this.generateHeapID.bind(this)
    this.onResetEmailChange = this.onResetEmailChange.bind(this)
  }

  generateHeapID(component) {
    return heapService.generateUniqueEventID({
      component: component,
      view: 'resetView',
    })
  }

  onResetEmailChange(event) {
    this.props.updateUserInterface({
      resetEmail: event.target.value,
    })
  }

  render() {
    const { classes, userInterface, } = this.props
    const generateHeapID = this.generateHeapID

    return (
      <div
        className={classNames(
          classes.content,
          classes.resetContent
        )}
      >
        <Card
          className={classes.card}
          shadow={1}
        >
          <div className={classes.error}>{userInterface.error}</div>
          <Title className={classes.title}>
            Locked Out? You May Reset Your Password
          </Title>
          <div className={classes.form}>
            <Input
              className={classNames(
                classes.textField,
                generateHeapID('resetEmailInput')
              )}
              error={userInterface.resetEmailError}
              id="reset-email"
              label="Email Address"
              labelClassName={classes.label}
              name="reset-email"
              onBlur={this.props.validateResetEmail}
              onChange={this.onResetEmailChange}
              type="text"
            />
          </div>
          <StyledButton
            action={this.props.resetPassword}
            authButton="fixedButton"
            className={generateHeapID('resetEmailButton')}
            copy="Reset My Password"
            disabled={!userInterface.isReadyToUpdateResetEmail}
            fontIcon="fa-unlock"
            iconClassName={classes.icon}
            responsive
          />
        </Card>
      </div>
    )
  }
}

const styles = {
  resetContent: {
    width: '50%',
  },
  '@media (max-width: 840px)': {
    resetContent: {
      width: '80%',
    },
  },
  '@media (max-width: 500px)': {
    resetContent: {
      width: '90%',
    },
  },
}

const mapStateToProps = (state) => {
  return {
    userInterface: state.userInterface,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearUserInterface: () => dispatch(actions.clearUserInterface()),
    resetPassword: () => dispatch(actions.resetPassword()),
    updateUserInterface: (update) => dispatch(actions.updateUserInterface(update)),
    validateResetEmail: () => dispatch(actions.validateResetEmail()),
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(injectSheet(Object.assign({}, staticStyles, styles))(ResetView))
