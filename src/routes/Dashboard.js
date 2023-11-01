import React from 'react'
import Transactions from '../components/transactions/Transactions'
import Balance from '../components/balance/Balance'
import Budget from '../components/budget/Budget'

const Dashboard = () => {
    
    return (
        <div className='dashboard'>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", }}>
                <Balance />
                <Budget />
            </div>
            <Transactions />
        </div>
    )
}

export default Dashboard