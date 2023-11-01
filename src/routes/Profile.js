import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import Category from '../components/transactions/Category'
import {v4 as uuid} from 'uuid'
import { motion } from 'framer-motion'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Back from '../components/nav/Back'

function getMessage (name) {
    var message = ""
    const d = new Date()
    const hours = d.getHours()

    if (hours < 3 || hours >= 22) {
        message = "Whooo's a night owl?"
    } else if (hours >= 3 && hours < 6) {
        message = "Hi early bird!"
    } else if (hours >= 6 && hours < 12) {
        message = `Good morning, ${name}`
    } else if (hours >= 12 && hours < 17) {
        message = `Good afternoon, ${name}`
    } else if (hours >= 17 && hours < 22) {
        message = `Good evening, ${name}`
    }
    return message
}

const Profile = () => {
    const {userData} = useContext(UserContext)

    const renderCategories = userData.categories.map(cat =>
        <div style={{marginLeft: "20px"}}>
            <Category category={cat} key={uuid()} />
        </div>
    )

    const auth = getAuth()
    const navigate = useNavigate()

    const handleLogOut = () => {
        signOut(auth).then(() => {
            navigate("/dashboard")
        })
    }

    const message = getMessage(userData.name)

    return (
        <div className='profile'>
            <div style={{boxShadow: "0 0 15px 1px rgba(0,0,0,.1)", display: "flex", flexDirection: "column", backgroundColor: "white", borderRadius: "25px", padding: "40px", width: "fit-content"}}>
                <Back noStyle={true} />
                <h2 style={{marginBottom: "20px"}}>{message}</h2>

                <div style={{boxShadow: "5px 5px 15px rgba(0,0,0,.1)", padding: "15px", marginBottom: "20px", width: "400px", justifyContent: "space-between", borderRadius: "10px", backgroundColor: "#fff", display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <h5 style={{marginRight: "8px"}}>Email</h5>
                    <h5>{userData.email}</h5>
                </div>
                <div style={{boxShadow: "5px 5px 15px rgba(0,0,0,.1)", padding: "15px", marginBottom: "20px", width: "400px", justifyContent: "space-between", borderRadius: "10px", backgroundColor: "#fff", display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <h5 style={{marginBottom: "2px"}}>Balance</h5>
                    <h5>${userData.currentBalance.toFixed(2)}</h5>
                </div>

                <div style={{boxShadow: "5px 5px 15px rgba(0,0,0,.1)", padding: "15px", marginBottom: "20px", width: "400px", justifyContent: "space-between", borderRadius: "10px", backgroundColor: "#fff", display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <h5 style={{}}>Monthly spending budget</h5>
                    <h5>${userData.monthlyBudget.toFixed(2)}</h5>
                </div>

                {/* <div style={{boxShadow: "5px 5px 15px rgba(0,0,0,.1)", padding: "15px", marginTop: "5px", marginBottom: "20px", width: "400px", borderRadius: "10px", backgroundColor: "#fff", display: "flex", flexDirection: "column"}}>
                    <h5 style={{marginBottom: "8px"}}>Categories</h5>
                    {renderCategories}
                </div> */}

                <motion.button
                    className='fit-content not-button'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogOut}
                >
                    <h4 style={{color: "#e64d7e", marginTop: "40px"}}>Log out</h4>
                </motion.button>

            </div>
        </div>
    )
}

export default Profile