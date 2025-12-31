import axios from 'axios';
import React, {useState} from 'react'
import User from './Components/User';

const App = () => {

  const [allUsers, setallUsers] = useState([]);

  async function getData(){
    const response = await axios.get('https://picsum.photos/v2/list?page=2&limit=100')
    console.log(response.data);

    setallUsers(response.data);
  }

  return (
    <div>
      <button onClick={getData}>GET DATA</button>

      {allUsers.map(function(elem,idx){
        // console.log(elem);
        return <User key={idx} user = {elem} />
      })}


    </div>
  )
}

export default App