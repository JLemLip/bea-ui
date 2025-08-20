'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Cookies from 'js-cookie'
import useLibrary from '@/hooks/useLibrary'

//library and module imports

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000'

const CreateBranch = () => {
    const router = useRouter()
    const {refreshBranches} = useLibrary();
    const [form, setForm] = useState({
        companyName: '',
        branchCode: '',
        branchName: '',
        branchLocation: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        setLoading(true);
        // Step 1: Get CSRF cookie
        await axios.get('http://localhost:8000/sanctum/csrf-cookie');

        // Step 2: Get token from cookie
        const xsrfToken = Cookies.get('XSRF-TOKEN');

        // Step 3: Send POST request
        await axios.post(
        'http://localhost:8000/api/library/branch',
        form,
        {
            headers: {
            'X-XSRF-TOKEN': decodeURIComponent(xsrfToken), 
            },
        }
    );

    console.log('Branch created');
    alert('Branch created successfully');
    refreshBranches();
    router.push('/dashboard');
  } catch (err) {
    console.error('Failed to create branch:', err.response?.data || err.message);
  }finally {
        setLoading(false);
    }
};

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
            
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Create New Branch</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="companyName"
                    placeholder="Company Name"
                    value={form.companyName}
                    onChange={handleChange}
                    className="border p-2 mb-2 w-full rounded focus:ring focus:ring-blue-200"
                    required
                />
                <input
                    name="branchCode"
                    placeholder="Branch Code"
                    value={form.branchCode}
                    onChange={handleChange}
                    className="border p-2 mb-2 w-full rounded focus:ring focus:ring-blue-200"
                    required
                />
                <input
                    name="branchName"
                    placeholder="Branch Name"
                    value={form.branchName}
                    onChange={handleChange}
                    className="border p-2 mb-2 w-full rounded focus:ring focus:ring-blue-200"
                    required
                />
                <input
                    name="branchLocation"
                    placeholder="Branch Location"
                    value={form.branchLocation}
                    onChange={handleChange}
                    className="border p-2 mb-4 w-full rounded focus:ring focus:ring-blue-200"
                    required
                />
                {error && <div className="text-red-500 mb-2">{error}</div>}
                
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded shadow hover:from-blue-600 hover:to-blue-800 transition font-semibold mr-3 "
                >
                    {loading ? 'Creating...' : 'Create Branch'}
                </button>

                <button
                    className="bg-gradient-to-r from-gray-500 to-gray-700 text-white px-6 py-2 rounded shadow hover:from-gray-600 hover:to-gray-800 transition font-semibold"
                    onClick={() => router.back()}
                >
                    Back
                </button>
            </form>
        </div>
    )
}

export default CreateBranch