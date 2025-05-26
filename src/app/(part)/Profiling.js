import useLibrary from '@/hooks/useLibrary'
import TableContainer from '@/components/table/TableContainer'

const Profiling = ({ active }) => {
    const { branch } = useLibrary()
    const handleView = id => {
        console.log(id)
    }
    const handleSearch = val => {
        console.log(val)
    }

    const handleCreate = () => {
        //
    }

    if (active == 1) {
        return (
            <>
                <TableContainer
                    title="Branch Library Profiling"
                    row={branch}
                    handleAction={handleView}
                    handleSearch={handleSearch}
                    handleCreate={handleCreate}
                />
            </>
        )
    }
    return null
}

export default Profiling
