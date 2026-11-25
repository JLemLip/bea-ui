'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Cookies from 'js-cookie'
import useLibrary from '@/hooks/useLibrary'
import { useAuth } from '@/hooks/auth'

const CompleteProfilePage = () => {
    const router = useRouter()
    const { user } = useAuth()
    const [form, setForm] = useState({
        userId: user?.id || '',       
        firstName: user?.firstName || '', 
        lastName: user?.lastName || '',  
        branchCode: '',
        departmentCode: '',
        position: '',
        status: '',
    })

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
        // 1. Get CSRF cookie
        await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
            withCredentials: true,
        })

        // 2. Get XSRF token from cookie (Laravel stores it here)
        const xsrfToken = Cookies.get('XSRF-TOKEN')

        // 3. Submit form
        console.log('Submitting form:', form)
        await axios.post(
            'http://localhost:8000/api/user/info',
            form,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
                },
                withCredentials: true,
            }
        )

        // 4. On success
        console.log('Profile completed successfully')
        alert('Profile completed successfully')
        setSuccess('Profile completed successfully!')
        router.push('/dashboard/profile')
        
    } catch (err) {
        console.error('Error:', err.response?.data || err.message)

        if (err.response?.status === 400) {
            setError(err.response.data.message || 'Validation error.')
        } else if (err.response?.status === 401) {
            setError('Unauthorized. Are you logged in?')
        } else {
            setError('Failed to submit profile info.')
        }
    }
}

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-12">
            <h1 className="text-2xl font-bold mb-4 text-blue-700">Complete Your Profile</h1>

            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="branchCode"
                    placeholder="Branch Code"
                    value={form.branchCode}
                    onChange={(e) => setForm({ ...form, branchCode: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="departmentCode"
                    placeholder="Department Code"
                    value={form.departmentCode}
                    onChange={(e) => setForm({ ...form, departmentCode: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="position"
                    placeholder="Position"
                    value={form.position}
                    onChange={(e) => setForm({ ...form, position: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="status"
                    placeholder="Status"
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full p-2 border rounded"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    Submit
                </button>
                <button
                    className="bg-gradient-to-r from-gray-500 to-gray-700 text-white px-6 py-2 rounded shadow hover:from-gray-600 hover:to-gray-800 transition font-semibold ml-3"
                    onClick={() => router.back()}
                >
                    Back
                </button>
            </form>
        </div>
    )


}


export default CompleteProfilePage  