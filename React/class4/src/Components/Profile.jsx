import React from 'react'
import UserCard from './UserCard'


const Profile = (props) => {
  return (
    <div className='grid gap-6'>
        {props.users.map((user) => (
            <UserCard key = {user.id} user = {user} />
        ))}
    </div>
  )
}

export default Profile