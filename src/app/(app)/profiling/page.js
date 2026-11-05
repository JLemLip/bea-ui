'use client'

import React, { useEffect, useState } from 'react'
import Branch from './components/Branch'
import Department from './components/Department'
import { HiOutlineOfficeBuilding, HiOutlineUserGroup } from 'react-icons/hi'
import { LucidePanelLeftClose, LucidePanelLeftOpen } from 'lucide-react'

const ProfilingPage = () => {
    const [activeMenu, setActiveMenu] = useState('')
    const [isPanelMinimized, setIsPanelMinimized] = useState(false)

    const menus = [
        {
            name: 'Branch',
            icon: HiOutlineOfficeBuilding,
        },
        {
            name: 'Department',
            icon: HiOutlineUserGroup,
        },
    ]

    const renderActiveComponent = () => {
        switch (activeMenu) {
            case 'Branch':
                return <Branch />
            case 'Department':
                return <Department />
            default:
                return (
                    <>
                        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                            Profiling
                        </h1>
                        <p className="text-gray-600">
                            Welcome to the profiling page.
                        </p>
                        <p className="text-gray-600 mt-2">
                            Select a menu option to get started.
                        </p>
                    </>
                )
        }
    }

    const togglePanel = () => {
        setIsPanelMinimized(!isPanelMinimized)
    }

    useEffect(() => {
        // initial setup
        setActiveMenu(menus[0].name)
    }, [])

    return (
        <>
            <div className="max-w-7xl mx-auto mt-0 p-4 sm:p-6 lg:p-8">
                <div className="flex gap-6">
                    {/* Collapsible Sidebar */}
                    <div
                        className={`rounded-2xl shadow-sm bg-white p-4 transition-all duration-300 ${
                            isPanelMinimized ? 'w-20' : 'w-80'
                        }`}>
                        <div className="flex flex-col space-y-4">
                            {/* Toggle Button */}
                            <div className="flex justify-end">
                                <button
                                    onClick={togglePanel}
                                    className={`p-2 rounded-lg hover:bg-gray-100 transition-colors flex 
                                        ${isPanelMinimized ? 'w-full justify-center items-center' : 'w-auto'}
                                        `}
                                    title={
                                        isPanelMinimized
                                            ? 'Expand panel'
                                            : 'Minimize panel'
                                    }>
                                    {isPanelMinimized ? (
                                        <LucidePanelLeftOpen className="w-5 h-5 text-gray-600" />
                                    ) : (
                                        <LucidePanelLeftClose className="w-5 h-5 text-gray-600" />
                                    )}
                                </button>
                            </div>

                            {/* Menu Items */}
                            {menus.map((menu, index) => {
                                const IconComponent = menu.icon
                                const isActive = activeMenu === menu.name

                                return (
                                    <button
                                        key={index}
                                        className={`flex items-center gap-3 py-3 px-3 rounded-lg transition-all duration-200 ${
                                            isActive
                                                ? 'bg-gray-100 text-gray-700 shadow-sm'
                                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                                        } ${isPanelMinimized ? 'justify-center' : 'justify-start'}`}
                                        onClick={() => setActiveMenu(menu.name)}
                                        title={
                                            isPanelMinimized ? menu.name : ''
                                        }>
                                        <IconComponent
                                            className={`flex-shrink-0`}
                                        />
                                        {!isPanelMinimized && (
                                            <span className="font-medium text-sm">
                                                {menu.name}
                                            </span>
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="rounded-2xl shadow-sm bg-white p-6 flex-1">
                        {renderActiveComponent()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilingPage
