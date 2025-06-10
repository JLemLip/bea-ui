import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TabContent = ({ content }) => {
    return (
        <div className="w-3/4 p-6">
            <AnimatePresence mode="wait">
                <motion.div
                    key={content}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-800 text-lg">
                    {content}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default TabContent
