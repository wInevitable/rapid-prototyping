import React, { Component, } from 'react'
import { connect, } from 'react-redux'
import classNames from 'classnames'
import injectSheet from 'react-jss'
import staticStyles from 'shared/staticStyles'
import Title from 'typography/Title'

class LandingView extends Component {
  render() {
    const { classes, } = this.props

    return (
      <div
        className={classNames(
          classes.content,
          classes.landingContent
        )}
      >
        <Title>Welcome!</Title>
      </div>
    )
  }
}

const styles = {

}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(injectSheet(Object.assign({}, staticStyles, styles))(LandingView))
