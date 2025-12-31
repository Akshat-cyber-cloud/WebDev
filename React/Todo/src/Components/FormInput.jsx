import React from 'react'

const FormInput = ({username, setUsername, image, setImage, role, setRole, desc, setDesc, submitHandler}) => {
  return (
    <div>
        <form onSubmit={submitHandler} className='flex flex-wrap justify-center'>

            <input type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter Name'
            className='m-2 p-2 border border-amber-100  rounded-md text-white'
            />
            <input type="text" 
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder='Enter Image URL'
            className='m-2 p-2 border border-amber-100  rounded-md text-white'
            />
            <input type="text" 
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder='Enter Role'
            className='m-2 p-2 border border-amber-100 rounded-md text-white'
            />
            <input type="text" 
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder='Enter Description'
            className='m-2 p-2 border border-amber-100 rounded-md text-white'
            />

            <button type='submit' className='bg-emerald-600 px-5 py-3 rounded m-2 w-[90%] font-semibold'>
                Create User
            </button>
        </form>

    </div>
  )
}

export default FormInput