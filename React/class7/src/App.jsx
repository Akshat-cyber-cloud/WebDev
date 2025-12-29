// import React from 'react';
// import { useState } from 'react';

// const App = () => {

//   const [user, setUser] = useState('');

//   const [allUsers, setAllUsers] = useState([]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newAllUsers = [...allUsers]

//     newAllUsers.push(user);

//     setAllUsers(newAllUsers);

//      setAllUsers([...allUsers, {title, email}]) - shortcut

//     setUser('');
//   };


//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="text" placeholder="Enter name" value={user} required onChange={(e) => {
//           // console.log(e.target.value);
//           setUser(e.target.value);
//         }} />
//         <button type="submit">Submit</button>
//       </form>

//       {allUsers.map((elem) => {
//         return <h1> {elem} </h1>;
//       })}
//     </div>
//   );
// };

// export default App;

import React from 'react'
// import Form from './Components/Form'
// import Form1 from './Components/Form1'
import Form2 from './Components/Form2'

const App = () => {
  return (
    <div>
      <Form2 />
    </div>
  )
}

export default App