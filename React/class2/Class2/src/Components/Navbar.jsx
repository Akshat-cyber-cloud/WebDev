import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-black text-white flex items-center justify-between h-17'>
        <div className= 'text-3xl p-5 font-bold'>
            <h1>DVSY</h1>
        </div>

        <div className= 'flex items-center gap-5 p-5'>
            <a href="#" className='bg-gray-800 px-3 py-2'>DESIGNERS</a>
            <a href="#" className='bg-gray-800 px-3 py-2'>COLLARS</a>
            <a href="#" className='bg-gray-800 px-3 py-2'>EVENTS</a>
            <a href="#" className='bg-gray-800 px-3 py-2'>BLOG</a>
            <a href="#" className='bg-gray-800 px-3 py-2'>CARD</a>
            <button className='bg-amber-800 px-3 py-2 hover:active:scale-97'>GET IN TOUCH</button>
        </div>
    </nav>
  )
}

export default Navbar