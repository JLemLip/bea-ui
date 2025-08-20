
import { SquarePlus } from 'lucide-react'

const CreateBranchButton = ({ handleCreate }) => {




    return (
        <button

            className="ml-3 mr-2 mt-0 mb-2 rounded flex items-center gap-2 text-gray-600 hover:text-black"
            onClick={handleCreate}>
            <span className='text-sm'>Create Branch</span>
            <SquarePlus size={25} />
            
        </button>
    )
}

export default CreateBranchButton