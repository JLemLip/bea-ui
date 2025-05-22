const DataColumns = ({ columns = [], index = 0 }) => {
    columns.forEach(element => {
        if (index === 0) {
            return (
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    {element.name}
                </th>
            )
        } else {
            return (
                <td className="px-4 py-2 text-sm text-gray-800">
                    {element.name}
                </td>
            )
        }
    })
}

const DataRow = ({ row = [] }) => {
    row.forEach((columns, index) => {
        if (index === 0) {
            return (
                <thead className="bg-gray-100">
                    <tr>{DataColumns(columns, index)}</tr>
                </thead>
            )
        } else {
            return <tr className="divide-y">{DataColumns(columns, index)}</tr>
        }
    })
}

export const DataTable = ({ row }) => {
    return (
        <div className="overflow-x-auto">
            <slot />
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                {DataRow(row)}
            </table>
        </div>
    )
}
