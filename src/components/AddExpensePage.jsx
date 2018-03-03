import React, { Component } from 'react'
import ExpenseForm from './ExpenseForm.jsx'
import { connect } from 'react-redux'
import { addExpense } from '../actions/expenses'

export class AddExpensePage extends Component {
  onSubmit = expense => {
    // this.props.dispatch(addExpense(expense))
    this.props.addExpense(expense)
    this.props.history.push('/')
  }

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
  addExpense: expense => dispatch(addExpense(expense))
})

// mapStateToProps is undefined
export default connect(undefined, mapDispatchToProps)(AddExpensePage)
