import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { motion } from 'framer-motion'
import Category from './Category'
import { v4 as uuid } from 'uuid'
import { Timestamp, addDoc, collection, doc, getFirestore, setDoc } from 'firebase/firestore'

const AddTransaction = () => {
    const {transactions, userData, budget} = useContext(UserContext)

    const [formData, setFormData] = useState({
        desc: "", date: null, amount: null, paymentMethod: "", category: "Miscellaneous"
    })

    const handleAddExpense = async () => {
        const db = getFirestore()

        const month = new Date().getMonth()
        const year = new Date().getFullYear()

        if (formData.category==="Income") {
            const newBalance = Number(userData.currentBalance) + Number(formData.amount)

            await addDoc(collection(db, "users", userData.UID, "transactions"), {
                amount: Number(formData.amount), name: formData.desc,
                type: "income", date: Timestamp.fromDate(new Date(formData.date)), 
            })
            await setDoc(doc(db, "users", userData.UID, "budget", `${month}-${year}`), {
                totalIncome: Number(budget["totalIncome"]) + Number(formData.amount)
            }, { merge: true })
            await setDoc(doc(db, "users", userData.UID, "balance", `${month}-${year}`), {
                balance: newBalance
            }, { merge: true })
            await setDoc(doc(db, "users", userData.UID), {
                currentBalance: newBalance
            }, { merge: true })


        } else {
            const newBalance = Number(userData.currentBalance) - Number(formData.amount)

            const newCatBalance = budget["categories"][formData.category] ? 
                Number(budget["categories"][formData.category])+Number(formData.amount) : Number(formData.amount)

            await addDoc(collection(db, "users", userData.UID, "transactions"), {
                amount: Number(formData.amount), date: Timestamp.fromDate(new Date(formData.date)), type: "expense",
                category: formData.category, description: formData.desc, payment_method: formData.paymentMethod
            })
            await setDoc(doc(db, "users", userData.UID, "budget", `${month}-${year}`), {
                categories: {
                    ...budget["categories"], [formData.category]: newCatBalance,
                }, totalSpending: Number(budget["totalSpending"]) + Number(formData.amount)
            }, { merge: true })
            await setDoc(doc(db, "users", userData.UID, "balance", `${month}-${year}`), {
                balance: newBalance
            }, { merge: true })
            await setDoc(doc(db, "users", userData.UID), {
                currentBalance: newBalance
            }, { merge: true })
        }

        setFormData({
            desc: "", date: null, amount: null, paymentMethod: "", category: "Miscellaneous"
        })
    }

    if (transactions) {

        const renderCategories = userData.categories.map((cat) => {
            return <>
                <input onClick={() => setFormData(prev => ({...prev, category: cat}))} type="radio" id={cat} name={cat} value={cat} checked={formData.category===cat}/>
                <label for={cat}><Category smaller={true} category={cat} key={uuid()} /></label>
            </>
        })
        

        return (
            <motion.div initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className='card'>

            <div style={{display: "flex", flexDirection: "row", alignItems: "baseline", marginTop: "10px", marginBottom: "30px"}}>
                <div className="form__group">
                    <input
                        className='form__field'
                        value={formData.desc}
                        type='text' placeholder='Description'
                        id='desc' name="desc"
                        onChange={e => setFormData(prev => ({...prev, desc: e.target.value}))}
                        required
                    />
                    <label for="desc" className="form__label">Description</label>
                </div>
                {
                    formData.category!=="Income" &&
                    <div style={{marginLeft: "50px"}} className="form__group">
                        <input
                            className='form__field'
                            value={formData.paymentMethod}
                            type='text' placeholder='Payment method'
                            id='paymentMethod' name="paymentMethod"
                            onChange={e => setFormData(prev => ({...prev, paymentMethod: e.target.value}))}
                            required
                        />
                        <label for="paymentMethod" className="form__label">Payment method</label>
                    </div>
                }
            </div>
            
            <div style={{display: "flex", flexDirection: "row", alignItems: "baseline", marginTop: "40px", marginBottom: "30px"}}>
                <div>
                    <img alt="dollar sign"
                        src="/assets/dollar-sign.png"
                        className='smallTransactionInputImage'
                    />
                    <input
                        className='smallTransactionInput'
                        placeholder='60.00'
                        value={formData.amount}
                        type='number'
                        onChange={e => setFormData(prev => ({...prev, amount: e.target.value}))}
                    />
                </div>

                <div className="datepicker-toggle">
                    <img alt="calendar icon"
                        src="/assets/calendar.png"
                        className='datepicker-toggle-button'
                    />
                    <input
                        className='datepicker-input'
                        value={formData.date}
                        type='date'
                        onChange={e => setFormData(prev => ({...prev, date: e.target.value}))}
                    />
                </div>
            </div>

            <div class="radio-toolbar">
                {renderCategories}
            </div>

            <motion.div
                className='fit-content'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{marginLeft: "auto"}}
            >
                <button className='not-button' onClick={handleAddExpense}>
                    <h4>Add expense</h4>
                </button>
            </motion.div>
    
            </motion.div>
        )
    } else {
        return null
    }
}

export default AddTransaction