import React, { useEffect, useState } from 'react'

const messages = [
    'Loading graph...',
    'Fetching insights...',
    'Preparing data...',
    'Crunching numbers...',
    'Drawing trends...',
    'Hang tight, almost there...',
]

const WavyGraphLoader = () => {
    const bars = [0, 1, 2, 3, 4]
    const [currentMessage, setCurrentMessage] = useState(messages[0])

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * messages.length)
            setCurrentMessage(messages[randomIndex])
        }, 2000) // Change message every 2 seconds

        return () => clearInterval(interval) // Cleanup on unmount
    }, [])

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100%',
                backgroundColor: '#fff',
            }}>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: 6,
                    height: 60,
                }}>
                {bars.map((bar, idx) => (
                    <div
                        key={idx}
                        style={{
                            width: 10,
                            height: 20,
                            backgroundColor: '#8884d8',
                            borderRadius: 3,
                            animation: `wave 1.2s ease-in-out infinite`,
                            animationDelay: `${idx * 0.2}s`,
                        }}
                    />
                ))}
            </div>

            <p style={{ marginTop: 20, fontSize: 16, color: '#4f46e5' }}>
                {currentMessage}
            </p>

            <style>{`
                @keyframes wave {
                    0%, 100% {
                        transform: scaleY(0.5);
                        opacity: 0.6;
                    }
                    50% {
                        transform: scaleY(1.4);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    )
}

export default WavyGraphLoader
