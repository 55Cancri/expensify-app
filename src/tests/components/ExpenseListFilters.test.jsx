import React from 'react'
import moment from 'moment'
import { shallow } from 'enzyme'
import { ExpenseListFilters } from '../../components/ExpenseListFilters.jsx'
import { filters, altFilters } from '../fixtures/filters'

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper

beforeEach(() => {
  setTextFilter = jest.fn()
  sortByDate = jest.fn()
  sortByAmount = jest.fn()
  setStartDate = jest.fn()
  setEndDate = jest.fn()
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  )
})

test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

// change props passed to component
test('should render ExpenseListFilters with alt data correctly', () => {
  wrapper.setProps({
    filters: altFilters
  })
  expect(wrapper).toMatchSnapshot()
})

test('should handle text change', () => {
  const value = 'bills.'
  // wrapper.prop(setTextFilter)
  wrapper.find('input').simulate('change', {
    target: { value }
  })
  expect(setTextFilter).toHaveBeenLastCalledWith(value)
  // expect(wrapper).toMatchSnapshot()
})

test('should sort by date', () => {
  wrapper.setProps({
    filters: altFilters
  })

  const value = 'date'
  wrapper.find('select').simulate('change', {
    target: { value }
  })
  expect(sortByDate).toHaveBeenCalled()
})

test('should sort by amount', () => {
  const value = 'amount'
  wrapper.find('select').simulate('change', {
    target: { value }
  })
  expect(sortByAmount).toHaveBeenCalled()
})

// for someone reason, cannot find DateRangePicker node
// test('should handle date changes', () => {
//   const startDate = moment(0).add(4, 'years')
//   const endDate = moment(0).add(8, 'years')

//   // not simulating change or submit, dont know?
//   wrapper.find('DateRangePicker').prop('onDatesChange')({
//     startDate,
//     endDate
//   })

//   expect(setStartDate).toHaveBeenLastCalledWith(startDate)
//   expect(endStartDate).toHaveBeenLastCalledWith(endDate)
// })

// test('should handle date focus changes', () => {
//   const calendarFocused = 'endDate'
//   wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused)

//   expect(wrapper.state('calendarFocused')).toBe(calendarFocused)
// })
