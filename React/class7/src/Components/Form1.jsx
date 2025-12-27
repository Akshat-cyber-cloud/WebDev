import React from 'react'
import { useState } from 'react'

const Form1 = () => {

    const [formData, setFormData] = useState({
        name: '',
        number: '',
        email: ''
    });

    const [users, setUsers] = useState([]);

    const handleChange = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;

        const newFormData = {
            ...formData
        }

        newFormData[inputName] = inputValue;

        setFormData(newFormData);

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setUsers([...users, formData]);

        setFormData({
            name: '',
            number: '',
            email: ''
        });
    };



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" required name='name' value={formData.name} placeholder='Enter Name' onChange={handleChange} /> <br />
                <input type="number" required name='number' value={formData.number} placeholder='Enter Number' onChange={handleChange} /> <br />
                <input type="email" required name='email' value={formData.email} placeholder='Enter Email' onChange={handleChange} /> <br />

                <button type='submit'>Submit</button>
            </form>

            <h3>Users List</h3>

            {users.map((user, index) => (
                <div key={index}>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Number:</strong> {user.number}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            ))}
        </div>
    )
}

export default Form1