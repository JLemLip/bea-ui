import React from 'react'
import Table from '@/components/Table'
import { Edit3, Eye, Trash2 } from 'lucide-react'

const ActionButton = ({ tooltipText, onClick, className = '', children }) => (
    <button
        className={`p-1 rounded ${className}`}
        title={tooltipText}
        onClick={onClick}
        type="button"
    >
        {children}
    </button>
)

const BranchTableStructure = ({ branches, onDelete, onEdit, onView }) => {
    const branchColumns = [
        { header: 'Company Name', accessor: 'companyName' },
        { header: 'Branch Code', accessor: 'branchCode' },
        { header: 'Branch Name', accessor: 'branchName' },
        { header: 'Branch Location', accessor: 'branchLocation' },
        {
            header: 'Action',
            accessor: 'action',
            renderCell: (row) => (
                <div className="flex space-x-2">
                    <ActionButton
                        tooltipText="Edit"
                        onClick={() => onEdit(row)}
                        className='hover:text-blue-600'
                    >
                        <Edit3 size={16} />
                    </ActionButton>
                    <ActionButton
                        tooltipText="Preview"
                        onClick={() => onView(row)}
                        className='hover:text-blue-600'
                    >
                        <Eye size={16} />
                    </ActionButton>
                    <ActionButton
                        tooltipText="Delete"

                        onClick={() => {
                            if(window.confirm('Are you sure you want to delete this branch?')) {
                                onDelete(row.branch_id)
                            }
                        }}
                        className="text-gray-500 hover:text-red-600"
                        
                    >
                        <Trash2 size={16} />
                    </ActionButton>
                </div>
            ),
        },
    ]

    return (
        <Table
            columns={branchColumns}
            data={branches}
            className="mb-8 shadow-none -m-6"
            initialRowsPerPage={10}
            rowsPerPageOptions={[5, 10, 15, 20]}
        />
    )
}

export default BranchTableStructure