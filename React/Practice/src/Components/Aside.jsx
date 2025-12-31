import React from 'react';

const Aside = ({ collapsed, setCollapsed }) => {
  return (
    <aside
      className={`
        bg-gray-900 text-white min-h-screen p-4
        transition-all duration-300
        ${collapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mb-6 bg-gray-700 px-2 py-1 rounded"
      >
        {collapsed ? '➡️' : '⬅️'}
      </button>

      {/* Menu */}
      <ul className="space-y-3">
        <li className="cursor-pointer hover:text-purple-400">
          {collapsed ? '🏠' : 'Home'}
        </li>
        <li className="cursor-pointer hover:text-purple-400">
          {collapsed ? '🔍' : 'Explore'}
        </li>
        <li className="cursor-pointer hover:text-purple-400">
          {collapsed ? '🎭' : 'Genres'}
        </li>
        <li className="cursor-pointer hover:text-purple-400">
          {collapsed ? '⚙️' : 'Settings'}
        </li>
      </ul>
    </aside>
  );
};

export default Aside;
