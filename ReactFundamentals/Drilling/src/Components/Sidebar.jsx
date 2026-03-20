import React from 'react'
import UserProfile from './UserProfile'

const Sidebar = ({name , isPremium, avatarUrl}) => {
  return (
    <div>
        <UserProfile name = {name} isPremium = {isPremium} avatarUrl = {avatarUrl} />
    </div>
  )
}

export default Sidebar