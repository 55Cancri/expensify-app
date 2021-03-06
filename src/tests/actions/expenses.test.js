import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  startAddExpense,
  addExpense,
  editExpense,
  startEditExpense,
  removeExpense,
  startRemoveExpense,
  setExpenses,
  startSetExpenses
} from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase'

const uid = 'thisismytestuid'
const defaultAuthState = { auth: { uid } }
const createMockStore = configureMockStore([thunk])

// converts array style test data to object style of firebase
beforeEach(done => {
  const expensesData = {}
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt }
  })

  // adds that data to firebase
  database
    .ref(`users/${uid}/expenses`)
    .set(expensesData)
    .then(() => done())
})

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' })

  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  })
})

test('should remove expense from firebase', done => {
  const store = createMockStore(defaultAuthState)
  const id = expenses[2].id
  // passes an object with id defined, since sRE expects object
  // passed as { id: id }
  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id // id: id
      })
      return database.ref(`users/${uid}/expenses/${id}`).once('value')
    })
    .then(snapshot => {
      expect(snapshot.val()).toBeFalsy()
      done()
    })
})

test('should setup edit expense action object', () => {
  const action = editExpense('123abc', { note: 'New note value' })

  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'New note value'
    }
  })
})

test('should edit expense from firebase', done => {
  const store = createMockStore(defaultAuthState)
  const id = expenses[0].id
  const updates = { amount: 21045 }

  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'EDIT_EXPENSE',
        id,
        updates
      })

      return database.ref(`users/${uid}/expenses/${id}`).once('value')
    })
    .then(snapshot => {
      expect(snapshot.val().amount).toBe(updates.amount)
      done()
    })
})

test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[2])
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  })
})

test('should add expense to database and store', done => {
  // passes default data to store (empty obj)
  const store = createMockStore(defaultAuthState)

  const expenseData = {
    description: 'mouse',
    amount: 3000,
    note: 'wireless',
    createdAt: 1000
  }

  // we can add then to this because a return statement is in front
  // of startAddExpense in actions/expenses.js
  // this checks if action was correctly dispatched with correct data
  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      })

      // this id was generated by firebase
      // We use it to ensure data was saved to db
      // we expect the returned data from firebase is right
      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once('value')
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseData)
      done()
    })
})

test('should add expense with defaults to database and store', done => {
  // passes default data to store (empty obj)
  const store = createMockStore(defaultAuthState)

  const expenseDefaults = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  }

  // we can add then to this because a return statement is in front
  // of startAddExpense in actions/expenses.js
  // this checks if action was correctly dispatched with correct data
  store
    .dispatch(startAddExpense({}))
    .then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseDefaults
        }
      })

      // this id was generated by firebase
      // We use it to ensure data was saved to db
      // we expect the returned data from firebase is right
      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once('value')
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseDefaults)
      done()
    })
})

test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses)
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  })
})

test('should fetch the expenses from firebase', done => {
  const store = createMockStore(defaultAuthState)
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses // seed data
    })
    done()
  })
})
