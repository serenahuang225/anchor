import { createContext, useState, useEffect } from "react"
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from "../firebase"

export const AuthContext = createContext()

export function AuthContextComponent({children}){
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setLoading(false)

            if (currentUser) {
                setUser(currentUser)
            }

            else {
                setUser(null)
            }
        })
        return () => unsubscribe()
    }, [])

    const values = {
        user: user,
        setUser: setUser
    }

    return <AuthContext.Provider value={values}>
        { !loading && children }
    </AuthContext.Provider>
}