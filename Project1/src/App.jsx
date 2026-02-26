import { useState } from 'react'
import FaceExpression from './features/Expression/components/FaceExpression'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <FaceExpression />
  )
}

export default App
