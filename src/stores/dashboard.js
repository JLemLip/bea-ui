import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/auth'

export const useLibraries = ({ data, middleware, redirectLinks } = {}) => {
    const router = useRouter()
    const { user } = useAuth({ middleware: 'auth' })

    const {
        data: chartData,
        error,
        mutate,
    } = useSWR('/api/dashboard', () =>
        axios
            .get(`/api/dashboard?user_id=${user.id}&year=${data.year}`)
            .then(res => res.data)
            .catch(e => {
                throw e
            }),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const viewBranch = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/view-branch', props)
            .then(() => mutate())
            .catch(e => {
                throw e
            })
    }

    useEffect(() => {
        // view branch
        if (middleware === 'admin' && redirectLinks) router.push(redirectLinks)
    }, [data, chartData, error])
    return {
        chartData,
        viewBranch,
    }
}
