import React from 'react'
import { NavLink } from 'react-router'

const Navbar = () => {
  return (
    <div className='flex justify-center items-center gap-x-10 text-2xl mb-10'>
        <NavLink to="/" className={(e) => e.isActive ? "text-red-300" : ""}>
            Home
        </NavLink>
        <NavLink to="/recipes" className={(e) => e.isActive ? "text-red-300" : ""}>
            Recipes
        </NavLink>
        <NavLink to="/about" className={(e) => e.isActive ? "text-red-300" : ""}>
            About
        </NavLink>
        <NavLink to="/create" className={` px-4 py-2 bg-gray-900 rounded-xl ${(e) => e.isActive ? "text-red-300" : ""}`}>
            Create Recipes
        </NavLink>
    </div>
  )
}

export default Navbar