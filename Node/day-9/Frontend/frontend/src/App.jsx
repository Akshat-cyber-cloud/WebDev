import React, { useState } from 'react'
import axios from "axios";

const App = () => {

  const [notes, setNotes] = useState([
    {
      title: "Test Title",
      bio: "test description"
    },

    {
      title: "Test Title1",
      bio: "test description"
    },

    {
      title: "Test Title2",
      bio: "test description"
    }
  ])

  axios.get('http://localhost:3000/api/notes')
  .then((res) => {
    setNotes(res.data.notes)
  })


  return (
    <>
      <div className="notes">
        {
          notes.map(note => {
            return <div className="note">
              <h1>{note.title}</h1>
              <p> {note.bio}</p>
            </div>
          })
        }
      </div>
    </>
  )
}

export default App