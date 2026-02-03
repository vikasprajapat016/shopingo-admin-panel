import React, {useState} from 'react'
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const baseUrl = import.meta.env.VITE_API_URL;


const CreateUser = ({onClose,  onUserCreated}) => {

    const [form, setForm ] = useState({
        username: "",
        email: "",
        password: "",
        role: "USER",
    });

    const handleChange = (e) => {
        setForm({ ...form , [e.target.name] : e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {username , email, password, role} = form;

        if (!username || !email || !password) {
            return toast.error("All fields are required ")
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            return toast.error("Invalid email address")
        }
        if (password.length < 6) {
            console.log(password)
            return toast.error("Password must be atleast 6 characters")
        }

        console.log(form)

       try {
      const response = await fetch(`${baseUrl}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        return toast.error(data.message || "Signup failed!");
      }

      toast.success(data.message || "Account created successfully!");
     
    } catch (error) {
      toast.error(error?.message || "Server error, please try again");
    }
    onUserCreated();
   onClose();
  };

 
  return (
    <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>
        <div className='w-full bg-gray-300 max-w-md rounded-xl p-6'>
            <h2 className='text-2xl font-bold  text-center'>Create User</h2>

            <form className='space-y-4 mt-5' onSubmit={handleSubmit}>


                <input 
                name="username"
                type='text'
                placeholder='Full Name'
                onChange={handleChange}
                className='w-full border p-3 rounded-lg'/>


                <input 
                name="email"
                type='email'
                placeholder='Email'
                onChange={handleChange}
                className='w-full border p-3 rounded-lg'/>

                <input 
                name="password"
                type='password'
                placeholder='Password'
                onChange={handleChange}
                className='w-full border p-3 rounded-lg'/>

                <select
                name="role"
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
            >
                <option value="USER" defaultChecked>User</option>
                <option value="USER_ADMIN">User Admin</option>
                <option value="PRODUCT_ADMIN">Product Admin</option>
                <option value="ORDER_ADMIN">Order Admin</option>
            </select>


              <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-400 hover:bg-red-500 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-800 cursor-pointer text-white"
            >
              Create
            </button>
          </div>
            </form>
        </div>
      
    </div>
  )
}

export default CreateUser;
