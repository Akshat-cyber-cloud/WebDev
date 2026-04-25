import React from 'react'
import Counter from './Components/Counter'
import Feature from './Components/Feature'

const App = () => {

  const users = [
    { id: 1, name: 'Akshat' },
    { id: 2, name: 'John' },
    { id: 3, name: 'Jane' },
  ]

  return (
    <div className='flex gap-4'>
      {users.map((user) => (
        <Feature key={user.id} name={user.name} />
      ))}
    </div>
  )
}

export default App