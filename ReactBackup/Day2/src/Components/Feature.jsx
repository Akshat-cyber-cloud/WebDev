import React from 'react'
import { useState } from 'react'

const Feature = ({ name }) => {
    const [Like, setLike] = useState(0);

    const handleLike = () => {
        setLike(Like + 1);
    }

    // Here we are using map with spread operator {It's used to create a new refrence}

    // const handleLike = (id) => {
    //     setUsers(users.map(user =>
    //         user.id === id
    //             ? { ...user, like: user.like + 1 }
    //             : user
    //     ));
    // };

    return (
        <div className='h-30vh'>
            <div className='h-60 w-60 bg-gray-500 flex flex-col p-7'>
                <img className='h-20 w-20 rounded-full' src="https://images.pexels.com/photos/9880321/pexels-photo-9880321.jpeg" alt="" />
                <h3 className='text-xl font-bold'>{name}</h3>
                <p className='text-gray-300 items-center'>Lorem, ipsum dolor.</p>
                <div>
                    <button onClick={() => setLike(handleLike)} className='bg-blue-500 text-white py-2 px-4 rounded'>Like</button>
                    <button onClick={() => {if(Like > 0){setLike(Like - 1)}}} className='bg-red-500 text-white py-2 px-4 rounded'>Dislike</button>
                </div>
                <p>LikeCount: {Like}</p>
            </div>
        </div>
    )
}

export default Feature