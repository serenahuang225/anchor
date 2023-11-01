import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import Income from './Income'
import Expense from './Expense'

import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Transactions = ({showNav=true, useCustomData=false, customData=null}) => {
    const transactions = useContext(UserContext).transactions

    return (
        <motion.div initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className='t-card'
        >
            {
                showNav ?
            <motion.div
                className='fit-content'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{marginBottom: "10px"}}
            >
                <Link to="/transactions" className='nav-link'>
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <h4>Transactions</h4>
                    <svg
                        xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
                        width="30px" height="30px" id="svg" version="1.1" 
                        style={{fill: "#116566", rotate: "180deg", margin: 0}} viewBox="0 0 512 512" xmlSpace="preserve"
                    >
                        <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "/>
                    </svg>
                    </div>
                </Link>
            </motion.div> :
            <h4>Recent Transactions</h4>
            }

            <div className='transaction-header'>
                <div className='transaction-section-start'>
                    <h5 className='date'>Date</h5>
                    <h5>Description</h5>
                </div>

                <div className='transaction-section-end'>
                    <h5 className='category'>Category</h5>
                    <h5>Amount</h5>
                </div>
            </div>

            <div style={{display: "flex", overflow: "auto", flexDirection: "column", height: "64vh"}}>
                <AnimatePresence> 
                    { transactions && 
                    !useCustomData ? 
                    transactions.map((data, i) =>
                        <motion.div className='transaction' animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: 50}} initial={{opacity: 0, y: 50}} key={data.id}
                            transition={{duration: 0.3, delay: 0.1*i}}
                        > { data.type==="income" ?
                            <Income name={data.name} amount={data.amount} date={data.date} /> :
                            <Expense description={data.description} amount={data.amount} date={data.date} category={data.category} payment_method={data.payment_method} />    
                        } </motion.div>
                    ) 
                    :
                    customData && customData.map((data, i) =>
                        <motion.div className='transaction' animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: 50}} initial={{opacity: 0, y: 50}} key={data.id}
                            transition={{duration: 0.3, delay: 0.1*i}}
                        > { data.type==="income" ?
                            <Income name={data.name} amount={data.amount} date={data.date} /> :
                            <Expense description={data.description} amount={data.amount} date={data.date} category={data.category} payment_method={data.payment_method} />    
                        } </motion.div>
                    ) 
                }
                </AnimatePresence>
            </div>
            
        </motion.div>
    )
}

export default Transactions