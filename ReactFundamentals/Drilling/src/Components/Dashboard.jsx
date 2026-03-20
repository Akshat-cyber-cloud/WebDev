import React from 'react'
import Sidebar from './Sidebar'

const Dashboard = ({name , isPremium, avatarUrl}) => {
  return (
    <div>
        This is DashBoard Page Your data is passed
        <Sidebar name={name} isPremium = {isPremium} avatarUrl = {avatarUrl} />
    </div>
  )
}

export default Dashboard