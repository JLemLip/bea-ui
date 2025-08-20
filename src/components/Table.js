import React, { useState, useMemo, useEffect } from 'react'

/**
 * Reusable Table Component for React with Tailwind CSS.
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.columns - An array of column definitions.
 * Each object should have:
 * - {string} header: The text to display in the table header.
 * - {string} accessor: The key from the data object to access the value for this column.
 * - {function} [renderCell]: Optional. A function that receives the row data
 * and returns the JSX to render for that cell. Useful for custom formatting
 * or rendering interactive elements (e.g., buttons, links).
 * @param {Array<Object>} props.data - An array of data objects, where each object
 * represents a row in the table.
 * @param {string} [props.className] - Optional. Additional CSS classes to apply
 * to the main table container for custom styling.
 * @param {number} [props.initialRowsPerPage=10] - Optional. The initial number of rows to display per page.
 * @param {Array<number>} [props.rowsPerPageOptions=[5, 10, 20, 50]] - Optional. An array of numbers
 * representing the available options for rows per page.
 * @param {boolean} [props.isLoading=false] - Optional. If true, a loading indicator will be shown.
 */
const Table = ({
  columns,
  data,
  className = '',
  initialRowsPerPage = 10,
  rowsPerPageOptions = [5, 10, 20, 50],
  isLoading = false, // New prop for loading state
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage)
  const [searchQuery, setSearchQuery] = useState('')

  // Reset to first page if data, rowsPerPage, or searchQuery changes
  useEffect(() => {
    setCurrentPage(1)
  }, [data, rowsPerPage, searchQuery])

  if (!columns || !Array.isArray(columns) || columns.length === 0) {
    console.error("Table component requires a 'columns' prop (array of column definitions).")
    return <p className="text-red-500 p-4">Error: Table columns not defined.</p>
  }

  if (!data || !Array.isArray(data)) {
    console.error("Table component requires a 'data' prop (array of row objects).")
    return <p className="text-red-500 p-4">Error: Table data not defined.</p>
  }

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery) {
      return data
    }
    const lowerCaseQuery = searchQuery.toLowerCase()
    return data.filter(row =>
      columns.some(column => {
        const value = row[column.accessor]
        return value && String(value).toLowerCase().includes(lowerCaseQuery)
      })
    )
  }, [data, searchQuery, columns])

  // Calculate the data to display for the current page
  const totalPages = Math.ceil(filteredData.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentTableData = useMemo(() => filteredData.slice(startIndex, endIndex), [filteredData, startIndex, endIndex])

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value))
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  return (
    <div className={`flex flex-col rounded-lg shadow-md  ${className}`}>
      {/* Search Input */}
      <div className="p-4 bg-white rounded-t-lg border-b border-gray-200 flex justify-end  mt-5">
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search all columns..."
            value={searchQuery}
            onChange={handleSearchChange}
            disabled={isLoading} // Disable search while loading
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          {/* Table Header */}
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={column.accessor || `header-${index}`}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg first:rounded-bl-none first:rounded-tl-lg last:rounded-tr-lg last:rounded-br-none"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Loading data...
                  </div>
                </td>
              </tr>
            ) : currentTableData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                  {searchQuery ? 'No matching results found.' : 'No data available.'}
                </td>
              </tr>
            ) : (
              currentTableData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {columns.map((column, colIndex) => (
                    <td
                      key={column.accessor ? `${row[column.accessor]}-${rowIndex}-${colIndex}` : `${rowIndex}-${colIndex}`}
                      className="px-6 py-2 whitespace-nowrap text-sm text-gray-900"
                    >
                      {/* Render cell content based on renderCell function or accessor */}
                      {column.renderCell ? column.renderCell(row) : row[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {/* Show pagination only if not loading and there's filtered data */}
      {!isLoading && filteredData.length > 0 && (
        <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6 rounded-b-lg border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(endIndex, filteredData.length)}</span> of{' '}
                <span className="font-medium">{filteredData.length}</span> results
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Rows per page selector */}
              <label htmlFor="rows-per-page" className="text-sm text-gray-700">
                Rows per page:
              </label>
              <select
                id="rows-per-page"
                name="rows-per-page"
                className="block w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                disabled={isLoading} // Disable while loading
              >
                {rowsPerPageOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  {/* Heroicon name: solid/chevron-left */}
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    aria-current={currentPage === page ? 'page' : undefined}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === page
                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    disabled={isLoading} // Disable while loading
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  {/* Heroicon name: solid/chevron-right */}
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Table
