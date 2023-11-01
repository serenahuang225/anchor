import React from 'react'
import Category from './Category'
import './transaction.css'

const Income = ({amount, date, name}) => {
    return (
        <>
        <div className='transaction-section-start'>
            <p className='date'>{new Date(date).toLocaleDateString()}</p>
            <p>{name}</p>
        </div>
        <div className='transaction-section-end'>
            <Category category={"Income"} />
            <p>${(Math.round(amount*100)/100).toFixed(2)}</p>
        </div>
        </>
    )
}

export default Income