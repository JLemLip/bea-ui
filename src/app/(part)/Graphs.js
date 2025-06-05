import TabsContainer from '@/components/vertical-tabs/TabContainer'

const Graphs = ({ active }) => {
    if (active == 0) {
        return (
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6">
                    <TabsContainer />
                </div>
            </div>
        )
    }
    return null
}

export default Graphs
