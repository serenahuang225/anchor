import React, { useContext, useState } from 'react'
import Chat from '../components/budget/Chat'
import { Cell, Label, Pie, PieChart, } from 'recharts'
import { UserContext } from "../context/UserContext"
import categoryColors from '../styles/categoryColors'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const getColor = (category, categories) => {
    let finalColor = "#ae6bbd"
    categories.forEach((val, index) => {
        if (val===category) {
            finalColor = categoryColors[index]
        }
    })
    return finalColor
}

const BudgetSheet = () => {
    const {userData, budget} = useContext(UserContext)

    const initial = () => {
        let output = {...budget.categories}
        Object.entries(budget.categories).forEach(val => {
            output[val[0]] = false
        })
        return output
    }

    const renderBudgetCategories = Object.entries(budget.categories).map(val => {
        return <div className='flip-card'>
            <div className='flip-card-inner'>
                <div className='b-card'>
                    <PieChart width={100} height={100} margin={{bottom: 10}}>
                        <Pie
                            stroke="none"
                            data={[{value: val[1]}, {value: userData.category_budgets[val[0]]-val[1]}]}
                            innerRadius={24}
                            outerRadius={42}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            <Cell fill={getColor(val[0], userData.categories)} />
                            <Cell fill={userData.category_budgets[val[0]]-val[1]<0?"#faf":"#eaeaea"} />

                            <Label
                                style={{fill: '#116566'}}
                                value={`${(val[1]/userData.category_budgets[val[0]]*100).toFixed(0)}%`} 
                                position="center" fontSize='16px'
                            />
                        </Pie>
                    </PieChart>
                    <h5>{val[0]}</h5>
                    <p className='emphasize' style={{marginTop: "2px"}}>${val[1].toFixed(2)}</p>
                </div>
            </div>
        </div>
    })


    // const [mouseHovering, setMouseHovering] = useState(initial())
    // const handleMouseEnter = catName => {
    //     setMouseHovering(prev =>({...prev, [catName]: true}))
    //     setInput(0)
    // }
    // const handleMouseLeave = catName => {
    //     setMouseHovering(prev => ({...prev, [catName]: false}))
    // }
    // const db = getFirestore()
    // const handleSubmit = async catName => {
    //     if (input!==0) {
    //         await setDoc(doc(db, "users", userData.UID), {category_budgets: {...userData.category_budgets, [catName]: Number(input)}}, { merge: true }).then(() => {
    //             setInput(0)
    //             handleMouseLeave(catName)
    //         })
    //     }
    // }
    // const [input, setInput] = useState(0)
    // const renderBudgetCategories = Object.entries(budget.categories).map(val => {
    //     return <div onMouseEnter={() => handleMouseEnter(val[0])} onMouseLeave={() => handleMouseLeave(val[0])}
    //         className='flip-card'>
    //         <div className={`flip-card-inner ${mouseHovering[val[0]] && 'flipped'}`}>
    //             <div className='b-card flip-card-back'> 
    //                 <div style={{backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center"}}>
    //                     <p>Current budget:</p>
    //                     <p className='emphasize'>${userData.category_budgets[val[0]].toFixed(2)}</p>
    //                     <input 
    //                         type='number'
    //                         className='small'
    //                         value={input}
    //                         onChange={e => setInput(e.target.value)}
    //                     />
    //                     <button onClick={() => handleSubmit(val[0])} className='not-button'><p className='hover-text'>Change</p></button>
    //                 </div>
    //             </div>
    //             <div className='b-card flip-card-front'>
    //                 {
    //                     !mouseHovering[val[0]] &&
    //                     <>
    //                 <PieChart width={100} height={100} margin={{bottom: 10}}>
    //                     <Pie
    //                         stroke="none"
    //                         data={[{value: val[1]}, {value: userData.category_budgets[val[0]]-val[1]}]}
    //                         innerRadius={24}
    //                         outerRadius={42}
    //                         paddingAngle={2}
    //                         dataKey="value"
    //                     >
    //                         <Cell fill={getColor(val[0], userData.categories)} />
    //                         <Cell fill={userData.category_budgets[val[0]]-val[1]<0?"#faf":"#eaeaea"} />

    //                         <Label
    //                             style={{fill: '#116566'}}
    //                             value={`${(val[1]/userData.category_budgets[val[0]]*100).toFixed(0)}%`} 
    //                             position="center" fontSize='16px'
    //                         />
    //                     </Pie>
    //                 </PieChart>
    //                 <h5>{val[0]}</h5>
    //                 <p className='emphasize' style={{marginTop: "2px"}}>${val[1].toFixed(2)}</p>
    //                     </>
    //                 }
    //             </div>
    //         </div>
    //     </div>
    // })

    return (
        <div className='dashboard'>
            <div style={{width: "50vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <div>

                <h4 style={{marginBottom: "20px"}}>This Month's Spending by Budget Category</h4>
                <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", width: "500px"}}>
                {renderBudgetCategories}
                </div>
                <div className='e-card'>
                <motion.div
                    className='fit-content'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link to="/budget-categories" className='nav-link'>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <h4 style={{margin: 0}}>Manage budget categories</h4>
                        <svg
                            xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
                            width="30px" height="30px" id="svg" version="1.1" 
                            style={{fill: "#116566", rotate: "180deg", margin: 0}} viewBox="0 0 512 512" xmlSpace="preserve"
                        >
                            <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "/>
                        </svg>
                        </div>
                    </Link>
                </motion.div>
                </div>
                </div>
            </div>
            <Chat />
        </div>
    )
}

export default BudgetSheet