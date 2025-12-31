import React from 'react'
import { useState } from 'react'
import Form from './Components/Form.jsx'

const App = () => {
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [role,setRole] = useState("");
  const [desc,setDesc] = useState("");  
  

  const[users,setUsers] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();

    if(!username || !image || !role || !desc){
      alert("Please fill all the fields");
      return;
    }

    const newUser = {
      id: Date.now(),
      username,
      image,
      role,
      desc
    }

    setUsers([...users,newUser]);

    setUsername("");
    setImage("");
    setRole("");
    setDesc("");
  }

  return (
    <div className='min-h-screen bg-black text-white p-6'>
      <Form  
        username={username} 
        setUsername={setUsername} 
        image={image} 
        setImage={setImage} 
        role={role} 
        setRole={setRole} 
        desc={desc} 
        setDesc={setDesc} 
        submitHandler={submitHandler}
        users={users}
      />
    </div>
  )
}

export default App