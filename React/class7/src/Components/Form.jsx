import React from 'react'
import { useState } from 'react';

const Form = () => {

    const [user,newUser] = useState('');
    const [allUsers,newAllUsers] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = [...allUsers];
        data.push(user);

        newAllUsers(data);

        newUser('');
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Enter Your Name' value={user} onChange={(e) => {
                // console.log(e.target.value);
                newUser(e.target.value);
            }}/>
            <button type='submit'>Submit</button>
        </form>

        {allUsers.map((elem) => {
            return <h1>{elem}</h1>
        })}
    </div>
  )
}

export default Form