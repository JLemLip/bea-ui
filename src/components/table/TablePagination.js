// const PagitionRow = rows => {
//     const map_rows = []
//     rows.forEach((row, index) => {

//     })
// }

const PaginationLogo = ({ isNext }) => {
    const path = isNext
        ? 'M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z'
        : 'M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z'
    return (
        <svg
            className="size-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon">
            <path fillRule="evenodd" d={path} clipRule="evenodd" />
        </svg>
    )
}

const PaginationLinks = ({ index, totalPages, link }) => {
    if (index === 0 || index === totalPages) {
        return (
            <a
                href={link}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
                <span className="sr-only">
                    {index === 0 ? 'Previous' : 'Next'}
                </span>
                <PaginationLogo isNext={index === 0} />
            </a>
        )
    } else {
        return (
            <a
                href={link}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                {index}
            </a>
        )
    }
}

export const TablePagination = ({ rows }) => {
    return (
        <nav
            className="pt-4 flex justify-center"
            aria-label="Page navigation example">
            <ul className="flex items-center -space-x-px h-8 text-sm">
                {rows.map((row, index) => {
                    return (
                        <li key={index}>
                            <PaginationLinks
                                index={index}
                                totalPages={rows.length}
                                link={row}
                            />
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
