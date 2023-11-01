import React from 'react'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'

const Back = ({noStyle=false}) => {
    const navigate = useNavigate()

    return (
        <div className={noStyle ? 'back-container2' : 'back-container'}>
            <motion.div
                className='back fit-content'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate(-1)}
            >
                <svg
                    xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
                    width="50px" height="50px" id="svg" version="1.1" 
                    style={{fill: "#116566"}} viewBox="0 0 512 512" xmlSpace="preserve"
                >
                    <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "/>
                </svg>
            </motion.div>
        </div>
    )
}

export default Back