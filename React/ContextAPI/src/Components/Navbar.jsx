import React, { useState } from 'react'

const Navbar = ({ theme, setTheme, changeTheme }) => {

  const [newTheme, setNewTheme] = useState('')
  return (
    <div className='nav'>
      <h1>Theme is {theme}</h1>

      <form onSubmit={(e) => {
        e.preventDefault();
        console.log(newTheme)

        changeTheme(newTheme);

        setNewTheme('');
      }}>
        <input type="text" placeholder='Enter Name' onChange={(e) => {
          setNewTheme(e.target.value)
        }} />
        <button>Submit</button>
      </form>

      <button onClick={() => {
        setTheme(theme === 'light' ? 'dark' : 'light')
      }
      }>
        Change Theme
      </button>
    </div>
  )
}

export default Navbar