'use client'

import { X } from 'lucide-react'

const DepartmentForm = ({
    open,
    onClose,
    formData,
    onChange,
    onSubmit,
    errors,
    isEdit = false,
}) => {
    if (!open) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-900"
                    onClick={onClose}>
                    <X size={24} />
                </button>

                <h2 className="text-lg font-bold mb-4">
                    {isEdit ? 'Edit' : 'Add'} Department
                </h2>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Department Code
                        </label>
                        <input
                            type="text"
                            name="departmentCode"
                            value={formData.departmentCode}
                            onChange={onChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Department Name
                        </label>
                        <input
                            type="text"
                            name="departmentName"
                            value={formData.departmentName}
                            onChange={onChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Assigned Personnel
                        </label>
                        <input
                            type="text"
                            name="assignedPersonnel"
                            value={formData.assignedPersonnel}
                            onChange={onChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={onChange}
                            className="w-full border rounded px-3 py-2">
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Weight
                        </label>
                        <input
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={onChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    {errors.general && (
                        <div className="text-red-500 text-sm">
                            {errors.general}
                        </div>
                    )}

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            onClick={onClose}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DepartmentForm
