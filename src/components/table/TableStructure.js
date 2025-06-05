import { useState } from 'react'
import TableButton from './TableButton'
// import TablePagination from './TablePagination'

const DataColumns = ({
    columns,
    index = 0,
    handleAction,
    position = 'body',
}) => {
    return columns.map((value, count) => {
        if (position === 'head') {
            return (
                <th
                    scope="col"
                    key={count}
                    className="px-6 py-3 uppercase text-sm">
                    {value}
                </th>
            )
        } else {
            const button =
                handleAction && count === columns.length - 1 ? (
                    <TableButton
                        onClick={handleAction(columns[0].value)}
                        mode={index % 2}
                    />
                ) : (
                    value
                )
            return (
                <td
                    scope="col"
                    key={count}
                    className={
                        count === 0
                            ? index % 2 === 1
                                ? 'px-6 py-4 gap-2 font-bold text-sm'
                                : 'px-6 py-4 gap-2 font-bold text-sm'
                            : 'px-6 py-4 gap-2'
                    }>
                    {button}
                </td>
            )
        }
    })
}

const DataBody = ({ row, handleAction }) => {
    return row.map((columns, index) => {
        const values = Object.values(columns)
        return (
            <tr
                key={index}
                className={index % 2 === 1 ? 'text-xs bg-gray-50 ' : ''}>
                <DataColumns
                    columns={values}
                    index={index}
                    handleAction={handleAction}
                    position="body"
                />
            </tr>
        )
    })
}

const DataHead = ({ columns }) => {
    return (
        <tr>
            <DataColumns columns={columns} index={0} position="head" />
        </tr>
    )
}

export const TableStructure = ({ rows, columns, handleAction }) => {
    // Reformat data to retrieve only the value available in the column for the given field key
    // Only get the first 10 data for pagination
    const [row, setRow] = useState(
        rows.slice(0, 10).map(row => {
            return columns.map(column => row[column.field])
        }),
    )
    const column_labels = columns.map(column => column.label)

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-sm">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <DataHead
                            columns={column_labels}
                            handleAction={handleAction}
                        />
                    </thead>
                    <tbody className="text-gray-700">
                        <DataBody row={row} handleAction={handleAction} />
                    </tbody>
                </table>
            </div>
            {/* Need logic to get pagination links and function to manipulate table */}
            {/* <TablePagination /> */}
        </>
    )
}
