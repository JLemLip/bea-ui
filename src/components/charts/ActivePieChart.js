'use client'

import React, { useState } from 'react'
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts'

const data = [
    { name: 'Office Management', value: 13.5, overall_rate: 15 },
    { name: 'Park Management', value: 26.5, overall_rate: 30 },
    { name: 'Interment Facilitation', value: 18, overall_rate: 20 },
    { name: 'Park Development', value: 13.25, overall_rate: 15 },
    { name: 'Warehouse Management', value: 17, overall_rate: 20 },
]

const renderActiveShape = props => {
    const total_ratings = data.reduce((sum, item) => sum + item.value, 0)

    const RADIAN = Math.PI / 180
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        // percent,
        value,
    } = props
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const sx = cx + (outerRadius + 10) * cos
    const sy = cy + (outerRadius + 10) * sin
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const textAnchor = cos >= 0 ? 'start' : 'end'

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#000">
                <tspan x={cx} dy="-0.4em">
                    Total Ratings
                </tspan>
                <tspan x={cx} dy="1.8em">
                    {total_ratings + '%'}
                </tspan>
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill="#8884d8"
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fill}
                fill="none"
            />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#333">
                {`Rating ${value.toFixed(2)}%`}
            </text>
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="#999">
                {`${payload.name} (${payload.overall_rate}%)`}
            </text>
        </g>
    )
}

const ActivePie = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const onPieEnter = (_, index) => {
        setActiveIndex(index)
    }

    return (
        <div
            style={{
                width: '100%',
                height: 400,
                overflow: 'visible',
                zIndex: 9999,
            }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#82ca9d"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default ActivePie
