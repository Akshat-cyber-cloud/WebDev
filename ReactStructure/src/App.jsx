import React from 'react'
import Mainroutes from './routes/Mainroutes'
import Navbar from './Components/Navbar'

const App = () => {
  return (
    <div className='w-screen h-screen py-10 px-[10%] bg-gray-800 text-white font-thin'>
      <Navbar />
      <Mainroutes />
    </div>
  )
}

export default App