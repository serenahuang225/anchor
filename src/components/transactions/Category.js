import React, { useContext } from 'react'
import categoryColors from '../../styles/categoryColors'
import { UserContext } from '../../context/UserContext'

const getColor = (category, categories) => {
    let finalColor = "#ae6bbd"
    categories.forEach((val, index) => {
        if (val===category) {
            finalColor = categoryColors[index]
        }
    })
    return finalColor
}

const Category = ({category, smaller=false}) => {
    const {userData} = useContext(UserContext)
    const color = getColor(category, userData.categories)

    return (
        <div className={smaller? 'smaller-category' : 'category'}>
            <div style={ smaller ?
                {marginRight: "5px", height: "10px", width: "10px", borderRadius: "10px", backgroundColor: color} :
                {marginRight: "15px", height: "10px", width: "10px", borderRadius: "10px", backgroundColor: color}
            }/>
            <p>{category}</p>
        </div>
    )
}

export default Category