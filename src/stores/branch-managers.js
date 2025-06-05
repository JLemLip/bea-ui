import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/auth'

export const useBranchManagers = ({ data, redirectLinks } = {}) => {
    const router = useRouter()
    const { user } = useAuth({ middleware: 'auth' })

    const {
        data: overview,
        error,
        mutate,
    } = useSWR('/api/dashboard', () =>
        axios
            .get(`/api/dashboard/branch-managers/${data.year}/${user.id}`)
            .then(res => {
                return res.data
            })
            .catch(e => {
                throw e
            }),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const { data: comparing } = useSWR(
        '/api/dashboard/branch-managers/compare/',
        () =>
            axios
                .get(
                    `/api/dashboard/branch-managers/compare/${data.from_year}/${data.to_year}/${user.id}`,
                )
                .then(res => {
                    return res.data
                })
                .catch(e => {
                    throw e
                }),
    )

    const compareTrime = async ({ setErrors, ...props }) => {
        await csrf()

        setErrors([])

        axios
            .get('/view-branch', props)
            .then(() => mutate())
            .catch(e => {
                throw e
            })
    }

    const getComitteeNotes = async ({ setErrors, ...props }) => {
        await csrf()

        setErrors([])

        axios
            .get('/view-branch', props)
            .then(() => mutate())
            .catch(e => {
                throw e
            })
    }

    useEffect(() => {
        // view branch
        if (redirectLinks == 'view-category') router.push(redirectLinks)
    }, [data, overview, comparing, error])
    return {
        overview,
        comparing,
        compareTrime,
        getComitteeNotes,
    }
}
