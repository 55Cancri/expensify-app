import uuid from 'uuid'
import database from '../firebase/firebase'

/*
  redux lifecycle:
  (old)
  1. component calls action generator
  2. action generator returns object
  3. component dispatches object
  4. redux store changes based on switch statement

  (new)
  1. component calls action generator
  2. action generator returns *function
  3. component dispatches *function (redux-thunk)
  4.1. function runs to handle firebase
  4.2. function dispatches another action with object
  5. redux store changes based on switch statement

*/

// ADD_EXPENSE
// note: dispatches *object, which changes store
export const addExpense = expense => ({
  // expense is object passed from startAddExpense
  // startAddExpense handles defaults too
  // this action simply recieves it for store
  type: 'ADD_EXPENSE',
  expense
})

// note: dispatches ADD_EXPENSE action from inside
export const startAddExpense = (expenseData = {}) => {
  // redux-think allows return function in action
  // gives access to dispatch
  return dispatch => {
    // sets up defaults of what should be received
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData

    // stores what IS received (even if default)
    const expense = {
      description,
      note,
      amount,
      createdAt
    }

    // access firebase and push new expense
    // by adding 'return', you can now add 'then' in test
    return database
      .ref('expenses')
      .push(expense)
      .then(ref => {
        // finally, dispatch action for redux store
        // instead of just passing the variable,
        // it grabs id from firebase, then passes
        dispatch(
          addExpense({
            id: ref.key,
            ...expense
          })
        )
      })
  }
}

// REMOVE_EXPENSE
export const removeExpense = ({ id }) => ({
  type: 'REMOVE_EXPENSE',
  id
})

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})
