import React from 'react'

const ListItems = ({ user, toggleButton }) => {
  return (
    <div>
      <h3 className='text-white'>{user.name}</h3>

      <p className='text-white'>Status: {user.active ? "Active" : "Inactive"}</p>

      <button className='text-white' onClick={() => toggleButton(user.id)}>
        Toggle
      </button>
    </div>
  )
}

export default ListItems