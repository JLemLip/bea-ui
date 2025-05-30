import Charting from '../(app)/dashboard/components/Charting'

const Graphs = ({ active }) => {
    if (active == 0) {
        return (
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6">
                    <Charting />
                </div>
            </div>
        )
    }
    return null
}

export default Graphs
