'use client'
import React from 'react'
import {
    Radar,
    RadarChart,
    PolarGrid,
    Legend,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from 'recharts'

const data = [
    {
        subject: 'Productivity',
        A: 120,
        B: 110,
        fullMark: 150,
    },
    {
        subject: 'Teamwork',
        A: 98,
        fullMark: 150,
    },
    {
        subject: 'Creativity',
        A: 86,
        fullMark: 150,
    },
    {
        subject: 'Punctuality',
        A: 99,
        fullMark: 150,
    },
    {
        subject: 'Problem Solving',
        A: 85,
        fullMark: 150,
    },
    {
        subject: 'Communication',
        A: 65,
        fullMark: 150,
    },
]

const RadarGraph = () => {
    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} />
                    <Radar
                        name="Mike"
                        dataKey="A"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                    />

                    <Legend />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default RadarGraph
