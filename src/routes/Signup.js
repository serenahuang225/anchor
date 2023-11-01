import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { createUserWithEmailAndPassword, getAuth } from '@firebase/auth'
import { doc, setDoc } from '@firebase/firestore'

import { db } from "../firebase"

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "", email: "", password: ""
    })

    const [errors, setErrors] = useState({email: "", password: "", other: ""})
    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name, value} = e.target
        setErrors({email: "", password: "", other: ""})

        setFormData(prev => ({
            ...prev, [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const auth = getAuth()
    
        var newErrorMessages = { email: "", password: "", other: ""}
        for (const formField in formData) {
            if (formData[formField]==="") {
                newErrorMessages = {...newErrorMessages,
                    other: "Fill in all fields to continue."
                }
                break
            }
        }

        if (formData.password.length > 0) {
            const validPass = /(?=.*[a-z])(?=.*[0-9])/
            if (formData.password.length < 6) {
                newErrorMessages = {...newErrorMessages,
                    password: "Passwords must contain at least 6 characters.",
                }
            } else if (!formData.password.match(validPass)) {
                newErrorMessages = {...newErrorMessages,
                    password: "Passwords must contain both letters and numbers.",
                }
            }
        }

        if (formData.email.length > 0) {
            const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                if (!formData.email.match(validRegex)) {
                newErrorMessages = {
                    ...newErrorMessages,
                    email: "Enter a valid email."
                }
            }
        }

        if (JSON.stringify({ email: "", password: "", other: ""}) === JSON.stringify(newErrorMessages)) {
            createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                setDoc(doc(db, 'users', userCredential.user.uid), {
                    categories: ["Groceries","Utilities","Clothing","Food","Subscriptions","Pets","Miscellaneous"],
                    name: formData.name, email: formData.email, UID: userCredential.user.uid, currentBalance: 0,
                    monthlyBudget: 500, category_budgets: [{"Groceries": 500},{"Utilities": 500},{"Clothing": 500},{"Food": 500},{"Subscriptions": 500},{"Pets": 500},{"Miscellaneous": 500}]
                })

                navigate("/dashboard")
            })
            .catch((err) => {
                if (err.code === "auth/email-already-in-use") {
                    setErrors({...newErrorMessages,
                        email: "This email is already in use by another account.",
                    })
                }
            })
            
        } else {
            setErrors(newErrorMessages)
        }
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div style={{display: "flex", flexDirection: "row", marginBottom: '10px', marginTop: '10px'}}>
                    <img 
                        src="/assets/anchor-logo.png"
                        className='logo'
                        alt='logo'
                    />
                    <img 
                        src="/assets/logo-text.png"
                        className='logo'
                        alt='logo'
                    />
                </div>
                <h2 style={{marginBottom: "15px"}}>Glad to see you here.</h2>
                <input
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    name="name"
                />
                <input
                    type="text"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    name="email"
                />
                {errors.email.length > 0 && <p className='error'>{errors.email}</p>}
                <input
                    type="text"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    name="password"
                />
                {errors.password.length > 0 && <p className='error'>{errors.pass}</p>}
                <button type='submit'>Sign up</button>
                {errors.other.length > 0 && <p className='error'>{errors.other}</p>}

                <p style={{marginTop: "25px"}}>By creating an account, you agree to the Terms of Service and Privacy Policy</p>

            </form>
            <p style={{marginBottom: "10px"}}>Already have an account? <Link className='link' to="/login">Log in</Link>
            </p>
        </div>
    )
}

export default Signup