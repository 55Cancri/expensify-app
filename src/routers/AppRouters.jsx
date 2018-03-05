import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

import LoginPage from '../components/LoginPage.jsx'
import ExpenseDashboardPage from '../components/ExpenseDashboardPage.jsx'
import AddExpensePage from '../components/AddExpensePage.jsx'
import EditExpensePage from '../components/EditExpensePage.jsx'
import HelpPage from '../components/HelpPage.jsx'
import NotFoundPage from '../components/NotFoundPage.jsx'
import PrivateRoute from './PrivateRoute.jsx'

// Browser router has its own history that it passes to props
// this is our own history that we can extend to handle login and logout
export const history = createHistory()

// we pass down our own custom history to router instead of
// using browserRouters default history
const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <PrivateRoute
          exact
          path="/dashboard"
          component={ExpenseDashboardPage}
        />
        <PrivateRoute path="/create" component={AddExpensePage} />
        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
)

export default AppRouter
