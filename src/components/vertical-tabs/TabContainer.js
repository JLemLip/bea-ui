import React, { useState } from 'react'
import TabList from './TabList'
import TabContent from './TabContent'
import BMOverview from '../../app/(app)/dashboard/components/BMOverview'
import BMComparing from '../../app/(app)/dashboard/components/BMComparing'

const tabs = [
    { label: 'Overview', content: <BMOverview /> },
    { label: 'Compare', content: <BMComparing /> },
]

const TabsContainer = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <div className="flex w-full mx-auto rounded-xl overflow-hidden ">
            <TabList
                tabs={tabs}
                activeIndex={activeIndex}
                onTabClick={setActiveIndex}
            />
            <TabContent content={tabs[activeIndex].content} />
        </div>
    )
}

export default TabsContainer
