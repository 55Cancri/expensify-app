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
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm onSubmit={this.onSubmit} />
        </div>
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
