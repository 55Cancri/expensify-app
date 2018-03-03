import {
  setStartDate,
  setEndDate,
  sortByAmount,
  sortByDate,
  setTextFilter
} from '../../actions/filters'
import moment from 'moment'

test('should generate set start date acton object', () => {
  const action = setStartDate(moment(0))

  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(0)
  })
})

test('should generate set end date acton object', () => {
  const action = setEndDate(moment(0))

  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(0)
  })
})

test('should generate sort by amount action object', () => {
  expect(sortByAmount()).toEqual({
    type: 'SORT_BY_AMOUNT'
  })
})

test('should generate sort by date action object', () => {
  expect(sortByDate()).toEqual({
    type: 'SORT_BY_DATE'
  })
})

test('should generate set text filter action object', () => {
  const text = 'life'
  const action = setTextFilter(text)

  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: text
  })
})

test('should generate set text filter default action object', () => {
  const action = setTextFilter()

  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: ''
  })
})
