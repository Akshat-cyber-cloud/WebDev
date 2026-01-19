import React, {useContext} from 'react'
import { UserContextData } from '../context/UserContext';

const Footer = () => {
  const user = useContext(UserContextData);
  return (
    <div className='absolute bottom-0 w-screen h-20 bg-blue-700'>
        This is Footer {user}   
    </div>
  )
}

export default Footer