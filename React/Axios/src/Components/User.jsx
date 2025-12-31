import React from 'react'

const User = ({user}) => {

    const color1 = Math.floor(Math.random() * 256);
    const color2 = Math.floor(Math.random() * 256);
    const color3 = Math.floor(Math.random() * 256);

  return (
    <div style={{backgroundColor: `rgb(${color1}, ${color2}, ${color3})`}} className='h-[300px] w-[300px] rounded-2xl m-3 p-2 text-white'>
        <h1>Author: {user.author}</h1>
        <p>ID: {user.id}</p>
    </div>
  )
}

export default User