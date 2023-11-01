import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios';
import {UserContext} from "../../context/UserContext"
import { v4 as uuid} from 'uuid'

const Chat = () => {
    const {userData, transactions, budget} = useContext(UserContext)
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(false)

    const handleSubmit = () => {
        setLoading(true)
        axios.post('http://127.0.0.1:5000/chat', {
            question: question,
            transactions: transactions,
            budget: {...budget, monthlyBudget: userData.monthlyBudget, currentBalance: userData.currentBalance, budget_for_each_category: userData.category_budgets, categories: userData.categories},
        })
        .then(response => {
            console.log(response)
            setLoading(false)
            setResponse(response.data.response.split(/^/m));
        })
        .catch(error => {
            console.error(error);
        });
    };

    const handleInputChange = (event) => {
        // Dynamically set the height of the input box based on the content
        event.target.style.height = 'auto';
        event.target.style.height = event.target.scrollHeight + 'px';
    
        setQuestion(event.target.value);
    };

    return (
        <motion.div initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className='t-card'
        >
            <h4>Ask AI a Question About Your Finances</h4>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <textarea rows={1}
                    type="text"
                    placeholder="Your question"
                    value={question}
                    onChange={handleInputChange}
                />
                {
                loading ? <div class="lds-dual-ring"/> :
                <motion.div
                    className='back fit-content'
                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    onClick={handleSubmit}
                >
                    <svg
                        xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
                        width="40px" height="40px" id="svg" version="1.1" className='rotate'
                        viewBox="0 0 512 512" xmlSpace="preserve" style={{fill: "#116566"}}
                    >
                        <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "/>
                    </svg>
                </motion.div>
                }
            </div>
            {
                response.length!==0 && <>
                    <h4 style={{marginBottom: "10px", marginTop: "10px"}}>Response:</h4>
                    <div style={{display: "flex", flexDirection: "column", height: '50vh', overflow: "auto"}}>
                        {
                            response.map(text => (
                                <p style={{marginBottom: "5px"}} key={uuid()}>{text}</p>
                            ))
                        }
                    </div>
                </>
            }
            <p style={{marginTop: "10px", fontSize: "14px", color: "#888888"}}>AI can make mistakes. Verify information for important decisions.</p>
        </motion.div>
    )
}

export default Chat