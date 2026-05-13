import { useState } from "react";

function App() {
  const [msg, setMsg] = useState("");

  const callAPI = async () => {
    const res = await fetch("http://localhost:5000/api");
    const data = await res.json();
    setMsg(data.message);
  };

  return (
    <div>
      <h1>DevOps Test</h1>
      <button onClick={callAPI}>Call Backend</button>
      <p>{msg}</p>
    </div>
  );
}

export default App;