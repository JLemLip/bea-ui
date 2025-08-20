'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'
import Cookies from 'js-cookie'

const EditBranchPage = () => {
  const router = useRouter()
  const params = useParams()
  const branch_id = params.id

  const [form, setForm] = useState({
    companyName: '',
    branchCode: '',
    branchName: '',
    branchLocation: '',
  })
  const [updating, setUpdating] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')


  // Fetch existing branch info
  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/library/branch/${branch_id}`)
        const branch = res.data
        setForm({
          companyName: branch.companyName,
          branchCode: branch.branchCode,
          branchName: branch.branchName,
          branchLocation: branch.branchLocation,
        })
      } catch (err) {
        console.error(err)
        setError('Failed to load branch')
      }
    }

    fetchBranch()
  }, [branch_id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleUpdate = async () => {
    try {
      setUpdating(true)

      await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });
      const xsrfToken = Cookies.get('XSRF-TOKEN');


      await axios.put(`http://localhost:8000/api/library/branch/${branch_id}`, form, {
            headers: {
                'X-XSRF-TOKEN': decodeURIComponent(xsrfToken), // Include CSRF token
            },
            withCredentials: true, // Include cookies
        });

      console.log('Branch updated successfully')
      router.push('/dashboard') // go back to dashboard after update
    } catch (err) {
      console.error(err)
      setError('Update failed.')
    } finally {
      setUpdating(false)
    }
  }

  

  const handleDelete = async () => {
    try {
      setDeleting(true);
        // Step 1: Get CSRF cookie
        await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });

        // Step 2: Get token from cookie
        const xsrfToken = Cookies.get('XSRF-TOKEN');

        // Step 3: Send DELETE request
        await axios.delete(`http://localhost:8000/api/library/branch/${branch_id}`, {
            headers: {
                'X-XSRF-TOKEN': decodeURIComponent(xsrfToken), // Include CSRF token
            },
            withCredentials: true, // Include cookies
        });
        alert('Branch deleted successfully');
        router.push('/dashboard');
        console.log('Branch deleted successfully');
    } catch (err) {
        console.error('Failed to delete branch:', err.response?.data || err.message);
    } finally {
        setDeleting(false);
    }
};

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Edit Branch</h2>

      <label className="block mb-2">Company Name</label>
      <input
        type="text"
        name="companyName"
        value={form.companyName}
        onChange={handleChange}
        className="border p-2 mb-4 w-full rounded focus:ring focus:ring-blue-200"
      />

      <label className="block mb-2">Branch Code</label>
      <input
        type="text"
        name="branchCode"
        value={form.branchCode}
        onChange={handleChange}
        className="border p-2 mb-4 w-full rounded focus:ring focus:ring-blue-200"
      />

      <label className="block mb-2">Branch Name</label>
      <input
        type="text"
        name="branchName"
        value={form.branchName}
        onChange={handleChange}
        className="border p-2 mb-4 w-full rounded focus:ring focus:ring-blue-200"
      />

      <label className="block mb-2">Branch Location</label>
      <input
        type="text"
        name="branchLocation"
        value={form.branchLocation}
        onChange={handleChange}
        className="border p-2 mb-4 w-full rounded focus:ring focus:ring-blue-200"
      />

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="flex gap-4">
        
        <button
          onClick={handleUpdate}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded shadow hover:from-blue-600 hover:to-blue-800 transition font-semibold"
        >
          {updating ? 'Updating...' : 'Update'}
        </button>


        <button
          onClick={handleDelete}
          className="bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-2 rounded shadow hover:from-red-600 hover:to-red-800 transition font-semibold"
          disabled={deleting}
        >
          {deleting ? 'Deleting...' : 'Delete'}
        </button>


        <button
          className="bg-gradient-to-r from-gray-500 to-gray-700 text-white px-6 py-2 rounded shadow hover:from-gray-600 hover:to-gray-800 transition font-semibold"
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default EditBranchPage
