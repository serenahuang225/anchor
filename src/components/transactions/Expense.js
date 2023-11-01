import React from 'react'
import './transaction.css'
import Category from './Category'

const Expense = ({amount, date, category, description, payment_method}) => {
  return (
    <>
      <div className='transaction-section-start'>
        <p className='date'>{new Date(date).toLocaleDateString()}</p>
        <p>{description} - {payment_method}</p>
      </div>

      <div className='transaction-section-end'>
        <Category category={category} />
        <p>- ${(Math.round(amount*100)/100).toFixed(2)}</p>
      </div>
    </>
  )
}

export default Expense