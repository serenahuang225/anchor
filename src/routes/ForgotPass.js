import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { getAuth, sendPasswordResetEmail } from '@firebase/auth'

const ForgotPass = () => {
    const [formData, setFormData] = useState({email: ""})

    const [errors, setErrors] = useState({other: "", success: ""})

    const handleChange = (e) => {
        const {name, value} = e.target
        setErrors({other: "", success: ""})

        setFormData(prev => ({
            ...prev, [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const auth = getAuth()
    
        if (formData.email === "") {
            setErrors({other: "Fill in all fields to continue.", success: ""})
        } else if (formData.email.length > 0) {
            sendPasswordResetEmail(auth, formData.email)
            .then(() => {
                setErrors({other: "", success: "Password reset email sent! Check your email."})
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
                <h2 style={{marginBottom: "15px"}}>We've got you covered</h2>
                <input
                    type="text"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    name="email"
                />
                {errors.other.length > 0 && <p className='error'>{errors.other}</p>}
                <button type='submit'>Send password reset email</button>
                {errors.success.length > 0 && <p className='error'>{errors.success}</p>}

            </form>
            <p style={{marginTop: "20px", marginBottom: "20px"}}>Remembered your password? <Link className='link' to="/login">Log in</Link>
            </p>
        </div>
    )
}

export default ForgotPass