'use client'

// import Header from '@/app/(app)/Header'
import Graphs from '@/app/(part)/Graphs'
import Profiling from '@/app/(part)/Profiling'
import TabOptions from '@/components/TabOptions'
import { Tab } from '@/constants/committee'
import { useState } from 'react'

// export const metadata = {
//     title: 'BEA - Dashboard',
// }

const Dashboard = () => {
    const [toogleGraph, setGraph] = useState(0)
    const [option, setOption] = useState(Tab)

    return (
        <>
            {/* <Header title="Dashboard" /> */}
            <div className="py-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <TabOptions
                        option={option}
                        setOption={setOption}
                        setGraph={setGraph}
                    />

                    <Graphs active={toogleGraph} />
                    <Profiling active={toogleGraph} />
                </div>
            </div>
        </>
    )
}

export default Dashboard
