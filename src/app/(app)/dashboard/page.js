import Header from '@/app/(app)/Header'
import BarGraph from '@/components/charts/BarGraph'

export const metadata = {
    title: 'BEA - Dashboard',
}

const Dashboard = () => {
    return (
        <>
            <Header title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            Year Selection and Chart Dashboard Header IF BM then
                            show branch ratings for current trime, with option
                            to select different year and trime. if exec then
                            show department score, if super admin show overall
                        </div>

                        <div className="p-6">
                            <BarGraph />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
