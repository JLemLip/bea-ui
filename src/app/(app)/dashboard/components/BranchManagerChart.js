'use client'

import GraphLoading from '@/components/charts/GraphLoading'
import { useBranchManagers } from '@/stores/branch-managers'
import ActivePie from '@/components/charts/ActivePieChart'
import PopupMessage from '@/components/PopUpMessage'
import { useState } from 'react'

const BMTodate = ({ data }) => {
    const [errors, setErrors] = useState(null)

    const { chart_data, viewCommitteeNotes } = useBranchManagers({
        data,
        redirectLinks: '/dashboard/view-chart',
    })

    if (!chart_data) {
        return <GraphLoading />
    }

    const handleViewBranch = async () => {
        setErrors(null)

        viewCommitteeNotes({
            setErrors,
            data,
        })
    }

    return (
        <>
            <div className="">
                <ActivePie data={chart_data} action={handleViewBranch} />
            </div>

            <PopupMessage message={errors ? `Sample` : errors} view={true} />
        </>
    )
}

export default BMTodate
