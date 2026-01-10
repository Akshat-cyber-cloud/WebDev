import React from 'react'
import { createBrowserRouter, Link, NavLink, Route, RouterProvider, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Contact from './Components/Contact'
import Courses from './Components/Courses'
import Kodex from './Components/Kodex'
import Kodr from './Components/Kodr'
import AllCourses from './Components/AllCourses'
import Footer from './Components/Footer'
import { create } from 'framer-motion/m'

const App = () => {

  // const router = createBrowserRouter(
  //   [
  //     {
  //       path: '/',
  //       element: <Home />
  //     },
  //     {
  //       path: '/contact',
  //       element: <Contact />
  //     },
  //     {
  //       path: '/courses',
  //       element: <Courses />
  //     }
  //   ]
  // )

  return (
    <div className='main'>
      <nav className='navbar'>
        <NavLink style={
          ({ isActive }) => { return { color: isActive ? 'lightblue' : 'black' } }
        } to='/'>Home</NavLink> |
        <NavLink to='/contact' style={({ isActive }) => { return { color: isActive ? 'red' : 'black' } }}>Contact</NavLink> |

        <NavLink to='/courses'>Courses</NavLink> |
      </nav>

      <div className="content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/courses' element={<Courses />} > 
            <Route path='/courses' element={<AllCourses />} />
            <Route path = '/courses/kodr' element={<Kodr />} />
            <Route path = '/courses/kodex' element={<Kodex />} />
          </Route>
        </Routes>
      </div>

      {/* <RouterProvider router={router} /> */}

      <Footer />
    </div>
  )
}

export default App

