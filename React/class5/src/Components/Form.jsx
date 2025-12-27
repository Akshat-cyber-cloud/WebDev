import React from 'react'
import FormInput from './FormInput'
import FormOutput from './FormOutput'

const Form = ({items , btnClick, handleDelete}) => {
  return (
    <div className='bg-white w-[50vh] p-6 rounded-xl shadow-lg'>

      <h1 className='text-2xl font-bold text-center mb-5'>
        TODO APP
      </h1>

      <FormInput btnClick = {btnClick} />
      <FormOutput items={items} handleDelete = {handleDelete} />
    </div>
  )
}

export default Form