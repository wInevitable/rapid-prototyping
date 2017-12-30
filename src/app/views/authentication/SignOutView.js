import { Component, } from 'react'
import { connect, } from 'react-redux'
import actions from 'actions'

class SignOutView extends Component {
  componentWillMount() {
    this.props.signOut()
  }

  render() {
    return null
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(actions.signOut()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignOutView)
