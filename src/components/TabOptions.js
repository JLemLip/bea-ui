const TabOptions = ({ option = [], setOption }) => {
    const changeActive = id => {
        setOption(
            option.map(obj => {
                if (obj.id === id) {
                    return { ...obj, active: true }
                } else {
                    return { ...obj, active: false }
                }
            }),
        )
    }

    const choices = option.forEach(obj => {
        const selected = obj.active
            ? 'px-4 py-2 border-b-2 border-blue-500 text-blue-600 font-semibold'
            : 'px-4 py-2 text-gray-500 hover:text-blue-500'
        return (
            <button className={selected} onClick={changeActive(obj.id)}>
                {obj.label}
            </button>
        )
    })

    return <div className="flex space-x-2 border-b">{choices}</div>
}

export default TabOptions
