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
    case 'SET_EXPENSES':
      return action.expenses
    default:
      return state
  }
}

export default expensesReducer
