'use client'

import Loading from '@/app/(app)/Loading'
import Input from '@/components/Input'
import BarGraph from '@/components/charts/BarGraph'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import useSWR from 'swr'
import axios from '@/lib/axios'
import { useState } from 'react'
import { useAuth } from '@/hooks/auth'

const SuperAdmin = () => {
    const { user } = useAuth({ middleware: 'auth' })

    const [year, setYear] = useState(new Date().getFullYear())
    const [trime, setTrime] = useState('')
    const [errors, setErrors] = useState(null)

    const { data: chartData } = useSWR(
        user?.id ? [`/api/dashboard`, user.id, year, trime] : null,
        () =>
            axios
                .get(
                    `/api/dashboard?user_id=${user.id}&year=${year}&trime=${trime}`,
                )
                .then(res => res.data)
                .catch(error => {
                    setErrors(error.response?.data?.errors)
                }),
    )
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
                        <Label htmlFor="trime">Trimester</Label>
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

                {!chartData && <Loading />}

                {user.userAccessLevel === '1' && !errors && (
                    <BarGraph data={chartData} />
                )}
                {user.userAccessLevel === '2' && !errors && (
                    <BarGraph data={chartData} />
                )}
                {user.userAccessLevel === '3' && !errors && (
                    <BarGraph data={chartData} />
                )}
            </div>
        </>
    )
}

export default SuperAdmin
