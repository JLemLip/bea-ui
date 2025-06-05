'use client'

import GraphLoading from '@/components/charts/GraphLoading'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import ActivePie from '@/components/charts/ActivePieChart'
import { useState } from 'react'
import { useBranchManagers } from '@/stores/branch-managers'

const BMOverview = () => {
    const [year, setYear] = useState(new Date().getFullYear())
    const [trime, setTrime] = useState('')
    const [errors] = useState(null)

    const data = {
        year,
        trime,
    }

    const { chart_data } = useBranchManagers({
        data,
        redirectLinks: '/dashboard/view-branch',
    })

    if (!chart_data) {
        return <GraphLoading />
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

                <div className="flex-1">
                    <ActivePie data={chart_data.per_category_ratings} />
                </div>
            </div>
        </>
    )
}

export default BMOverview
