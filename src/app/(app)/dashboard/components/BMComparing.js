'use client'

import GraphLoading from '@/components/charts/GraphLoading'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { useState } from 'react'
import { useBranchManagers } from '@/stores/branch-managers'
import DotLineGraph from '@/components/charts/DotLineGraph'

const BMComparing = () => {
    const [curr, setCurrentMonth] = useState(null)
    const [prev, setPreviousMonth] = useState(null)
    const [errors] = useState(null)

    const data = {
        curr,
        prev,
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
                        <Label htmlFor="prev">Previous Month</Label>
                        <Input
                            id="prev"
                            type="text"
                            value={prev}
                            className="block mt-1 w-full"
                            onChange={event =>
                                setPreviousMonth(event.target.value)
                            }
                            required
                            autoComplete="previous-month"
                        />
                        <InputError messages={errors?.prev} className="mt-2" />
                    </div>

                    <div className="flex-1">
                        <Label htmlFor="curr">Current Month</Label>
                        <Input
                            id="curr"
                            type="text"
                            value={curr}
                            className="block mt-1 w-full"
                            onChange={event =>
                                setCurrentMonth(event.target.value)
                            }
                            required
                            autoComplete="current-month"
                        />
                        <InputError messages={errors?.curr} className="mt-2" />
                    </div>
                </div>

                <div className="flex-1">
                    <DotLineGraph data={chart_data.per_category_ratings} />
                </div>
            </div>
        </>
    )
}

export default BMComparing
