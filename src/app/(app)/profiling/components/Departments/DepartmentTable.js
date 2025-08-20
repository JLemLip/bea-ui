'use client'

import { Pencil, Eye, Trash, SquarePlus } from 'lucide-react'
import Table from '@/components/Table'
import ActionButton from '@/components/ActionButton'
import { useAuth } from '@/hooks/auth' // Add this import

const DepartmentTable = ({
    departments,
    isLoading,
    onEdit,
    onDelete,
    onView,
    onCreate,
}) => {
    const { isAdmin } = useAuth() // Get admin status from auth hook

    const columns = [
        {
            header: 'DEPARTMENT CODE',
            accessor: 'departmentCode',
        },
        {
            header: 'DEPARTMENT NAME',
            accessor: 'departmentName',
        },
        {
            header: 'ASSIGNED PERSONNEL',
            accessor: 'assignedPersonnel',
        },
        {
            header: 'STATUS',
            accessor: 'status',
            renderCell: row => (
                <span
                    className={
                        row.status === 1 ? 'text-green-600' : 'text-red-600'
                    }>
                    {row.status === 1 ? 'Active' : 'Inactive'}
                </span>
            ),
        },
        {
            header: 'WEIGHT',
            accessor: 'weight',
        },
        {
            header: 'ACTIONS',
            accessor: 'actions',
            renderCell: row => (
                <div className="flex gap-2">
                    {isAdmin && (
                        <>
                            <ActionButton
                                tooltipText="Edit department"
                                onClick={() => onEdit(row)}
                                className="text-blue-500 hover:text-blue-700">
                                <Pencil size={18} />
                            </ActionButton>
                            <ActionButton
                                tooltipText="Delete department"
                                onClick={() => onDelete(row.department_id)}
                                className="text-red-500 hover:text-red-700">
                                <Trash size={18} />
                            </ActionButton>
                        </>
                    )}
                    <ActionButton
                        tooltipText="View details"
                        onClick={() => onView(row)}
                        className="text-green-500 hover:text-green-700">
                        <Eye size={18} />
                    </ActionButton>
                </div>
            ),
        },
    ]

    return (
        <div className="department-table-container">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold text-gray-800">
                    Department Profiling
                </h1>
                {isAdmin && ( // Only show create button for admins
                    <button
                        onClick={onCreate}
                        className="text-gray-600 hover:text-gray-800 transition-colors"
                        aria-label="Add Department">
                        <SquarePlus size={35} />
                    </button>
                )}
            </div>
            <Table
                columns={columns}
                data={departments || []}
                isLoading={isLoading}
                className="mb-8 shadow-none -m-6"
                initialRowsPerPage={10}
                rowsPerPageOptions={[5, 10, 15, 20]}
                emptyStateMessage="No departments found"
            />
        </div>
    )
}

export default DepartmentTable
