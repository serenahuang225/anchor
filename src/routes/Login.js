import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { getAuth, signInWithEmailAndPassword } from '@firebase/auth'

const Login = () => {
    const [formData, setFormData] = useState({email: "", password: ""})

    const [errors, setErrors] = useState({email: "", pass: "", other: ""})
    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name, value} = e.target
        setErrors({email: "", pass: "", other: ""})

        setFormData(prev => ({
            ...prev, [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const auth = getAuth()
    
        if (formData.email === "" || formData.password === "") {
            setErrors({email: "", pass: "", other: "Fill in all fields to continue."})
        } else if (formData.email.length > 0 && formData.password.length > 0) {
            signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then(() => {
                navigate('/dashboard')
            })
            .catch(err => {
                if (err.code === "auth/invalid-email") {
                    setErrors({email: "Enter a valid email.", pass: "", other: ""})
                } else if (err.code === "auth/user-not-found") {
                    setErrors({email: "", pass: "", other: "User not found. Try signing up!"})
                } else if (err.code === "auth/user-disabled") {
                    setErrors({email: "", pass: "", other: "This account is currently disabled."})
                } else if (err.code === "auth/invalid-password") {
                    setErrors({email: "", pass: "Enter a valid password.", other: ""})
                } else if (err.code === "auth/wrong-password") {
                    setErrors({email: "", pass: "Wrong password.", other: ""})
                } else if (err.code === "auth/invalid-login-credentials") {
                    setErrors({email: "", pass: "", other: "Wrong login credentials."})
                } else {
                    setErrors({email: "", pass: "", other: "Oops! Something went wrong."})
                }
            })
        }
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div style={{display: "flex", flexDirection: "row", marginBottom: '50px', marginTop: '20px'}}>
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
                <h2 style={{marginBottom: "15px"}}>Welcome back.</h2>
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
                {errors.pass.length > 0 && <p className='error'>{errors.pass}</p>}
                <div style={{width: "250px", display: "flex", flexDirection: "row-reverse"}}>
                <Link to="/forgot-password" className='link'>Forgot password?</Link>
                </div>

                <button type='submit'>Log in</button>
                {errors.other.length > 0 && <p className='error'>{errors.other}</p>}

            </form>
            <p style={{marginTop: "20px", marginBottom: "20px"}}>Don't have an account yet? <Link className='link' to="/signup">Sign up</Link>
            </p>
        </div>
    )
}

export default Login