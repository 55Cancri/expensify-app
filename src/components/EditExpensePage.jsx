import React, { Component } from 'react'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm.jsx'
import { startEditExpense, startRemoveExpense } from '../actions/expenses'

// after redux, this has access to specific expense

export class EditExpensePage extends Component {
  onSubmit = expense => {
    this.props.startEditExpense(this.props.expense.id, expense)
    this.props.history.push('/')
  }

  onRemove = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id })
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
        <button onClick={this.onRemove}>Remove</button>
      </div>
    )
  }
}

// has access to props from lower component (how?)
const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
})

// second argument is the props for the wrapped component
const mapDispatchToProps = (dispatch, props) => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: data => dispatch(startRemoveExpense(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage)
