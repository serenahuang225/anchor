import React from 'react'
import "./nav.css"
import { motion } from "framer-motion"
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <motion.div className='nav-container'
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -50}} 
            initial={{opacity: 0, y: -50}} 
            transition={{duration: 0.5}}
            key="nav-container-id"
        >
            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <img 
                    src="/assets/anchor-logo.png"
                    className='logo'
                    alt='logo'
                />
                <h1>Anchor Dashboard</h1>
            </div>

            <motion.div
                className='fit-content'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
            <Link to="/profile" className='nav-link'>
            <svg id="Layer_1" height={30} width={30} viewBox="0 0 24 24" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g>
                <circle className="st1" cx="12" cy="12" r="11.3"/><path className="st1" d="M12,14.9c-3.5,0-6.5,2-8,5c2,2.1,4.9,3.3,8,3.3s6-1.3,8-3.3C18.5,17,15.5,14.9,12,14.9z"/><circle className="st1" cx="12" cy="8.7" r="3.6"/></g></svg>
            </Link>
            </motion.div>

        </motion.div>
    )
}

export default Nav