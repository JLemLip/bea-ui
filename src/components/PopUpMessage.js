import React, { useEffect } from 'react'
import { FaChartLine } from 'react-icons/fa'

const PopupMessage = ({ message, visible }) => {
    useEffect(() => {}, [message, visible])

    if (!visible) return null

    return (
        <div className="fixed bottom-5 right-5 flex items-center gap-3 bg-slate-800 text-white px-5 py-3 rounded-lg shadow-lg animate-slide-in z-50">
            <FaChartLine className="text-sky-400 text-xl" />
            <span className="text-sm">{message}</span>
        </div>
    )
}

export default PopupMessage
