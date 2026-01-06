import React from 'react'
import Navbar from './Components/Navbar'
import AllSection from './Components/AllSection'
import Footer from './Components/Footer'

const App = () => {

  const user = "Akshat"

  const courseData = {
    courseName: 'Cohort2.0',
    instructore: 'Sarthak',
    mentor: 'Anubhav'
  }

  return (
    <div>
      <Navbar />
      <AllSection />
      <Footer />
    </div>
  )
}

export default App