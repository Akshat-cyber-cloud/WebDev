import React, { useEffect, useState } from 'react'
import axios from 'axios';

// React focus on UI but if we need to do some side work we use it
// UseEffect is a hook that is a side stack like fetching data from an API.
const App = () => {

  const [counter, setCounter] = useState(0);
  const [pokemin, setPokemon] = useState([]);

  const getData = async () => {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon')
    setPokemon(response.data.results);
  }

  useEffect(() => {
    getData();
  },[])

  return (
    <div>
      <button onClick={getData}>Click</button>
      {pokemin.map((item, index) => (
        <p key={index}>{item.name}</p>
      ))}
    </div>
  )
}

export default App;