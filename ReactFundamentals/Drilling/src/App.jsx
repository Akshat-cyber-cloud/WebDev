import React from 'react'
import Dashboard from './Components/Dashboard'

const App = () => {
  return (
    <div>
      <Dashboard 
        name = "Priya"
        isPremium = "true"
        avatarUrl = "https://i.pravatar.cc/150?img=47" 
      />
    </div>
  )
}

export default App