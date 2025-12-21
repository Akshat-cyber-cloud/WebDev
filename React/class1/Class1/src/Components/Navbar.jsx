import React from 'react'
import '../index.css'

const Navbar = () => {
  return (
    <nav>
        <div className="name">
            <h2>Horizon Courts</h2>
        </div>
        <div className="services">
            <a href="#">About Us</a>
            <a href="#">Services</a>
            <a href="#">Events</a>
            <a href="#">Coaches</a>
            <a href="#">Contact</a>
        </div>
        <div className="book">
            <button>Book Now</button>
        </div>
    </nav>
  )
}

export default Navbar