import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import 'react-redux'
import thunk from 'redux-thunk'
import expensesReducer from '../reducers/expenses'
import filtersReducer from '../reducers/filters'
import authReducer from '../reducers/auth'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
  // combine reducers to create complex state object
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer,
      auth: authReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  )

  // if (module.hot) {
  //   module.hot.accept('../reducers', () => {
  //     const nextRootReducer = require('../reducers')
  //     store.replaceReducer(nextRootReducer)
  //   })
  // }

  return store
}

// const store = createStore(
//   combineReducers({
//     expenses: expensesReducer,
//     filters: filtersReducer
//   })
// )

// if(module.hot) {
//   module.hot.acccept('./reducers/', () => {
//     const nextRootReducer = require('./reducers/index')
//   })
// }

// export default store
