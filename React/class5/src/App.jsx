import { useState } from "react"
import React from 'react'
import Form from './Components/Form'

const App = () => {

  const[items,setItems] = useState([]);

  const btnClick = (text) => {
    const handleData = {
      id: Date.now(),
      text: text
    };

    setItems([...items,handleData]);
  }

  const handleDelete = (id) => {
    const store =  items.filter(item => item.id !== id);
    setItems(store);
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <Form  items = {items} btnClick = {btnClick} handleDelete = {handleDelete} />
    </div>
  )
}

export default App