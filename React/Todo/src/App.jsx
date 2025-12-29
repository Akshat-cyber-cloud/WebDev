import React, { useState } from 'react';

const App = () => {
  const [username, setUsername] = useState('');
  const [image, setImage] = useState('');
  const [role, setRole] = useState('');
  const [desc, setDesc] = useState('');
  const [users, setUsers] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!username || !image || !role || !desc) {
      alert("Please fill all fields");
      return;
    }

    const newUser = {
      id: Date.now(),
      username,
      image,
      role,
      desc,
    };

    setUsers([...users, newUser]);

    // clear inputs
    setUsername('');
    setImage('');
    setRole('');
    setDesc('');
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Form */}
      <form
        onSubmit={submitHandler}
        className="flex flex-wrap justify-center"
      >
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-2 text-xl font-semibold px-5 py-2 rounded m-2 w-[48%] bg-transparent"
          type="text"
          placeholder="Enter Your Name"
        />

        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border-2 text-xl font-semibold px-5 py-2 rounded m-2 w-[48%] bg-transparent"
          type="text"
          placeholder="Image URL"
        />

        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border-2 text-xl font-semibold px-5 py-2 rounded m-2 w-[48%] bg-transparent"
          type="text"
          placeholder="Enter Your Role / Position"
        />

        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="border-2 text-xl font-semibold px-5 py-2 rounded m-2 w-[48%] bg-transparent"
          type="text"
          placeholder="Enter Description"
        />

        <button
          type="submit"
          className="bg-emerald-600 px-5 py-3 rounded m-2 w-[90%] active:scale-95 font-semibold"
        >
          Create User
        </button>
      </form>

      {/* User Cards */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-gray-900 rounded-xl p-5 text-center shadow-lg"
          >
            <img
              src={user.image}
              alt={user.username}
              className="w-24 h-24 mx-auto rounded-full object-cover mb-3"
            />
            <h2 className="text-xl font-bold">{user.username}</h2>
            <p className="text-emerald-400 font-medium">{user.role}</p>
            <p className="text-sm mt-2 text-gray-300">{user.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
