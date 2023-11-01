import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>

            <motion.div className='nav-container'
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -50}} 
                initial={{opacity: 0, y: -50}} 
                transition={{duration: 0.5}}
                key="nav-container-id"
            >
                <img 
                    src="/assets/anchor-logo.png"
                    className='logo'
                    alt='logo'
                />
                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <motion.div
                        className='fit-content'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{backgroundColor: "#C6ECEC",paddingRight: "10px", paddingLeft: "10px", paddingTop: "4px",paddingBottom: "4px", borderRadius: "5px"}}
                        >
                        <Link to="/login" className='nav-link'>
                            <h5 className='s-font'>Log in</h5>
                        </Link>
                    </motion.div>
                    <motion.div
                        className='fit-content'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{paddingRight: "10px", paddingLeft: "10px", paddingTop: "4px",paddingBottom: "4px", borderRadius: "5px"}}
                    >
                        <Link to="/signup" className='nav-link'>
                            <h5 className='s-font'>Sign up</h5>
                        </Link>
                    </motion.div>
                </div>


            </motion.div>
            <div className='dashboard'>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", marginLeft: "150px"}}>
                    <img
                        src='/assets/logo-text.png'
                        style={{height: "64px", width: "fit-content", marginBottom: "20px"}}
                    />
                    <h5>The #1 free personal finance manager</h5>
                    <motion.div
                        className='fit-content'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{marginTop: "30px", backgroundColor: "#228283",paddingRight: "10px", paddingLeft: "10px", paddingTop: "4px",paddingBottom: "4px", borderRadius: "5px"}}
                    >
                        <Link to="/signup" className='nav-link'>
                            <h2 style={{color: "white", letterSpacing: "1px"}}>Get started</h2>
                        </Link>
                    </motion.div>
                </div>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", height: "100%"}}>
                    <img
                        src='/assets/anchor-rope.png'
                        style={{height: "504px", width: "fit-content", marginRight: "100px"}}
                    />
                </div>
            
            </div>
        </div>
    )
}

export default Home