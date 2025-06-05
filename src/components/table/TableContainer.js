import { TableStructure } from '@/components/table/TableStructure'
import TableSearch from './TableSearch'
import TableCreate from './TableCreate'
const TableContainer = ({
    title,
    row,
    columns,
    handleAction,
    handleSearch,
    handleCreate,
}) => {
    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">{title}</div>

            <div className="flex gap-2 justify-between">
                {handleCreate ? (
                    <TableCreate handleCreate={handleCreate} />
                ) : (
                    <div>&nbsp;</div>
                )}
                {handleSearch && <TableSearch handleSearch={handleSearch} />}
            </div>
            <div className="px-6 pb-4">
                <TableStructure
                    rows={row}
                    columns={columns}
                    handleAction={handleAction}
                />
            </div>
        </div>
    )
}

export default TableContainer
