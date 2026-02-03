import React from 'react'
import { FaUser } from 'react-icons/fa'

const RecentUsers = ({users= []}) => {
  return (
    <div className='bg-gray-500 p-5 rounded-xl'>
        <h3 className='text-lg font-semibold mb-4 flex items-center text-white gap-2'>
            <FaUser className='text-blue-600'/>
            Recent User
        </h3>

        {users.length === 0 ? (
            <p className='text-gray-300 text-sm '>No recent users</p>
        )
        : (
        <ul className='space-y-3'>
            {users.map((user) => (
                <li 
                key={user._id}
                className='flex justify-between items-center rounded-lg bg-gray-700 p-3'>
                    <span className='text-gray-200 text-sm'>
                        {user.email}
                    </span>
                    <span className='text-gray-300 text-xs'>
                        {new Date(user.createdAt).toDateString()}
                    </span>
                </li>
            ))}
        </ul>
        )}
      
    </div>
  )
}

export default RecentUsers
