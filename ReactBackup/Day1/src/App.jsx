import React from "react";
import Card from "./components/Card";
import './styles/Card.css'

const App = () => {

  const persons = [
    {
      id: 1,
      name: "Akshat",
      college: "LPU",
      degree: "BTECH"
    },
    {
      id: 2,
      name: "Rahul",
      college: "LPU",
      degree: "BTECH"
    }

  ];


  return (
    <div className="container">
      {persons.map((person) => (
        <Card key={person.id} person={person} />
      ))}
    </div>
  )
}

export default App