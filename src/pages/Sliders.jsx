import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const Sliders = () => {

    const navigate = useNavigate();

  return (
    <div>
      <div className='p-6 mb-6 '>
        <h1 className='text-3xl font-bold'>Sliders</h1>

      </div>


    <div className=''>
       <div className='flex justify-between'>
        <div></div>
         <button 
        onClick={() => navigate(`/admin/sliders/create`)}
        className='text-3xl bg-blue-600 px-5 py-2 rounded-md text-white cursor-pointer'>
            Create Slider
        </button>
       </div >
    </div>

    <div className=''>
        <Outlet/>
    </div>
    </div>
  )
}

export default Sliders
