import React from 'react'
import { Link } from 'react-router-dom'

// right - now props can be destructured from spread
const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    <h3>
      <Link to={`/edit/${id}`}>{description}</Link>
    </h3>
    <p>
      {amount} - {createdAt}
    </p>
  </div>
)

// wrong
// const ExpenseListItem = props =>
//   <li>
//     {props.item.description}
//     {props.item.amount}
//     {props.item.createdAt}
//   </li>

export default ExpenseListItem
