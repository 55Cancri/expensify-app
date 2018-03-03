import { createStore, combineReducers } from 'redux'
import uuid from 'uuid'

// these are you actions, found in src/actions/ *.js

// ADD_EXPENSE
const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0
} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
})

// REMOVE_EXPENSE
const removeExpense = ({ id }) => ({
  type: 'REMOVE_EXPENSE',
  id
})

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
})
// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE'
})

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
})

// SET_START_DATE
const setStartDate = startDate => ({
  type: 'SET_START_DATE',
  startDate
})

// SET_END_DATE
const setEndDate = endDate => ({
  type: 'SET_END_DATE',
  endDate
})

// these are you reducers, found in src/reducers/ *.js

// expenses reducer default state
const expensesReducerDefaultState = []

// expenses reducer
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense]
    case 'REMOVE_EXPENSE':
      // return [...state].filter((item, i) => item.id !== action.id)
      return state.filter(({ id }) => id !== action.id)
    case 'EDIT_EXPENSE':
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          }
        } else {
          return expense // if not identical, go on
        }
      })
    default:
      return state
  }
}

// filters reducer default state
const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
}

// filters reducer
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      }
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      }
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      }
    default:
      return state
  }
}

// this is your store, found in src/store/ *.js

// combine reducers to create complex state object
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
)

// this is your selector, found in src/selectors/ *.js
// currently used in store subscription to log output with refined data
// the selector is called with state.expenses & state.filters as parameters
// it filters first parameter (expenses) by the second parameter (filters)

// get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  // goes through every expense and matches based on conditions defined next
  return expenses
    .filter(expense => {
      // startDate and endDate are undefined by default. They ui entries
      // they dont equal a number, so they return true
      // the second condition handles if they are a number. createdAt is 0
      /*
        suppose user selects April 16 as startDate. startDate is now a number, so that condition is now false. However, this is an OR, not an AND, so both conditions do not need to be true, just one, and startDate will be true. Expenses created after the startDate return true, making startDate true.
        
        same with endDate. If user does not select an endDate, both conditions will be false and this expense will be filtered out in new array. However, if an endDate is selected, it is now a number, so the first condition will be false. However, the second condition can still be true, allowing this particular expense to be true and get added into the new array. Only a simple return value of true or false is needed to determine if expense will be in new array. 
      */

      const startDateMatch =
        typeof startDate !== 'number' || expense.createdAt >= startDate
      const endDateMatch =
        typeof endDate !== 'number' || expense.createdAt <= endDate
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase())

      return startDateMatch && endDateMatch && textMatch
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1
      }
      if (sortBy === 'amount') {
        return a.amount < b.amount ? 1 : -1
      }
    })
}

// this is where you set up listeners for state changes

store.subscribe(() => {
  const state = store.getState()
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
  console.log(visibleExpenses)
})

// store dispatches return action object,
// which can be stored in variable:
// { type: "ADD EXPENSE", expense:{...}}
const expenseOne = store.dispatch(
  addExpense({ description: 'Rent', amount: 100, createdAt: -21000 })
)

const expenseTwo = store.dispatch(
  addExpense({ description: 'Coffee', amount: 30, createdAt: -1000 })
)

// store.dispatch(removeExpense({ id: expenseOne.expense.id }))

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }))

// store.dispatch(setTextFilter('rent'))
// store.dispatch(setTextFilter())

store.dispatch(sortByAmount()) // amount
// store.dispatch(sortByDate()) // date

// store.dispatch(setStartDate(0))
// store.dispatch(setStartDate())
// store.dispatch(setEndDate(1250))
// store.dispatch(setEndDate())

// console.log(expenseOne)

// display redux state to start
// console.log(store.getState())

// const user = {
//   name: 'Jen',
//   age: 24
// }

// console.log({
//   ...user,
//   location: 'Philadelphia',
//   age: 29
// })

// —–—–—–—–—–—–—–—–—–—–—–—–—–—–—–—–—–—–

const demoState = {
  expenses: [
    {
      id: 'iapsdfasdf',
      description: 'January Rent',
      note: 'This was the final payment for that address',
      amount: 54500,
      createdAt: 0
    }
  ],
  filters: {
    text: 'rent',
    sortBy: 'date', // date or amount
    startDate: undefined,
    endDate: undefined
  }
}

if (module.hot) {
  module.hot.accept()
}
