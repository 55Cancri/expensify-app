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
  // gives access to dispatch (and get dispatch)
  return (dispatch, getState) => {
    // thunk actions get called with dispatch,
    // and with getState()
    const uid = getState().auth.uid

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
      .ref(`users/${uid}/expenses`)
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
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
})

export const startRemoveExpense = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid

    return database
      .ref(`users/${uid}/expenses/${id}`)
      .remove()
      .then(() => {
        dispatch(removeExpense({ id }))
      })
  }
}

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})

export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid

    return database
      .ref(`users/${uid}/expenses/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editExpense(id, updates))
      })
  }
}

// SET_EXPENSES
export const setExpenses = expenses => ({
  type: 'SET_EXPENSES',
  expenses
})

// startSetExpenses
export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    // return allows access to .then(()) in app.js
    return (
      database
        .ref(`users/${uid}/expenses`)
        .once('value')
        // snapshot returns object structure of firebase
        .then(snapshot => {
          const expenses = []

          snapshot.forEach(childSnapshot => {
            expenses.push({
              id: childSnapshot.key, // generated by firebase
              ...childSnapshot.val()
            })
          })

          dispatch(setExpenses(expenses))
        })
    )
  }
}

/*
  basic action with database:

  export const actionName = () => {
    return dispatch => {
      return database
        .query()
        .then(data => {
          dispatch(anotherActionName(withPossibleData))
        })
    }
  }

  can be used like this:
  
  store.dispatch(startSetExpenses()).then(() => {
    ReactDOM.render(jsx, document.getElementById('app'))
  })
*/
