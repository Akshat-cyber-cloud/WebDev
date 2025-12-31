import React from 'react'
import { useState } from 'react'
import Aside from './Components/Aside'
import Home from './Components/Home'

const App = () => {

   const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Aside collapsed={collapsed} setCollapsed={setCollapsed} />
      <Home />
    </div>
  )
}

export default App