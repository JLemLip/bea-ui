const TabOptions = ({ option = [], setOption, setGraph }) => {
    const changeActive = id => {
        setOption(
            option.map(opt => {
                if (opt.id === id) return { ...opt, active: true }
                else return { ...opt, active: false }
            }),
        )
        setGraph(id)
    }

    const choices = option.map(obj => {
        const selected = obj.active
            ? 'px-4 py-2 cursor-pointer border-b-2 border-blue-500 text-black font-semibold'
            : 'px-4 py-2 cursor-pointer text-gray-500 hover:text-blue-500'
        return (
            <button
                key={obj.id}
                className={selected}
                onClick={() => changeActive(obj.id)}>
                {obj.label}
            </button>
        )
    })

    return (
        <div className="flex justify-center items-center">
            <div className="flex space-x-2 border-b">{choices}</div>
        </div>
    )
}

export default TabOptions
