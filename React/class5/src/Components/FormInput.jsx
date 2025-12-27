// import React, { useState } from 'react'

// const FormInput = ({ addItem }) => {

//     const [input, setInput] = useState("");

//     const handleAdd = () => {
//         if(input.trim() === "") return;

//         addItem(input);
//         setInput("");
//     };

//     return (
//         <div>
//             <input type="text" value={input} onChange={(e) => setInput(e.target.value)} 
//                 placeholder='Enter Value'
//             />

//             <button onClick={handleAdd}>Add</button>
//         </div>
//     )
// }

// export default FormInput

import React from 'react'
import { useState } from 'react'

const FormInput = ({btnClick}) => {

    const[input,setInput] = useState("");

    const handleInput = () => {
        if(input.trim() === "") return;

        btnClick(input);
        setInput("");
    }

  return (
    <div className='flex gap-2 mb-4'>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder='Enter Your Name'
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition' onClick={handleInput}>ADD ITEM</button>
    </div>
  )
}

export default FormInput