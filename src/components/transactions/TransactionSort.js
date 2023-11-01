import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { motion } from 'framer-motion'
import {v4 as uuid} from 'uuid'
import "./transaction.css"

const capitalize = (input) => {
    return input[0].toUpperCase() + input.slice(1).replace("_", " ")
}

const TransactionSort = ({sort, setSort}) => {
    const {transactions} = useContext(UserContext)
    const sortMethods = ['date', 'description', 'payment_method', 'category', 'amount']
    const timeMethods = ['all_time', 'year-to-date', 'past_year', '6_months', '3_months', '1_month']

    const renderCategories = sortMethods.map((cat) => {
        return <>
            <input key={uuid()} onClick={() => setSort(prev => ({...prev, sort: cat}))} type="radio" id={cat} name={cat} value={cat} checked={sort.sort===cat}/>
            <label for={cat}>{capitalize(cat)}</label>
        </>
    })
    const renderTimeFrames = timeMethods.map((cat) => {
        return <>
            <input key={uuid()} onClick={() => setSort(prev => ({...prev, show: cat}))} type="radio" id={cat} name={cat} value={cat} checked={sort.show===cat}/>
            <label for={cat}>{capitalize(cat)}</label>
        </>
    })

    if (transactions) {
        return (
            <motion.div initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className='card'>
            <h4 style={{marginBottom: "10px"}}>Filter Transactions</h4>

            <h5>Sort by</h5>
            <div class="radio-toolbar">
                {renderCategories}
            </div>

            <h5 style={{marginTop: "20px"}}>Show</h5>
            <div class="radio-toolbar">
                {renderTimeFrames}
            </div>
    
            </motion.div>
        )
    } else {
        return null
    }
}

export default TransactionSort