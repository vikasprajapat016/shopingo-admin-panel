import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa';


  const baseUrl = import.meta.env.VITE_API_URL; 

const LowProducts = ({products = []}) => {
    if (products.length === 0) return null;



  return (
    <div className='bg-red-500/10 border border-red-500 rounded p-5'>
      <h3 className='text-lg font-semibold mb-5 flex items-center gap-2 text-red-400'>
        <FaExclamationTriangle/>
        Low Stock Alert
      </h3>

      <ul className='space-y-3'>
        {products.map((item) => (
            <li
            key={item._id}
            className='flex justify-between items-center rounded-lg bg-gray-700 p-3'>
                <div className="flex items-center gap-3">
              <img
                src={`${baseUrl}/${item.thumbnail}`}
                alt={item.title}
                className="w-10 h-10 rounded-md object-cover"
              />
              <span className="text-gray-200 text-sm font-medium">
                {item.title}
              </span>
            </div>

            <span className="text-red-400 text-sm font-semibold">
              {item.stock} left
            </span>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default LowProducts
