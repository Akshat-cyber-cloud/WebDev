import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate();
  return (
    <div className='footer'>
        <h2>Footer</h2>
        <button onClick={() => navigate('/courses')}>Explore More Courses</button>
    </div>
  )
}

export default Footer