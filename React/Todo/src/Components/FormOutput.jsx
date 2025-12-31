import React from 'react';

const FormOutput = ({ users }) => {
  return (
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

          <p className="text-emerald-400 font-medium">
            {user.role}
          </p>

          <p className="text-sm mt-2 text-gray-300">
            {user.desc}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FormOutput;
