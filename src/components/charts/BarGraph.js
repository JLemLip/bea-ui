'use client'

import React, { useEffect, useState } from 'react'

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

const BarGraph = ({ data }) => {
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(100)

    useEffect(() => {
        const flat =
            data?.flatMap(item =>
                [item?.first, item?.second, item?.third].filter(
                    val => typeof val === 'number',
                ),
            ) ?? []

        setMin(Math.floor(Math.min(...flat)) - 5)
        setMax(Math.ceil(Math.max(...flat)) + 5)
    }, [data])

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
                    <XAxis dataKey="branchName" />
                    <YAxis domain={[min, max]} />
                    <Tooltip
                        formatter={(value, name) => [
                            `${parseFloat(value).toFixed(2)} pts`,
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
                        activeBar={<Rectangle fill="#8884d8" stroke="blue" />}
                    />
                    <Bar
                        dataKey="second"
                        fill="#82ca9d"
                        activeBar={<Rectangle fill="#82ca9d" stroke="blue" />}
                    />
                    <Bar
                        dataKey="third"
                        fill="#393E46"
                        activeBar={<Rectangle fill="#393E46" stroke="blue" />}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default BarGraph
