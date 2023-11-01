import React, { useContext, useEffect, useState } from 'react'

import Transactions from "../components/transactions/Transactions"
import AddTransaction from '../components/transactions/AddTransaction'
import TransactionSort from '../components/transactions/TransactionSort'
import { UserContext } from '../context/UserContext'
import { collection, getFirestore, onSnapshot, orderBy, query, where } from 'firebase/firestore'

const BalanceSheet = () => {
    const [sort, setSort] = useState({sort: "date", show: "past_year"})
    const [customData, setCustomData] = useState([])

    const {userData} = useContext(UserContext)

    useEffect(() => {
        const db = getFirestore()
        let start = new Date(new Date().getFullYear(), 0, 1)
        let q

        if (sort.show==="all_time") {
            if (sort.sort==="date") {
                q = query(collection(db, "users", userData.UID, "transactions"), orderBy('date', 'desc'))
            } else {
                q = query(collection(db, "users", userData.UID, "transactions"), orderBy(sort.sort))
            }
        } else {
            if (sort.show==='past_year') {
                start = new Date(new Date().getFullYear(), 0, 1)
            } else if (sort.show==="year-to-date") {
                start = new Date(new Date().getFullYear()-1, new Date().getMonth(), 1)
            } else if (sort.show==="6_months") {
                const newMonth = new Date().getMonth() >=6 ? new Date().getMonth()-6 : 12-(6-new Date().getMonth())
                const newYear = new Date().getMonth() >=6 ? new Date().getFullYear() : new Date().getFullYear()-1
                start = new Date(newYear, newMonth, 1)
            } else if (sort.show==="3_months"){
                const newMonth = new Date().getMonth() >=3 ? new Date().getMonth()-3 : 12-(3-new Date().getMonth())
                const newYear = new Date().getMonth() >=3 ? new Date().getFullYear() : new Date().getFullYear()-1
                start = new Date(newYear, newMonth, 1)
            } else {
                start = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            }
            if (sort.sort==="date") {
                q = query(collection(db, "users", userData.UID, "transactions"), where("date", ">", start), orderBy('date', 'desc'))
            } else {
                q = query(collection(db, "users", userData.UID, "transactions"), where("date", ">", start), orderBy(sort.sort))
            }
        }

        const unsubscribe = onSnapshot(q, (res) => {
            let newDocs = []

            res.docs.forEach(doc => {
                newDocs.push({...doc.data(), id: doc.id, date: new Date(doc.data().date.seconds*1000)})
            })

            setCustomData(newDocs)
        })

        return () => unsubscribe()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort])

    return (
        <div className='dashboard'>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", }}>
                <AddTransaction />
                <TransactionSort sort={sort} setSort={setSort} />
            </div>
            <Transactions customData={customData} useCustomData={true} showNav={false} />
        </div>
    )
}

export default BalanceSheet