import React,{useContext} from 'react'
import { UserContextData } from '../context/UserContext';

const Navbar = () => {

  const user = useContext(UserContextData);

  return (
    <div className='h-20 w-full bg-emerald-600 font-bold'>
      This is Navbar {user}
    </div>
  )
}

export default Navbar