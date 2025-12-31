import React from 'react';

const Home = () => {
  return (
    <main className="flex-1 bg-gray-800 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold">Home Page</h1>

      <p className="mt-4 text-gray-300">
        This is the main content area.  
        It automatically takes the remaining space after the Aside.
      </p>

      <div className="mt-8 p-6 bg-gray-700 rounded-lg">
        <h2 className="text-xl font-semibold">Content Section</h2>
        <p className="mt-2 text-gray-300">
          Add your hero section, cards, movies, etc. here.
        </p>
      </div>
    </main>
  );
};

export default Home;
