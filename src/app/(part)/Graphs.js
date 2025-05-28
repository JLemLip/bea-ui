import DashboardCharting from '../(app)/dashboard/components/DashboardCharting'

const Graphs = ({ active }) => {
    if (active == 0) {
        return (
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 bg-white border-b border-gray-200">
                    Year Selection and Chart Dashboard Header IF BM then show
                    branch ratings for current trime, with option to select
                    different year and trime. if exec then show department
                    score, if super admin show overall
                </div>

                <div className="p-6">
                    <DashboardCharting />
                </div>
            </div>
        )
    }
    return null
}

export default Graphs
