import { SquarePlus } from 'lucide-react'

const TableCreate = ({ handleCreate }) => {
    return (
        <button
            className="ml-8 mt-3 rounded flex items-center gap-2 text-gray-600"
            onClick={handleCreate()}>
            <SquarePlus size={36} />
        </button>
    )
}

export default TableCreate
