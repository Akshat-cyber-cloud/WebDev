import React from 'react';

const Aside = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-xl font-bold mb-6">Aside</h1>

      <ul className="space-y-3">
        <li className="hover:text-purple-400 cursor-pointer">Home</li>
        <li className="hover:text-purple-400 cursor-pointer">Explore</li>
        <li className="hover:text-purple-400 cursor-pointer">Genres</li>
        <li className="hover:text-purple-400 cursor-pointer">Settings</li>
      </ul>
    </aside>
  );
};

export default Aside;
