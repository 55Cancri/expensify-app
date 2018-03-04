import React, { Component } from 'react'
import ExpenseForm from './ExpenseForm.jsx'
import { connect } from 'react-redux'
import { startAddExpense } from '../actions/expenses'

export class AddExpensePage extends Component {
  onSubmit = expense => {
    // this.props.dispatch(addExpense(expense))
    this.props.startAddExpense(expense)
    this.props.history.push('/')
  }

  // notice this.onSubmit does not require a parameter for "expense",
  // even though it passes the object (and not e) to onSubmit
  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm onSubmit={this.onSubmit} />
      </div>
    )
  }
}

// passes down onSubmit (which dispatches) as a prop
const mapDispatchToProps = dispatch => ({
  startAddExpense: expense => dispatch(startAddExpense(expense))
})

// mapStateToProps is undefined
export default connect(undefined, mapDispatchToProps)(AddExpensePage)
