import React from 'react'
import { useState } from 'react'

const Counter = () => {
    const [count, setCount] = useState(0);

    // Batch Updating State
    const incrementValue = () => {
        setCount(count + 1);
        setCount(count + 1);
        setCount(count + 1);  // The last set is called
    }
    // Output: Value +1

    const handleClick = () => {
        setCount(prev => prev + 1); 
        setCount(prev => prev + 1);
    };
    // Output: Value +2

    return (
        <div className='flex items-center justify-center flex-col min-h-screen bg-gray-100'>
            <h1 className='text-2xl font-bold mb-4'>Counter MINI Task</h1>
            <h2 className='text-xl font-semibold'>Value {count}</h2>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-2 rounded' onClick={() => setCount(count + 1)}>Increment Value</button>
            <button className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 mb-2 rounded' onClick={() => setCount(0)}>Reset Value</button>
            <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => setCount(count - 1)}>Decrement Value</button>
        </div>
    )
}

export default Counter