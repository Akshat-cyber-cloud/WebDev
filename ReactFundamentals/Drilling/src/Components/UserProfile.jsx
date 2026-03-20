import React from 'react'
import Avatar from './Avatar'

const UserProfile = ({name , isPremium, avatarUrl}) => {
  return (
    <div>
        <Avatar name = {name} isPremium = {isPremium} avatarUrl = {avatarUrl} />
    </div>
  )
}

export default UserProfile