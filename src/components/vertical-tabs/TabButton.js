import React from 'react'
import classNames from 'classnames'

const TabButton = ({ label, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={classNames(
                'w-full text-left px-4 py-3 rounded-lg transition-all duration-300',
                {
                    'bg-white text-blue-600 font-semibold shadow-md': isActive,
                    'text-gray-700 hover:bg-white hover:text-blue-500':
                        !isActive,
                },
            )}>
            {label}
        </button>
    )
}

export default TabButton
