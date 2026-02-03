import React, { useState, useEffect } from 'react'
import axios from "axios";

const App = () => {

  const [notes, setNotes] = useState([]);
  const [editBio, setEditBio] = useState("");


  console.log("Yo");

  function fetchNotes() {
    axios.get('http://localhost:3000/api/notes')
      .then((res) => {
        setNotes(res.data.notes)
      })
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  function handleSubmit(e){
    e.preventDefault();

    const {title,bio} = e.target.elements;

    console.log(title.value,bio.value);

    axios.post("http://localhost:3000/api/notes", {
      title: title.value,
      bio: bio.value
    })
    .then(res => {
      console.log(res.data);

      fetchNotes();
    })
  }

  function handleDelete(noteId){
    axios.delete("http://localhost:3000/api/notes/" + noteId)
    .then(res => {
      console.log(res.data);
      fetchNotes();
    })
  }

  function handleUpdate(userId){
    axios.patch(`http://localhost:3000/api/notes/${userId}`, {
      bio:editBio
    })
    .then(res => {
      console.log(res.data)
    })
  }


  return (
    <>

      <form className='note-create-form' onSubmit={handleSubmit}>
        <input type="text" name='title' placeholder='Enter Title' />
        <input type="text" name='bio' value={editBio} onChange={(e) => setEditBio(e.target.value)} placeholder='Enter Description'/>
        <button>Create Note</button>
      </form>


    
      <div className="notes">
        {
          notes.map(note => {
            return <div className="note">
              <h1>{note.title}</h1>
              <p> {note.bio}</p>
              <button onClick={() => {handleUpdate(note._id)}}>Update</button>
              <button onClick={() => {handleDelete(note._id)}}>Delete</button>
            </div>
          })
        }
      </div>
    </>
  )
}

export default App