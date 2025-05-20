import { DataTable } from '@/components/DataTable'
import { TabOptions } from '@/components/TabOptions'
import { useState } from 'react'
import { Tab } from '@/constants/committee'

const Comitee = ({ comitee = [] }) => {
    const [option, setOption] = useState(Tab)

    return (
        <DataTable row={comitee}>
            <TabOptions option={option} setOption={setOption} />
        </DataTable>
    )
}

export default Comitee
