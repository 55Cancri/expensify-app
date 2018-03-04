import React from 'react'
import ExpenseList from './ExpenseList.jsx'
import ExpenseListFilters from './ExpenseListFilters.jsx'
import ExpensesSummary from './ExpensesSummary.jsx'

const ExpenseDashboardPage = () => (
  <div>
    This is from my dashboard component
    <ExpensesSummary />
    <ExpenseListFilters />
    <ExpenseList />
  </div>
)

export default ExpenseDashboardPage
