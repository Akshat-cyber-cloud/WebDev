import React from 'react'
import Profile from './Components/Profile';

const App = () => {

  function sayHello() {
    console.log("Hello Triggered");
  }

  const user = [
    {
      id: 1,
      name: "Akshat Gupta",
      role: "Developer",
      location: "Banglore",
      online: true
    },
    {
      id: 2,
      name: "Riya Sharma",
      role: "UI/UX Designer",
      location: "Delhi",
      online: false
    },
    {
      id: 3,
      name: "Arjun Verma",
      role: "Backend Developer",
      location: "Bangalore",
      online: true
    },
    {
      id: 4,
      name: "Sneha Kapoor",
      role: "Full Stack Developer",
      location: "Mumbai",
      online: false
    }
  ]

  return (
    <div className='min-h-screen bg-black flex items-center justify-center'>
      <Profile users = {user} />
    </div>

    // <div className='min-h-screen bg-black flex gap-10 items-center justify-center'>
    //   {user.map((elem, idx) => {
    //     return (
    //       <div key={idx} className='bg-white flex flex-col  px-4 py-3 w-60'>
    //         <h1 className='text-2xl font-bold text-emerald-700 mb-4'>Profile Section</h1>

    //         <h2 className='text-xl mb-4 font-semibold'>Name: {elem.name}</h2>

    //         <h2 className='text-xl font-semibold mb-4'>Role: {elem.role}</h2>

    //         <div className='flex items-center'>
    //           <span className='h-3 w-3 rounded-full bg-red-600 mr-5' >

    //           </span>
    //           <h3 className='font-bold'>{elem.online ? "Online" : "Offline"}</h3>
    //         </div>
    //       </div>
    //     )
    //   })}
    // </div>
  )
}

export default App
