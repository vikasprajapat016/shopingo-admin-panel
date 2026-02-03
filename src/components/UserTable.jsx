import React from 'react'

const UserTable = ({ users, onDelete, onBlock}) => {
  return (
    <div className='overflow-x-auto w-full'>
        <table className='border w-full border-gray-800 rounded-lg'>
            <thead className='bg-gray-100'>
                <tr>
                    <th className='p-3 text-left'>Name</th>
                    <th className='p-3 text-left'>Email</th>
                    <th className='p-3 text-left'>Role</th>
                    <th className='p-3 text-left'>Status</th>
                    <th className='p-3 text-center'>Actions</th>
                    <th className='p-3 text-center '>Block User</th>
                </tr>
            </thead>

            <tbody className=''>
                {users.map((user) => (
                    <tr key={user._id} className='border-t'>
                        <td className='p-3'>{user.username}</td>
                        <td className='p-3'>{user.email}</td>
                        <td className='p-3'>
                            <span className='text-sm px-2 py-1 bg-indigo-100 text-indigo-700'>
                                {user.role}
                            </span>
                        </td>
                        <td className='p-3'>
                       <span
                  className={`px-2 py-1 text-sm rounded ${
                    user.blocked
                      ? "bg-red-200 text-red-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {user.blocked ? "Blocked" : "Active"}
                </span>

                        </td>

                        <td className="p-3 text-center space-x-2">
                
                <button
                onClick={() => onDelete(user._id)}
                className="text-red-600 hover:underline">
                Delete
                </button>
                </td>
                <td className='p-3 text-center space-x-2'>
                    <button
                onClick={() => onBlock(user._id)}
                className="text-purple-80000 hover:underline"
                >
                {user.blocked ? "Unblock" : "Block"}
                </button>
                </td>
                    </tr>
                ))}
            </tbody>
        </table>
      
    </div>
  )
}

export default UserTable
