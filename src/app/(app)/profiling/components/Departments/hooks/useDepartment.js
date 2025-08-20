'use client'

import { useState } from 'react'
import { useDepartmentLibrary } from '@/stores/department-library'
import { useAuth } from '@/hooks/auth'

const useDepartment = () => {
    const { isAdmin } = useAuth() // Get admin status
    const [viewModalOpen, setViewModalOpen] = useState(false)
    const [viewingDepartment, setViewingDepartment] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        departmentCode: '',
        departmentName: '',
        assignedPersonnel: '',
        status: '',
        weight: '',
    })
    const [actionError, setActionError] = useState(null) // For permission errors

    const {
        departments: departments1,
        isLoading,
        errors,
        saveDepartment,
        updateDepartment,
        deleteDepartment,
        mutate,
    } = useDepartmentLibrary()

    const handleCreate = () => {
        if (!isAdmin) {
            setActionError('Admin privileges required')
            return
        }
        setShowModal(true)
    }

    const handleClose = () => {
        setShowModal(false)
        setActionError(null)
        setFormData({
            departmentCode: '',
            departmentName: '',
            assignedPersonnel: '',
            status: '',
            weight: '',
        })
    }

    const handleChange = e => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setActionError(null)

        try {
            if (!isAdmin) throw new Error('Admin privileges required')

            const payload = {
                departmentCode: formData.departmentCode,
                departmentName: formData.departmentName,
                assignedPersonnel: formData.assignedPersonnel,
                status: Number(formData.status),
                weight: parseFloat(formData.weight),
            }

            const action = formData.department_id
                ? () => updateDepartment(formData.department_id, payload)
                : () => saveDepartment(payload)

            await action()
            mutate()
            handleClose()
        } catch (error) {
            console.error('Submission error:', error)
            setActionError(
                error.response?.data?.errors
                    ? Object.values(error.response.data.errors).join('\n')
                    : error.message,
            )
        }
    }

    const handleEdit = dept => {
        if (!isAdmin) {
            setActionError('Admin privileges required to edit')
            return
        }
        setFormData({
            department_id: dept.department_id,
            departmentCode: dept.departmentCode,
            departmentName: dept.departmentName,
            assignedPersonnel: dept.assignedPersonnel,
            status: dept.status?.toString() || '',
            weight: dept.weight?.toString() || '',
        })
        setShowModal(true)
    }

    const handleDelete = async id => {
        if (!isAdmin) {
            setActionError('Admin privileges required to delete')
            return
        }

        if (confirm('Are you sure you want to delete this department?')) {
            try {
                await deleteDepartment(id)
            } catch (error) {
                console.error('Error deleting department:', error)
                setActionError(error.response?.data?.message || 'Delete failed')
            }
        }
    }

    return {
        departments: departments1,
        formData,
        viewModalOpen,
        showModal,
        viewingDepartment,
        isLoading,
        errors,
        actionError,
        isAdmin,
        handleCreate,
        handleClose,
        handleChange,
        handleSubmit,
        handleEdit,
        handleDelete,
        setViewingDepartment,
        setViewModalOpen,
    }
}

export default useDepartment
