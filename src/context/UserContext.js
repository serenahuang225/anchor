import { createContext, useState, useEffect, useContext } from "react"
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { AuthContext } from "./AuthContext";
import { db } from "../firebase";

export const UserContext = createContext()

export function UserContextComponent({children}){
    const {user} = useContext(AuthContext);
    
    const [userData, setUserData] = useState(null)
    const [transactions, setTransactions] = useState(null)
    const [balances, setBalances] = useState(null)
    const [budget, setBudget] = useState(null)

    useEffect(() => {
        if (user && user.uid) {
            const unsubscribe = onSnapshot(doc(db, "users", user.uid), (doc) => {
                setUserData(doc.data())
            })
            return () => unsubscribe()
        }
    }, [user])

    useEffect(() => {
        if (user && user.uid && userData) {
            let start = new Date(new Date().getFullYear(), 0, 1)
            const q = query(collection(db, "users", user.uid, "transactions"), where("date", ">", start))
            const q2 = query(collection(db, "users", user.uid, "balance"), where("year", "==", new Date().getFullYear()))
            const q3 = query(collection(db, "users", user.uid, "budget"), where("month", "==", new Date().getMonth()), where("year", "==", new Date().getFullYear()))
            
            const unsubscribe = onSnapshot(q, (res) => {
                let newDocs = []

                res.docs.forEach(doc => {
                    newDocs.push({...doc.data(), id: doc.id, date: new Date(doc.data().date.seconds*1000)})
                })
    
                setTransactions(newDocs)
            })

            const unsubscribe2 = onSnapshot(q2, (res) => {
                let newDocs = []

                res.docs.forEach(doc => {
                    newDocs.push({...doc.data(), id: doc.id})
                })
    
                setBalances(newDocs)
            })

            const unsubscribe3 = onSnapshot(q3, (res) => {
                console.log(res)
                if (res.docs[0]) {


                    let newDocs = {...res.docs[0].data(), id: res.docs[0].id}
        
                    setBudget(newDocs)
                }
            })

            return () => {
                unsubscribe()
                unsubscribe2()
                unsubscribe3()
            }
        }
    }, [userData, user])

    const values = {
        userData: userData,
        setUserData: setUserData,
        transactions: transactions,
        setTransactions: setTransactions,
        balances: balances,
        setBalances: setBalances,
        budget: budget,
        setBudget: setBudget,
    }

    return <UserContext.Provider value={values}>
        { children }
    </UserContext.Provider>
}