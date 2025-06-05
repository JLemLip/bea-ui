'use client'

import GraphLoading from '@/components/charts/GraphLoading'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { useState } from 'react'
import { useBranchManagers } from '@/stores/branch-managers'
import DotLineGraph from '@/components/charts/DotLineGraph'

const BMComparing = () => {
    const [to_year, setToYear] = useState(null)
    const [from_year, setFromYear] = useState(null)
    const [errors] = useState(null)

    const data = {
        to_year,
        from_year,
    }

    const { comparing, compareTrime } = useBranchManagers({
        data,
        redirectLinks: '/dashboard/view-branch',
    })

    if (!comparing) {
        return <GraphLoading />
    }

    const handleCompare = () => {
        compareTrime({ errors, data })
    }

    return (
        <>
            <div className="p-6">
                <div className="flex gap-6 mb-12">
                    <div className="flex-1">
                        <Label htmlFor="from_year">From Year</Label>
                        <Input
                            id="from_year"
                            type="text"
                            value={from_year}
                            className="block mt-1 w-full"
                            onChange={event => setFromYear(event.target.value)}
                            required
                            autoComplete="from-year"
                        />
                        <InputError
                            messages={errors?.from_year}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex-1">
                        <Label htmlFor="to_year">To Year</Label>
                        <Input
                            id="to_year"
                            type="text"
                            value={to_year}
                            className="block mt-1 w-full"
                            onChange={event => setToYear(event.target.value)}
                            required
                            autoComplete="to-year"
                        />
                        <InputError
                            messages={errors?.to_year}
                            className="mt-2"
                        />
                    </div>
                    <div className="flex-1">
                        <button onClick={handleCompare}>Sign out</button>
                    </div>
                </div>

                <div className="flex-1">
                    <DotLineGraph data={comparing} />
                </div>
            </div>
        </>
    )
}

export default BMComparing
