import { createStore, combineReducers } from 'redux'
import expensesReducer from '../reducers/expenses'
import filtersReducer from '../reducers/filters'

export default () => {
  // combine reducers to create complex state object
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

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
