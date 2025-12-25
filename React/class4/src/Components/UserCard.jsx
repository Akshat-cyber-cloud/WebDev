import React from 'react'

const UserCard = (props) => {

    const { name, role, location, online } = props.user;

    return (
        <div className='border rounded-xl p-5 bg-white shadow-md w-80'>
            <h1 className='text-2xl font-bold text-emerald-600'>
                {name}
            </h1>

            <p className='text-gray-700'>{role}</p>

            <p className='text-gray-500 text-sm'>{location}</p>

            <div className='flex items-center gap-2 mt-3'>
                <span
                    className={`h-3 w-3 rounded-full ${online ? "bg-green-500" : "bg-red-500"
                        }`}
                ></span>
                <p className="text-sm font-medium">
                    {online ? "Online" : "Offline"}
                </p>
            </div>
        </div>
    )
}

export default UserCard