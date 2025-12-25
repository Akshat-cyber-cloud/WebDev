import React, {useState} from 'react'
import ListItems from './Components/ListItems';

const App = () => {

  const [users, setUsers] = useState([
    { id: 1, name: "Aman", active: true },
    { id: 2, name: "Neha", active: false }
  ]);

  const toggleButton = (id) => {
    const toggleData = users.map((user) => {
      if(user.id === id){
        return {...user, active: !user.active};
      }else{
        return user;
      }
    });
    setUsers(toggleData);
  }

  return (
    <div className='min-h-screen bg-black'>
      {users.map((user) => (
        <ListItems
          key={user.id}
          user={user}
          toggleButton={toggleButton}
        />
      ))}
    </div>
  )
}

export default App