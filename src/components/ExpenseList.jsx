import React from 'react'
import { connect } from 'react-redux'
import ExpenseListItem from './ExpenseListItem.jsx'
import selectExpenses from '../selectors/expenses'

// this export is for isolated testing
// props.expenses is the selector in mapStateToProps
export const ExpenseList = props => (
  // right - no prop name needed, just pass expense
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    <div className="list-body">
      {props.expenses.length === 0 ? (
        <div className="list-item list-item__message">
          <p>No expenses</p>
        </div>
      ) : (
        props.expenses.map(expense => (
          <ExpenseListItem key={expense.id} {...expense} />
        ))
      )}
    </div>
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
