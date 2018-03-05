import React from 'react'
import { connect } from 'react-redux'
import { startLogin } from '../actions/auth'

// why destructure from props? Is it in an object?
export const LoginPage = ({ startLogin }) => (
  <div>
    <button onClick={startLogin}>Login</button>
  </div>
)

// component doesn't need access to anything state
// related, so no mapStateToProps

// however, we are dispatching something: login
const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)
