'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch user details
        const res = await axios.get('http://localhost:8000/api/user', {
          withCredentials: true,
        })
        setUser(res.data)
        console.log('Fetched user:', res.data)

        // Fetch userInfo if included in the user object or separately
        const userInfoRes = res.data.user_info
          ? res.data.user_info
          : await axios
              .get(`http://localhost:8000/api/user-info/${res.data.id}`, {
                withCredentials: true,
              })
              .then((response) => response.data)

        setUserInfo(userInfoRes.info)
        console.log('Fetched user info:', userInfoRes.info)
      } catch (err) {
        console.error('Error response:', err.response?.data || err.message)
        setError('Failed to fetch user data.')
      }
    }

    fetchUser()
  }, [])

  if (error) return <div className="p-4 text-red-500">{error}</div>
  if (!user) return <div className="p-4">Loading...</div>

  // ✅ Improved null-safe check for missing fields
  const isUserInfoMissing =
    !userInfo ||
    userInfo.branchCode == null ||
    userInfo.position == null ||
    userInfo.status == null

  return (
    <div className="max-w-screen-lg mx-auto p-4 bg-white rounded shadow mt-12 space-y-1">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">User Profile</h1>

      <p>
        <strong>Name:</strong> {user.firstName} {user.middleName} {user.lastName}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <div className="mt-6">
        <div className="space-y-1 mb-1">
          <p>
            <strong>Branch Code:</strong> {userInfo?.branchCode ?? 'Not set'}
          </p>
          <p>
            <strong>Branch Name:</strong> {userInfo?.branchName ?? 'Not set'}
          </p>
          <p>
            <strong>Branch Location:</strong> {userInfo?.branchLocation ?? 'Not set'}
          </p>
          <p>
            <strong>Department Code:</strong> {userInfo?.departmentCode ?? 'Not set'}
          </p>
          <p>
            <strong>Department Name:</strong> {userInfo?.departmentName ?? 'Not set'}
          </p>
          <p>
            <strong>Position:</strong> {userInfo?.position ?? 'Not set'}
          </p>
          <p>
            <strong>Status:</strong>{' '}
            {userInfo?.status === 0 ? 'Inactive' : userInfo?.status === 1 ? 'Active' : 'Not set'}
          </p>
        </div>

        {/* ✅ Conditional render for Complete Profile button */}
        {isUserInfoMissing && (
          <div className="text-yellow-600 font-medium space-y-2">
            <p>Please complete your profile.</p>
            <Link href="/dashboard/complete-profile">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Complete Profile
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
