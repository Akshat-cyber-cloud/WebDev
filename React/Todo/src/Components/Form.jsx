import React from 'react'
import FormInput from './FormInput'
import FormOutput from './FormOutput'

const Form = ({username, setUsername, image, setImage, role, setRole, desc, setDesc, submitHandler, users}) => {
  return (
    <div>
        <FormInput 
          username={username} 
          setUsername={setUsername} 
          image={image} 
          setImage={setImage} 
          role={role} 
          setRole={setRole} 
          desc={desc} 
          setDesc={setDesc} 
          submitHandler={submitHandler}
        />
        <FormOutput users={users}/>
    </div>
  )
}

export default Form