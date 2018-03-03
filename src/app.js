import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'normalize.css/normalize.css'
import './styles/styles.sass'
import 'react-dates/lib/css/_datepicker.css'

import AppRouter from './routers/AppRouters.jsx'
import configureStore from './store/configureStore'
// import store from './store/configureStore'
import { addExpense } from './actions/expenses'
import { setTextFilter } from './actions/filters'
import getVisibleExpenses from './selectors/expenses'

// store gets value as return value of function
const store = configureStore()
console.log('testing')
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'))

if (module.hot) {
  module.hot.accept()
}
// module.hot.accept('./reducers/expenses', () => {
//   const nextRootReducer = require('./reducers/filters')
//   store.replaceReducer(nextRootReducer)
// })
// }
