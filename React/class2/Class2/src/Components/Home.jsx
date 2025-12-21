import React from "react";

const Home = () => {
  return (
    <div className="w-full px-3 py-6 bg-black">
      <div className="relative h-[660px] w-full rounded-xl overflow-hidden">
        <img
          src="https://images.pexels.com/photos/11167644/pexels-photo-11167644.jpeg"
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 flex items-center h-full px-10">
          <h1 className="text-white text-6xl md:text-7xl font-semibold tracking-wide">
            DESIGN
          </h1>
          <h1 className="text-white text-6xl md:text-7xl font-semibold tracking-wide">& FREEDOM</h1>
        </div>

      </div>
    </div>
  );
};

export default Home;
