import { TableStructure } from '@/components/table/TableStructure'
import { TabOptions } from '@/components/TabOptions'
import { useState } from 'react'
import { Tab } from '@/constants/committee'

const Comitee = ({ comitee = [] }) => {
    const [option, setOption] = useState(Tab)

    return (
        <TableStructure row={comitee}>
            <TabOptions option={option} setOption={setOption} />
        </TableStructure>
    )
}

export default Comitee
