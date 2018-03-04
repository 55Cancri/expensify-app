import moment from 'moment'

/* 
  Selectors filter state by a filter. An expenses array from state is the first parameter and a filters array from state is the second parameter. Notice below that text, sortBy, startDate, and endDate are all methods to sort a list.

  Selectors are used by components that display things. This selector is used by ExpenseList.jsx to filter out results in the queried list.
*/

// get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const createdAtMoment = moment(expense.createdAt)
      const startDateMatch = startDate
        ? startDate.isSameOrBefore(createdAtMoment, 'day')
        : true
      const endDateMatch = endDate
        ? endDate.isSameOrAfter(createdAtMoment, 'day')
        : true
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase())

      return startDateMatch && endDateMatch && textMatch
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1
      }
      if (sortBy === 'amount') {
        return a.amount < b.amount ? 1 : -1
      }
    })
}

export default getVisibleExpenses
