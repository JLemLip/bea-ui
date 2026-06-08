import useSWR, { mutate } from 'swr'
import axios from '@/lib/axios'
import { useState } from 'react'
import { useAuth } from '@/hooks/auth'

export const useDepartmentLibrary = (options = {}) => {
    const { user } = useAuth({ middleware: 'auth' })
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    // Fetcher function for SWR
    const fetcher = (url) => axios.get(url).then(res => res.data)

    // Fetch departments with SWR
    const { data: departments, error, isValidating } = useSWR(
        user ? '/api/library/department' : null,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            ...options
        }
    )

    // Save department library route
    const saveDepartment = async (data) => {
        setIsLoading(true)
        setErrors({})

        try {
            await csrf()
            const response = await axios.post('/api/library/department', data)
            
            // Revalidate the departments cache
            await mutate('/api/library/department')
            
            return response.data
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {})
            }
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    // Update department
    const updateDepartment = async (id, data) => {
        setIsLoading(true)
        setErrors({})

        try {
            await csrf()
            const response = await axios.put(`/api/library/department/${id}`, data)
            
            // Revalidate the departments cache
            await mutate('/api/library/department')
            
            return response.data
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {})
            }
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    // Delete department
    const deleteDepartment = async (id) => {
        setIsLoading(true)
        setErrors({})

        try {
            await csrf()
            await axios.delete(`/api/library/department/${id}`)
            
            // Revalidate the departments cache
            await mutate('/api/library/department')
            
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {})
            }
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
        mutate: () => mutate('/api/library/department'),
        setErrors,
    }
}
