import { Edit3, Trash2, Printer } from 'lucide-react'

const TableButton = ({ onClick, type = 'edit' }) => {
    const renderIcon = () => {
        switch (type) {
            case 'edit':
                return <Edit3 size={20} />
            case 'delete':
                return <Trash2 size={20} />
            case 'print':
                return <Printer size={20} />
            default:
                return null
        }
    }

    return (
        <button
            onClick={onClick}
            className={`ml-2 px-3 py-1 rounded flex items-center gap-2 text-black`}>
            {renderIcon()}
        </button>
    )
}

export default TableButton
