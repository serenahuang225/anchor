import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { motion } from 'framer-motion'
import categoryColors from '../styles/categoryColors'
import { Cell, Label, Legend, Pie, PieChart, Tooltip } from 'recharts'

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

    const renderBudgetCats = Object.keys(userData.category_budgets).map(key => {
        const color = getColor(key, userData.categories)
        return <div key={key} style={{marginBottom: "20px"}}>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            <div style={{backgroundColor: color, marginRight: "5px", height: "10px", width: "10px", borderRadius: "10px"}} />
            <p>{key}: <span className='emphasize'>${userData.category_budgets[key].toFixed(2)}</span></p>
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

    const resArray = Object.keys(userData.category_budgets).map((key) => ({"category": key, "value": userData.category_budgets[key]}));

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

    return (
        <div className='dashboard'>
            <div className='t-card' style={{width: "45vw", overflow: "auto", paddingBottom: "20px"}}>
                <h4 style={{marginBottom: "30px"}}>Monthly Budgets for Each Category</h4>
                {renderBudgetCats}
            </div>
            <div className='t-card'>
                <h4 style={{marginBottom: "30px"}}>Monthly Budget</h4>
                <PieChart  width={440} height={420} margin={{top: -20}}>
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
                                value={`Total monthly budget: $${userData.monthlyBudget.toFixed(0)}`} 
                                position="center" fontSize='20px'
                            />
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend align="center" margin={{top: 20, bottom: 20}} />
                </PieChart>
            </div>
        </div>
    )
}

export default BudgetCategories