import React from 'react'
import Nav from './Nav'
import Back from './Back'
import { motion } from 'framer-motion'

const WrapNav = ({component, isBack=false}) => {
    return <motion.div
        initial={{opacity: 0}}
        exit={{opacity: 0}}
        animate={{opacity: 1}}
    >
        {isBack ? <Back /> : <Nav/>}
        {component}
    </motion.div>
}

export default WrapNav