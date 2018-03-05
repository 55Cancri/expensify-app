import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'normalize.css/normalize.css'
import './styles/styles.sass'
import 'react-dates/lib/css/_datepicker.css'

import AppRouter, { history } from './routers/AppRouters.jsx'
import configureStore from './store/configureStore'
// import store from './store/configureStore'
import { startSetExpenses } from './actions/expenses'
import { login, logout } from './actions/auth'
import getVisibleExpenses from './selectors/expenses'
import { firebase } from './firebase/firebase'
// import './playground/promises'

// store gets value as return value of function
const store = configureStore()
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

let hasRendered = false
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'))
    hasRendered = true
  } else {
  }
}

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'))

// runs on user state change
// because we have custom history, we can now use history.push()
// to go between pages
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(login(user.uid))
    store.dispatch(startSetExpenses()).then(() => {
      renderApp()
      if (history.location.pathname === '/') {
        history.push('/dashboard')
      }
    })
  } else {
    store.dispatch(logout())
    renderApp()
    history.push('/')
  }
})

if (module.hot) {
  module.hot.accept()
}
// module.hot.accept('./reducers/expenses', () => {
//   const nextRootReducer = require('./reducers/filters')
//   store.replaceReducer(nextRootReducer)
// })
// }
