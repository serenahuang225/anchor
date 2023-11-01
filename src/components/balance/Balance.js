import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { motion } from 'framer-motion'

const numToMonth = (num) => {
    let monthName = ''
    switch (num) {
        case 0:
            monthName = "Jan"
            break
        case 1:
            monthName = "Feb"
            break
        case 2:
            monthName = "Mar"
            break
        case 3:
            monthName = "Apr"
            break
        case 4:
            monthName = "May"
            break
        case 5:
            monthName = "Jun"
            break
        case 6:
            monthName = "Jul"
            break
        case 7:
            monthName = "Aug"
            break
        case 8:
            monthName = "Sep"
            break
        case 9:
            monthName = "Oct"
            break
        case 10:
            monthName = "Nov"
            break
        case 11:
            monthName = "Dec"
            break
        default:
            monthName = "Dec"
    }

    return monthName
}

const Balance = () => {
    const {balances} = useContext(UserContext)

    const {height,width} = useWindowDimensions()

    const customXAxis = ({x, y, payload}) => {
        const monthName = numToMonth(payload.value)
        
        return <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#444">
            {monthName}
            </text>
        </g>
    }
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{display: "flex", flexDirection: "column", padding: "10px", borderRadius: "5px", backgroundColor: "white"}}>
                    <p>Month: {numToMonth(label)}</p>
                    <p>Balance: ${(Math.round(payload[0].value*100)/100).toFixed(2)}</p>
                </div>
            );
        }
      
        return null;
    };

    return (
        <motion.div className='card' initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                {/* <motion.div
                    className='fit-content'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                > */}
                    {/* <Link to="/transactions" className='nav-link'> */}
                        <h4>Balance History</h4>
                    {/* </Link> */}
                {/* </motion.div> */}
                <h5>${balances && (Math.round(balances[balances.length-1]["balance"]*100)/100).toFixed(2)}</h5>
            </div>

            <AreaChart data={balances} height={height/2-170} width={width/2-140} 
                margin={{
                    top: 20,
                    left: -24,
                    right: 4
                }}>
                <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor={"#289196"}
                            stopOpacity={0.77}
                        />
                        <stop
                            offset="65%"
                            stopColor={"#BCEDEF"}
                            stopOpacity={0.77}
                        />
                        <stop
                            offset="95%"
                            // stopColor={"#000"}
                            stopColor={"#ffffff"}
                            stopOpacity={0.77}
                        />
                    </linearGradient>
                </defs>
                <Tooltip content={<CustomTooltip />} />
                <YAxis />
                <CartesianGrid vertical={false} />
                <Area 
                    type="monotone"
                    dataKey="balance"
                    dot={true}
                    stroke={"#289196"}
                    fillOpacity={1}
                    fill="url(#colorBalance)"
                />
                <XAxis dataKey="month" tick={customXAxis} />
            </AreaChart>
        </motion.div>
    )
}

export default Balance