import React from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { Link } from 'react-router-dom'

// right - now props can be destructured from spread
const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    <h3>
      <Link to={`/edit/${id}`}>{description}</Link>
    </h3>
    <p>
      {numeral(amount / 100).format('$0,0.00')}
      -
      {moment(createdAt).format('MMMM Do, YYYY')}
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
