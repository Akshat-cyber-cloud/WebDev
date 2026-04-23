import React from 'react'
import '../styles/Card.css'

const Card = ({ person }) => {
  return (
    <div className="Cards">
      <h2>Developer {person.name}</h2>
      <p>College: {person.college}</p>
      <p>Degree: {person.degree}</p>
    </div>
  )
}

export default Card