import React from 'react'
import { connect } from 'react-redux'
import ExpenseListItem from './ExpenseListItem.jsx'
import selectExpenses from '../selectors/expenses'

// this export is for isolated testing
// props.expenses is the selector in mapStateToProps
export const ExpenseList = props => (
  // right - no prop name needed, just pass expense
  <div>
    {props.expenses.length === 0 ? (
      <p>No expenses</p>
    ) : (
      props.expenses.map(expense => (
        <ExpenseListItem key={expense.id} {...expense} />
      ))
    )}
  </div>
)

// wrong - spread props to pass down
// <div>
//   <h1>Expense List</h1>
//   {props.expenses.map(item =>
//     <ExpenseListItem
//       description={item.description}
//       amount={item.amount}
//       createdAt={item.createdAt}
//     />)}
// </div>

// gets state prop from connect function below
const mapStateToProps = state => ({
  expenses: selectExpenses(state.expenses, state.filters)
})

export default connect(mapStateToProps)(ExpenseList)
