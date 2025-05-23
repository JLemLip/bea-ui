'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'

// const data = [
//     {
//         name: 'Baesa',
//         first: 87.5,
//         second: 88,
//         third: 88.25,
//     },
//     {
//         name: 'Balagtas',
//         first: 85.25,
//         second: 85.25,
//         third: 85.25,
//     },
//     {
//         name: 'Binan',
//         first: 90.5,
//         second: 90.5,
//         third: 90.5,
//     },
// ]

const BarGraph = () => {
    const [data, setData] = useState([])
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(100)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentYear = new Date().getFullYear()
                const user_id = 1462

                const res = await axios.get(
                    `http://localhost:8000/api/dashboard/${currentYear}/${user_id}`,
                )
                const apiData = res.data
                console.log(apiData)

                // Optional: shape or transform data if needed
                setData(apiData)

                // Compute dynamic min and max for Y axis
                const flat = apiData.flatMap(item => [
                    item.first,
                    item.second,
                    item.third,
                ])
                setMin(Math.floor(Math.min(...flat)) - 5)
                setMax(Math.ceil(Math.max(...flat)) + 5)
            } catch (err) {
                console.error('Failed to load chart data:', err)
            }
        }

        fetchData()
    }, [])

    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[min, max]} />
                    <Tooltip
                        formatter={(value, name) => [
                            `${value.toFixed(2)} pts`,
                            `${name} trime`,
                        ]}
                        labelFormatter={label => `Branch: ${label}`}
                    />
                    <Legend
                        layout="horizontal"
                        verticalAlign="top"
                        align="center"
                        wrapperStyle={{ paddingBottom: 10 }}
                    />
                    <Bar
                        dataKey="first"
                        fill="#8884d8"
                        activeBar={<Rectangle fill="pink" stroke="blue" />}
                    />
                    <Bar
                        dataKey="second"
                        fill="#82ca9d"
                        activeBar={<Rectangle fill="gold" stroke="purple" />}
                    />
                    <Bar
                        dataKey="third"
                        fill="#393E46"
                        activeBar={<Rectangle fill="beige" stroke="purple" />}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default BarGraph
