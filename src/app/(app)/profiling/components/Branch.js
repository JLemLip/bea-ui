'use client'

import React from 'react'
import CreateBranchButton from './table/CreateBranchButton'
import BranchTableStructure from './table/BranchTableStructure'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const Branch = () => {
    const [showForm, setShowForm] = useState(false)

    const [form, setForm] = useState({
        companyName: '',
        branchCode: '',
        branchName: '',
        branchLocation: '',
        branchStatus: '',
    })

    const [branches, setBranches] = useState([])

    const [error, setError] = useState('')

    const [success, setSuccess] = useState('')

    const [editForm, setEditForm] = useState(null)

    const [viewBranch, setViewBranch] = useState(null)

    const fetchBranches = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/branches', {
                withCredentials: true,
            })
            setBranches(res.data)
        } catch (err) {
            console.log('Fetch error:', err)
        }
    }

    const handleDeletePost = async id => {
        try {
            const xsrfToken = Cookies.get('XSRF-TOKEN')
            await axios.delete(`http://localhost:8000/api/branches/${id}`, {
                headers: { 'X-XSRF-TOKEN': xsrfToken },
                withCredentials: true,
            })
            setSuccess('Branch deleted successfully!')
            alert('Branch deleted successfully!')
            console.log('Branch deleted successfully!')

            fetchBranches()
        } catch (error) {
            console.error('Error deleting branch:', error)
            setError('Failed to delete branch.')
        }
    }

    useEffect(() => {
        fetchBranches()
    }, [])

    const handleCreate = () => {
        setShowForm(true)
    }

    const handleEdit = branch => {
        setEditForm(branch)
    }

    const handleCloseForm = () => {
        setShowForm(false)
    }

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleEditChange = e => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value })
    }

    const handleView = branch =>{
        setViewBranch(branch)
    }

    const handleCloseView = () => {
        setViewBranch(null)
    }

    
    // Branch Creation
    const handleSubmit = async e => {
        e.preventDefault()
        setError('')
        setSuccess('')
        try {
            const xsrfToken = Cookies.get('XSRF-TOKEN')

            await axios.post('http://localhost:8000/api/branches', form, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': xsrfToken,
                },
                withCredentials: true,
            })
            alert('Branch created successfully!')
            setSuccess('Branch created successfully!')
            console.log('Branch created successfully!')
            setShowForm(false)
            fetchBranches()
        } catch (err) {
            console.log('Error:', err)
            setError('Failed to create branch.')
        }
    }

    // Branch Editing
    const handleEditSubmit = async e => {
        e.preventDefault()

        try {
            const xsrfToken = Cookies.get('XSRF-TOKEN')
            await axios.put(
                `http://localhost:8000/api/branches/${editForm.branch_id}`,
                editForm,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-XSRF-TOKEN': xsrfToken,
                    },
                    withCredentials: true,
                },
            )
            alert('Branch updated successfully!')
            console.log('Branch updated successfully!')
            setEditForm(null)
            fetchBranches()
        } catch (err) {
            console.log('Error:', err)
            setError('Failed to update branch.')
        }
    }

    return (
        <div className="container">
            <div className="flex items-center mb-1">
                <h1 className="mb-4">Branch Profiling</h1>
                <div className="ml-auto">
                    <CreateBranchButton
                        handleCreate={handleCreate}
                        className="rounded flex items-center gap-2 text-gray-600"
                    />
                </div>
                
            </div>
            <hr className="my-2" />

            <BranchTableStructure
                branches={branches}
                onDelete={handleDeletePost}
                onEdit={handleEdit}
                onView={handleView}
            />

            {viewBranch && (
            
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40'
                onClick={handleCloseView}>
                    <div className='bg-white rounded shadow-lg p-8 w-full max-w-md mx-auto'>
                        <h2 className='text-xl font-bold mb-5 text-black'>Branch Details</h2>
                             <div className='space-y-2'>
                                <p><strong>Company Name:</strong> {viewBranch.companyName}</p>
                                <p><strong>Branch Code:</strong> {viewBranch.branchCode}</p>
                                <p><strong>Branch Name:</strong> {viewBranch.branchName}</p>
                                <p><strong>Branch Location:</strong> {viewBranch.branchLocation}</p>
                                <p><strong>Branch Status:</strong> {viewBranch.status ? "Active" : "Inactive"}</p>
                                <p><strong>Created at:</strong> {viewBranch.created_at ? new Date(viewBranch.created_at).toLocaleTimeString() : ""}</p>
                                <p><strong>Updated at:</strong> {viewBranch.updated_at ? new Date(viewBranch.updated_at).toLocaleTimeString() : ""}</p>
                             </div>

                    </div>
                    
                     </div>
                    
            )
            
            }

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded shadow-lg p-8 w-full max-w-md mx-auto">
                        <h2 className="text-xl font-bold mb-4 text-black">
                            Create New Branch
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="companyName"
                                value={form.companyName}
                                onChange={handleChange}
                                placeholder="Company Name"
                                className="block mb-3 p-2 border rounded w-full"
                            />
                            <input
                                type="text"
                                name="branchCode"
                                value={form.branchCode}
                                onChange={handleChange}
                                placeholder="Branch Code"
                                className="block mb-3 p-2 border rounded w-full"
                            />
                            <input
                                type="text"
                                name="branchName"
                                value={form.branchName}
                                onChange={handleChange}
                                placeholder="Branch Name"
                                className="block mb-3 p-2 border rounded w-full"
                            />
                            <input
                                type="text"
                                name="branchLocation"
                                value={form.branchLocation}
                                onChange={handleChange}
                                placeholder="Branch Location"
                                className="block mb-3 p-2 border rounded w-full"
                            />
                            <input
                                type="text"
                                name="branchStatus"
                                value={form.status}
                                onChange={handleChange}
                                placeholder="Branch Status"
                                className="block mb-3 p-2 border rounded w-full"
                            />
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded">
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                    onClick={handleCloseForm}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {editForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded shadow-lg p-8 w-full max-w-md mx-auto">
                        <h2 className="text-xl font-bold mb-4 text-black">
                            Edit Branch
                        </h2>
                        <form onSubmit={handleEditSubmit}>
                            <input
                                type="text"
                                name="companyName"
                                value={editForm.companyName}
                                onChange={handleEditChange}
                                placeholder="Company Name"
                                className="block mb-3 p-2 border rounded w-full"
                            />
                            <input
                                type="text"
                                name="branchCode"
                                value={editForm.branchCode}
                                onChange={handleEditChange}
                                placeholder="Branch Code"
                                className="block mb-3 p-2 border rounded w-full"
                            />
                            <input
                                type="text"
                                name="branchName"
                                value={editForm.branchName}
                                onChange={handleEditChange}
                                placeholder="Branch Name"
                                className="block mb-3 p-2 border rounded w-full"
                            />
                            <input
                                type="text"
                                name="branchLocation"
                                value={editForm.branchLocation}
                                onChange={handleEditChange}
                                placeholder="Branch Location"
                                className="block mb-3 p-2 border rounded w-full"
                            />
                            <input
                                type="text"
                                name="branchStatus"
                                value={editForm.branchStatus}
                                onChange={handleEditChange}
                                placeholder="Branch Status"
                                className="block mb-3 p-2 border rounded w-full"
                            />
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded">
                                    Update
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                    onClick={() => setEditForm(null)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Branch
