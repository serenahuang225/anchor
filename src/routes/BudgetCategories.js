import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { motion } from 'framer-motion'
import categoryColors from '../styles/categoryColors'
import { Cell, Label, Legend, Pie, PieChart, Tooltip } from 'recharts'
import Category from "../components/transactions/Category"
import {v4 as uuid} from 'uuid'

const getColor = (category, categories) => {
    let finalColor = "#ae6bbd"
    categories.forEach((val, index) => {
        if (val===category) {
            finalColor = categoryColors[index]
        }
    })
    return finalColor
}

const BudgetCategories = () => {
    const {userData} = useContext(UserContext)

    const newArray = () => {
        const arr = Object.keys(userData.category_budgets)
        arr.push(arr.splice(arr.indexOf("Miscellaneous"), 1)[0])
        
        return arr
    }

    const resArray = newArray().map((key) => ({"category": key, "value": userData.category_budgets[key]}));


    const renderBudgetCats = resArray.map(key => {
        const color = getColor(key.category, userData.categories)
        return <div key={key.category} style={{marginBottom: "20px"}}>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            <div style={{backgroundColor: color, marginRight: "5px", height: "10px", width: "10px", borderRadius: "10px"}} />
            <p>{key.category}: <span className='emphasize'>${userData.category_budgets[key.category].toFixed(2)}</span></p>
            </div>

            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <input placeholder='New budget' type='number' />
                <motion.div
                    className='back fit-content'
                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                >
                    <svg
                        xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
                        width="40px" height="40px" id="svg" version="1.1" className='rotate'
                        viewBox="0 0 512 512" xmlSpace="preserve" style={{fill: "#116566"}}
                    >
                        <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "/>
                    </svg>
                </motion.div>
            </div>
        </div>
    })
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            console.log(label, payload)
            return (
                <div style={{boxShadow: "0 0 15px 1px rgba(0,0,0,.3)", display: "flex", flexDirection: "column", padding: "10px", borderRadius: "5px", backgroundColor: "white"}}>
                    <p>Category: {payload[0].payload.category}</p>
                    <p>Budget: ${(payload[0].value).toFixed(2)}</p>
                    <p className='emphasize'>Percent: {(payload[0].value/userData.monthlyBudget*100).toFixed(2)}%</p>
                </div>
            );
        }
        return null;
    };

    const renderCategories = () => {
        return <div style={{display: "flex", marginTop: "20px", flexWrap: "wrap", width: "400px", alignItems: "center", justifyContent: "center"}}>
            { resArray.map(c => <div style={{marginRight: "15px"}} key={uuid()}><Category smaller={true} category={c.category} /></div> ) }
        </div>
    }

    return (
        <div className='dashboard'>
            <div className='t-card' style={{width: "45vw", overflow: "auto", paddingBottom: "20px", display:"flex", alignItems: "center", flexDirection: "column"}}>
                <h4 style={{marginBottom: "30px"}}>Monthly Budgets for Each Category</h4>
                {renderBudgetCats}
            </div>
            <div className='t-card' style={{ display: "flex", flexDirection: "column", alignItems: "center",justifyContent:"center"}}>
                <h4 style={{marginBottom: "10px"}}>Monthly Budget</h4>
                <PieChart  width={440} height={380}>
                    <Pie
                        stroke="none"
                        data={resArray}
                        innerRadius={140}
                        outerRadius={180}
                        paddingAngle={1}
                        dataKey="value"
                    >
                        {
                            resArray.map(obj => (
                                <Cell name={obj.category} fill={getColor(obj.category, userData.categories)} />
                            ))
                        }
                        <Label
                            style={{fill: '#116566'}}
                            value={`Total Monthly Budget:`} 
                            position='centerBottom' fontSize='20px'
                        />
                        <Label
                            style={{fill: '#116566'}}
                            value={`$${userData.monthlyBudget.toFixed(0)}`} 
                            position="centerTop" fontSize='20px'
                            dy={15}
                        />
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                </PieChart>
                {renderCategories()}
            </div>
        </div>
    )
}

export default BudgetCategories