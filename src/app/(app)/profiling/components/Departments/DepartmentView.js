'use client'

import DepartmentTable from './DepartmentTable'
import DepartmentForm from './DepartmentForm'
import DepartmentDetail from './DepartmentDetail'
import useDepartment from './hooks/useDepartment'
import AuthGuard from '@/components/AuthGuard'

const DepartmentView = () => {
    const {
        departments,
        formData,
        viewModalOpen,
        showModal,
        viewingDepartment, // Now properly destructured
        isLoading,
        errors,
        handleCreate,
        handleClose,
        handleChange,
        handleSubmit,
        handleEdit,
        handleDelete,
        setViewingDepartment,
        setViewModalOpen,
    } = useDepartment()

    const handleView = department => {
        setViewingDepartment(department)
        setViewModalOpen(true)
    }

    return (
        <AuthGuard>
            <div className="p-6">
                <DepartmentTable
                    departments={departments}
                    isLoading={isLoading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onView={handleView}
                    onCreate={handleCreate}
                />

                {/* Make sure viewingDepartment is passed */}
                <DepartmentDetail
                    open={viewModalOpen}
                    onClose={() => setViewModalOpen(false)}
                    department={viewingDepartment} // Now properly passed
                />

                <DepartmentForm
                    open={showModal}
                    onClose={handleClose}
                    formData={formData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    errors={errors}
                    isEdit={!!formData.department_id}
                />
            </div>
        </AuthGuard>
    )
}

export default DepartmentView
