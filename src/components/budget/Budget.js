import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import categoryColors from '../../styles/categoryColors'
import { v4 as uuid} from 'uuid'
import Category from "../transactions/Category"

const getColor = (category, categories) => {
    let finalColor = "#ae6bbd"
    categories.forEach((val, index) => {
        if (val===category) {
            finalColor = categoryColors[index]
        }
    })
    return finalColor
}

const Budget = () => {
    const {budget, userData} = useContext(UserContext)

    // console.log(budget)

    const {width} = useWindowDimensions()

    const renderCategories = () => {
        const output = []
        const cats = []

        let index = 0

        for (const cat in budget.categories) {
            const color = getColor(cat, userData.categories)
            const w = (budget.categories[cat]/budget.totalSpending)*(width/2-140)
            cats.push(cat)

            if (index+1===Object.keys(budget.categories).length) {
                output.push(
                    <div style={{ borderTopRightRadius: "5px", borderEndEndRadius: "5px", height: "35px", width: w, backgroundColor: color}}></div>
                )
            } else if (index===0) {
                output.push(
                    <div style={{ borderTopLeftRadius: "5px", borderEndStartRadius: "5px", height: "35px", width: w, backgroundColor: color}}></div>
                )
            } else {
                output.push(
                    <div style={{height: "35px", width: w, backgroundColor: color}}></div>
                )
            }

            index++
        }

        return <div>
            <div style={{display: "flex"}}>
                {output}
            </div>
            <div style={{display: "flex", marginTop: "5px"}}>
            { cats.map(c => <div style={{marginRight: "15px"}} key={uuid()}><Category smaller={true} category={c} /></div> ) }
            </div>
        </div>
    }

    if (budget) {
        return (
            <motion.div initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className='card'>
                <motion.div
                    className='fit-content'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link to="/budget" className='nav-link'>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <h4 style={{margin: 0}}>Planning Your Finances</h4>
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
    
                <div style={{marginTop: "20px", marginBottom: "10px", width: width/2-140, display: "flex", flexDirection: 'row', justifyContent: 'space-between'}}>
                    <p className='error'>This month's spending</p>
                    <p className='description'>${budget.totalSpending} spent of ${(Math.round(userData.monthlyBudget*100)/100).toFixed(2)} limit</p>
                </div>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", width: width/2-140, height: "35px", backgroundColor: "#EAEAEA", borderRadius: "5px"}}>
                    <div style={{marginRight: "10px", borderRadius: "5px", backgroundColor: "#116566", height: "35px", width: (width/2-140)*(budget.totalSpending/userData.monthlyBudget)}}></div>
                    <p className='description'>{(budget.totalSpending/userData.monthlyBudget*100).toFixed(2)}%</p>
                </div>
    
                <div style={{marginTop: "20px", marginBottom: "10px", width: width/2-140, display: "flex", flexDirection: 'row', justifyContent: 'space-between'}}>
                    <p className='error'>Monthly spending categories</p>
                </div>
                {renderCategories()}
    
            </motion.div>
        )
    } else {
        return null
    }
}

export default Budget