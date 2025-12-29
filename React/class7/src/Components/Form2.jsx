import React, { useState } from 'react'
import '../index.css'

const Form2 = () => {

    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [input3, setInput3] = useState("");

    const [users, setUsers] = useState([]);
    const colors = ["yellow", "blue", "pink", "green", "purple"];


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            id: Date.now(),
            name: input1,
            number: input2,
            email: input3,
            color: colors[Math.floor(Math.random() * colors.length)]
        };

        // console.log(formData);
        setUsers([...users, formData])

        setInput1("");
        setInput2("");
        setInput3("");
    };

    const deleteUser = (id) => {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
    }


    return (
        <div className='form-wrapper'>
            <form className='form' onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter Your Value"
                    value={input1}
                    required
                    onChange={(e) => setInput1(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Enter the number"
                    value={input2}
                    required
                    onChange={(e) => setInput2(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={input3}
                    required
                    onChange={(e) => setInput3(e.target.value)}
                />

                <button type="submit">Submit</button>
            </form>

            <div className='card-container'>
                {users.map((user) => (
                    <div className={`card ${user.color}`} key={user.id}>
                        <p><strong>Name: </strong> {user.name}</p>
                        <p><strong>Number: </strong> {user.number}</p>
                        <p><strong>Mail: </strong> {user.email}</p>

                        <button
                            className="delete-btn"
                            onClick={() => deleteUser(user.id)}
                        >Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Form2;
