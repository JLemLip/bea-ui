'use client'

import GraphLoading from '@/components/charts/GraphLoading'
import Input from '@/components/Input'
import BarGraph from '@/components/charts/BarGraph'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { useState } from 'react'
import { useLibraries } from '@/stores/dashboard'
import { useAuth } from '@/hooks/auth'
import AreaLine from '@/components/charts/AreaLineGraph'
import BranchRatingsPie from '@/components/charts/BranchRatingsPie'
import DotLine from '@/components/charts/DotLineGraph'
import RadarGraph from '@/components/charts/RadarGraph'
import TwoLevelPie from '@/components/charts/TwoLevelPieChart'
import ActivePie from '@/components/charts/ActivePieChart'

const SuperAdmin = () => {
    const { user } = useAuth({ middleware: 'auth' })

    const [year, setYear] = useState(new Date().getFullYear())
    const [trime, setTrime] = useState('')
    const [errors, setErrors] = useState(null)

    const data = {
        year,
        trime,
    }

    const { chartData, viewBranch } = useLibraries({
        data,
        middleware: 'auth',
        redirectLinks: '/dashboard/view-branch',
    })

    if (!chartData) {
        return <GraphLoading />
    }

    const handleViewBranch = async () => {
        setErrors(null)

        viewBranch({
            year,
            trime,
            setErrors,
        })
    }

    return (
        <>
            <div className="p-6">
                <div className="flex gap-6 mb-12">
                    <div className="flex-1">
                        <Label htmlFor="year">Year</Label>
                        <Input
                            id="year"
                            type="text"
                            value={year}
                            className="block mt-1 w-full"
                            onChange={event => setYear(event.target.value)}
                            required
                            autoComplete="current-year"
                        />
                        <InputError messages={errors?.year} className="mt-2" />
                    </div>

                    <div className="flex-1">
                        <Label htmlFor="trime">Trime</Label>
                        <Input
                            id="trime"
                            type="text"
                            value={trime}
                            className="block mt-1 w-full"
                            onChange={event => setTrime(event.target.value)}
                            required
                            autoComplete="current-trime"
                        />
                        <InputError messages={errors?.trime} className="mt-2" />
                    </div>
                </div>

                {user.userAccessLevel === '1' && !errors && (
                    <BarGraph data={chartData} action={handleViewBranch} />
                )}
                {user.userAccessLevel === '2' && !errors && <AreaLine />}
                {user.userAccessLevel === '3' && !errors && (
                    <div className="flex-1">
                        <div className="flex-1">
                            <ActivePie data={chartData} />
                        </div>
                        <div className="flex-1">
                            <DotLine />
                        </div>
                    </div>
                )}
                <AreaLine />
                <DotLine />
                <RadarGraph />
                <TwoLevelPie />
                <ActivePie />
                <BranchRatingsPie />
            </div>
        </>
    )
}

export default SuperAdmin
