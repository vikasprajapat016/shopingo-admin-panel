import React from 'react'
import { Outlet } from 'react-router-dom'

const CategoryLayout = () => {
  return (
   <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Categories</h1>

       
      </div>

      {/* Child routes render here */}
      <Outlet />
    </div>
  )
}

export default CategoryLayout
