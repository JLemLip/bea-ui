import BarGraph from '@/components/charts/BarGraph'
import TabsContainer from '@/components/vertical-tabs/TabContainer'
import { useAuth } from '@/hooks/auth'

const Graphs = ({ active }) => {
    const { user } = useAuth()
    console.log(user)

    if (active == 0) {
        return (
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6">
                    {user.userAccessLevel == 3 ? <TabsContainer /> : null}
                    {user.userAccessLevel == 1 ? (
                        <BarGraph data={data} />
                    ) : null}
                </div>
            </div>
        )
    }
    return null
}

export default Graphs
