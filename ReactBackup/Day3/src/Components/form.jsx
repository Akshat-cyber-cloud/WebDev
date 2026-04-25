import React from 'react'
import { useState } from 'react';

const form = () => {

    const [name, setName] = useState("");
    const [age, setAge] = useState("");

    const [formData, setFormData] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = [...formData]
        newData.push({ name, age });
        setFormData(newData);

        console.log(newData);
    }

    // Explicit return form.map(()=> {}) => return is must be used
    // Implicit return form.map(() => ()) => return is not required


  return (
    <div className='min-h-screen flex items-center justify-center flex-col bg-black'>
        <form onSubmit={handleSubmit} className='w-60 h-50 bg-gray-600 rounded-md border-2 flex flex-col items-center justify-center gap-3'>
            <input value={name} onChange={(e) => setName(e.target.value)} className='border border-white rounded-md p-2' type='text' placeholder='Enter Your Name' />
            <input value={age} onChange={(e) => setAge(e.target.value)} className='border border-white rounded-md p-2' type='text' placeholder='Enter Your Age' />
            <input className='bg-blue-500 text-white py-2 px-4 rounded-md active:scale-95' type='submit' />
        </form>

        <div>
            {formData.map((data, index) => {
                return (
                    <div key={index} className='bg-gray-600 text-white p-2 rounded-md mt-3'>
                        <p className='text-xl text-violet-400'>Name: {data.name}</p>
                        <p className='text-xl text-violet-400'>Age: {data.age}</p>
                    </div>
                );
            })}
        </div>
    </div>
  )
}

export default form