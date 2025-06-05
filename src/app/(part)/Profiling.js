import useLibrary from '@/hooks/useLibrary'
import TableContainer from '@/components/table/TableContainer'

const Profiling = ({ active }) => {
    const { branch, branch_column } = useLibrary()
    const handleView = () => {
        // console.log(id)
    }
    const handleSearch = () => {
        // console.log(val)
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
                    columns={branch_column}
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
