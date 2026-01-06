import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import About from './Pages/About.jsx'
import Product from './Pages/Product.jsx'
import Men from './Pages/Men.jsx'

const App = () => {
  return (
    <div>
      <div className='flex justify-between px-8 py-4 bg-pink-800 mb-8'>
        <h2>Navbar</h2>
        <div className='flex gap-8'>
          {/* <a href="/">Home Page</a>
          <a href="/about">About Page</a> */}
          <Link to = '/'>Home Page</Link>
          <Link to = '/about'>About Page</Link>
          <Link to = '/product'>Product Page</Link>
        </div>
      </div>
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = '/about' element = {<About />} />
        <Route path = '/product' element = {<Product />} />
        <Route path = '/product/men' element = {<Men />} />
      </Routes>
    </div>
  )
}

export default App