import useSWR, { mutate } from 'swr'
import axios from '@/lib/axios'
import { useState } from 'react'
import { useAuth } from '@/hooks/auth'

export const useDepartmentLibrary = (options = {}) => {
    const { user } = useAuth({ middleware: 'auth' })
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})

    // Configure axios instance with base URL
    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000',
    })

    const csrf = () => api.get('/sanctum/csrf-cookie')

    // Fetcher function for SWR
    const fetcher = url => api.get(url).then(res => res.data)

    // Fetch departments with SWR
    const {
        data: departments,
        error,
        isValidating,
    } = useSWR(user ? '/api/library/departments' : null, fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        ...options,
    })

    // Common request handler
    const handleRequest = async (method, url, data = null) => {
        setIsLoading(true)
        setErrors({})

        try {
            await csrf()
            const response = await api({
                method,
                url,
                data,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                },
            })

            if (response.status < 200 || response.status >= 300) {
                throw new Error(`Request failed with status ${response.status}`)
            }

            await mutate('/api/library/departments')
            return response.data
        } catch (error) {
            console.error(`${method} error:`, error.response?.data || error)

            const errorData = {
                status: error.response?.status,
                message: error.response?.data?.message || 'Request failed',
                errors: error.response?.data?.errors || {},
            }

            if (error.response?.status === 403) {
                errorData.message = 'Admin privileges required'
            }

            setErrors(errorData.errors)
            throw errorData
        } finally {
            setIsLoading(false)
        }
    }

    // Save department
    const saveDepartment = async data => {
        return handleRequest('post', '/api/library/departments', data)
    }

    const updateDepartment = async (id, data) => {
        setIsLoading(true)
        setErrors({})

        try {
            await csrf()

            // Make sure we're using the configured api instance
            const response = await api.put(
                `/api/library/departments/${id}`,
                data,
            )

            // Simple refresh - remove optimistic update for now
            await mutate('/api/library/departments')

            return response.data
        } catch (error) {
            console.error('Update error:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
            })

            setErrors({
                general:
                    error.response?.data?.message ||
                    'Failed to update department',
            })

            throw error
        } finally {
            setIsLoading(false)
        }
    }
    // Delete department
    const deleteDepartment = async id => {
        setIsLoading(true)
        setErrors({})

        try {
            await csrf()
            const response = await api.delete(`/api/library/departments/${id}`)

            if (response.status < 200 || response.status >= 300) {
                throw new Error(`Delete failed with status ${response.status}`)
            }

            await mutate('/api/library/departments')
            return response.data
        } catch (error) {
            console.error('Delete error:', error)

            let errorMessage = 'Failed to delete department'
            if (error.response) {
                if (error.response.status === 404) {
                    errorMessage = 'Department not found'
                } else if (error.response.data?.message) {
                    errorMessage = error.response.data.message
                }
            }

            setErrors({ general: errorMessage })
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    return {
        // Data
        departments,

        // Loading states
        isLoading: isLoading || isValidating,
        isValidating,

        // Error states
        error,
        errors,

        // Actions
        saveDepartment,
        updateDepartment,
        deleteDepartment,

        // Utilities
        mutate: () => mutate('/api/library/departments'),
        setErrors,
    }
}
