'use client'

import { X } from 'lucide-react'

const DepartmentDetail = ({ open, onClose, department }) => {
    if (!open || !department) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    onClick={onClose}>
                    <X size={24} />
                </button>

                <h2 className="text-lg font-bold mb-4">Department Details</h2>

                <div className="space-y-3">
                    <div>
                        <p className="text-sm font-medium text-gray-500">
                            Department Code
                        </p>
                        <p className="mt-1">
                            {department?.departmentCode || 'N/A'}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-gray-500">
                            Department Name
                        </p>
                        <p className="mt-1">
                            {department?.departmentName || 'N/A'}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-gray-500">
                            Assigned Personnel
                        </p>
                        <p className="mt-1">
                            {department?.assignedPersonnel || 'N/A'}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-gray-500">
                            Status
                        </p>
                        <p className="mt-1">
                            {department?.status === 1 ? 'Active' : 'Inactive'}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-gray-500">
                            Weight
                        </p>
                        <p className="mt-1">{department?.weight || 'N/A'}</p>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                        onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DepartmentDetail
