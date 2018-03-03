import React from 'react'
import ExpenseList from './ExpenseList.jsx'
import ExpenseListFilters from './ExpenseListFilters.jsx'

const ExpenseDashboardPage = () =>
  <div>
    This is from my dashboard component
    <ExpenseListFilters/>
    <ExpenseList/>
  </div>

export default ExpenseDashboardPage
