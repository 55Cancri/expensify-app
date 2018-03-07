import React from 'react'
import { connect } from 'react-redux'
import { startLogin } from '../actions/auth'

// why destructure from props? Is it in an object?
export const LoginPage = ({ startLogin }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Expensify</h1>
      <p>It's time to get your expenses under control.</p>
      <button className="button" onClick={startLogin}>
        Login with Google
      </button>
    </div>
  </div>
)

// component doesn't need access to anything state
// related, so no mapStateToProps

// however, we are dispatching something: login
const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)
