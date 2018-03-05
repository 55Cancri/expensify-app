import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Header from '../components/Header.jsx'

// export const PrivateRoute = props => <Route {...props} />

// destructure props instead
export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  // conditional logic. load route if logged in,
  // redirect to login if not
  <Route
    {...rest}
    component={props =>
      isAuthenticated ? (
        <div>
          <Header />
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
)

// grab whether user is logged in from state
const mapStateToProps = state => ({
  // uid is currently a string, convert to boolean
  isAuthenticated: !!state.auth.uid
})

export default connect(mapStateToProps)(PrivateRoute)
