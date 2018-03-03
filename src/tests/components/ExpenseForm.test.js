import React from 'react'
import moment from 'moment'
import 'react-dates/initialize'
// import 'react-dates/lib/css/_datepicker.css'
import { shallow } from 'enzyme'
import ExpenseForm from '../../components/ExpenseForm.jsx'
import { SingleDatePicker } from 'react-dates'
import expenses from '../fixtures/expenses'

// introduces simulating user events

test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />)
  expect(wrapper).toMatchSnapshot()
})

test('should render expenseForm correctly with expense data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} />)

  expect(wrapper).toMatchSnapshot()
})

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />)
  expect(wrapper).toMatchSnapshot()
  wrapper.find('form').simulate('submit', { preventDefault: () => {} })

  expect(wrapper.state('error').length).toBeGreaterThan(0)
  expect(wrapper).toMatchSnapshot()
})

test('should set description on input change', () => {
  const value = 'New description'
  const wrapper = shallow(<ExpenseForm />)
  wrapper
    .find('input')
    .at(0)
    .simulate('change', {
      target: { value }
    })
  expect(wrapper.state('description')).toBe(value)
})

test('should set note on textarea change', () => {
  const value = 'New... something.'
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('textarea').simulate('change', {
    target: { value }
  })
  expect(wrapper.state('note')).toBe(value)
})

test('should set amount if valid input', () => {
  const value = '26'
  const wrapper = shallow(<ExpenseForm />)
  wrapper
    .find('input')
    .at(1)
    .simulate('change', {
      target: { value }
    })
  expect(wrapper.state('amount')).toBe(value)
})

test('should set amount if invalid input', () => {
  const amount = '26.233'
  const wrapper = shallow(<ExpenseForm />)
  wrapper
    .find('input')
    .at(1)
    .simulate('change', {
      target: { value: amount }
    })
  expect(wrapper.state('amount')).toBe('')
})

// spies are fake functions
test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn()
  const wrapper = shallow(
    <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
  )
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  })
  expect(wrapper.state('error')).toBe('')
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt
  })
})

// test('should set new date on date change', () => {
//   const now = moment()
//   const wrapper = shallow(<ExpenseForm />)
//   // console.dir(wrapper.find('input').at(0))
//   // expect(wrapper.find('SingleDatePicker').length).toBe(1)
//   wrapper.find('SingleDatePicker').prop('onDateChange')(now)
//   expect(wrapper.state('createdAt')).toEqual(now)
// })

// test('should set calendarFocus on date change', () => {
//   const focused = true
//   const wrapper = shallow(<ExpenseForm />)
//   wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused })
//   expect(wrapper.state('calendarFocused')).toBe(focused)
// })
