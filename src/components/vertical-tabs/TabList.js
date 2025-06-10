import React from 'react'
import TabButton from './TabButton'

const TabList = ({ tabs, activeIndex, onTabClick }) => {
    return (
        <div className="w-1/4 bg-gray-50 p-4 border-r">
            {tabs.map((tab, index) => (
                <TabButton
                    key={index}
                    label={tab.label}
                    isActive={activeIndex === index}
                    onClick={() => onTabClick(index)}
                />
            ))}
        </div>
    )
}

export default TabList
