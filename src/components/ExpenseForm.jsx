import 'react-dates/initialize'
import React, { Component } from 'react'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'

const now = moment()

class ExpenseForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: ''
    }
  }

  // pulls target property out of e object (e.target)
  onDescriptionChange = ({ target }) => {
    this.setState(() => ({
      description: target.value
    }))
  }

  onNoteChange = ({ target }) => {
    this.setState(() => ({
      note: target.value
    }))
  }

  onAmountChange = ({ target }) => {
    const regex = /^\d{1,}(\.\d{0,2})?$/
    if (!target.value || target.value.match(regex)) {
      this.setState(() => ({ amount: target.value }))
    }
  }

  onDateChange = createdAt => {
    if (createdAt) {
      this.setState(() => ({ createdAt }))
    }
  }

  onFocusChange = ({ focused }) =>
    this.setState(() => ({ calendarFocused: focused }))

  onSubmit = e => {
    e.preventDefault()
    const { description, amount, note } = this.state

    if (!description || !amount) {
      // set error in state
      const error = 'Please provide description and amount'
      this.setState({ error })
    } else {
      this.setState({ error: '' })
      this.props.onSubmit({
        description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note
      })
      console.log('submitted!')
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="text"
            placeholder="Description"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input
            type="text"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={day => false}
          />
          <textarea
            placeholder="Add a note for your expense (optional)"
            value={this.state.note}
            onChange={this.onNoteChange}
          />
          <button>Add Expense</button>
        </form>
      </div>
    )
  }
}

export default ExpenseForm
