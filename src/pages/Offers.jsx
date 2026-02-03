import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const Offers = () => {
    const navigate = useNavigate();


    const handleOffers = () => {

    }


    
  return (
    <div>

        <div className='w-full p-2'>
            <div className="flex justify-between items-center mb-10">
                <h2 className='text-3xl font-bold '>Offers</h2>
                <button 
                onClick={() => navigate("/admin/offers/add")}
                className='text-white bg-blue-600 hover:bg-blue-800 cursor-pointer px-3 py-1 text-2xl font-bold rounded-md '>
                     + Add Offer
                </button>
            </div>

           
        </div>
      <Outlet/>
    </div>
  )
}

export default Offers
