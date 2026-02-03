import React, { useEffect, useState } from 'react'
import CreateUser from './CreateUser';
import UserTable from '../components/UserTable';
import api from '../api/axios';
import toast from 'react-hot-toast';
const Users = () => {
 const [activeTab, setActiveTab] = useState("USERS");
 const [openModal, setOpenModal] = useState(false);
 const [users, setUsers] = useState([]);


 const Users = users.filter((u) => u.role === "USER")
 const Admins = users.filter((u) => u.role !== "USER")
  const filteredUsers =
    activeTab === "USERS"
      ? users.filter((u) => u.role === "USER")
      : users.filter((u) => u.role !== "USER");

 const fetchUsers = async() => {
       try {
     const res = await api.get("admin/users")
     console.log(res)
     setUsers(res.data.users);
   } catch (error) {
    toast.error("Failed to load users")
   }
  }


  const handleDeleteUser = async (id) => {
  
  try {
    await api.delete(`/admin/user/${id}`);
    toast.success("User deleted");
    fetchUsers(); // 🔥 refresh list
  } catch (error) {
    toast.error(error.response?.data?.message ||"Delete failed");
  }
};

const handleBlockUser = async (id) => {
  try {
   const res = await api.patch(`/admin/user/block/${id}/`);
    toast.success(res.data.message);
    fetchUsers(); // 🔥 refresh list
  } catch(err) {
  
    toast.error(err.response?.data?.message || "Action failed");
  }
};


 useEffect( () => {
  
  fetchUsers();
  },[])
 

  return (
    <div className='p-6 w-full '>
      <div className='flex justify-between items-center'  >
        <div className='flex gap-3'>
          <button
          className={`text-2xl px-5 py-2 font-semibold rounded-md cursor-pointer ${
            activeTab === "USERS" ? "bg-indigo-500 text-white"
            : "bg-gray-200 text-gray-700"
          }  `}
          onClick={() => setActiveTab("USERS")}
          >Users <span className=''>({Users.length})</span></button> 

          <button 
          className={`text-2xl rounded-md px-5 py-2 font font-semibold cursor-pointer ${
            activeTab === "ADMIN" ? "bg-indigo-500 text-white"
            : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("ADMIN")}
          >Admins <span className=''>({Admins.length})</span></button>     
        </div>

        <button 
        onClick={() => setOpenModal(true)}
        className='text-2xl text-white bg-green-600 rounded-xl hover:bg-green-700 px-4 py-2  cursor-pointer'>+ Create User</button>
      </div>

      <div className='border border-b border-gray-500 mt-10 '></div>

      <div className='bg-gray-300 rounded-xl mt-20 w-full shadow p-6 '>
        {activeTab === "USERS" && (
          <UserTable users={filteredUsers} 
          onDelete={handleDeleteUser}
          onBlock={handleBlockUser}/>
        )}

          {activeTab === "ADMIN" && (
          <UserTable users={filteredUsers}
          onDelete={handleDeleteUser}
          onBlock={handleBlockUser} />
        )}

      
        {openModal && (<CreateUser onClose = {() => setOpenModal(false)}   onUserCreated={fetchUsers}/>)}
      </div>
      
    </div>
  )
}

export default Users
