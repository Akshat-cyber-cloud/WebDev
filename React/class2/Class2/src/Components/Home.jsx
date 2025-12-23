import React from "react";

const Home = () => {
  return (
    <section className="bg-black px-4 p-5">
      <div className="relative h-[90vh] w-full overflow-hidden rounded-2xl">
        <img
          src="https://images.pexels.com/photos/11167644/pexels-photo-11167644.jpeg"
          alt="hero"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 flex h-full items-center px-10 md:px-20">
          <div className="flex flex-col gap-3 w-full">

            <h1 className="text-white self-start text-8xl lg:text-8xl font-semibold tracking-widest">
              DESIGN
            </h1>

            <h1 className="text-white self-center text-8xl lg:text-8xl font-semibold tracking-widest">
              & FREEDOM
            </h1>

            <p className="mt-4 max-w-md sm:text text-gray-300 font-medium leading-relaxed self-center">
              Explore Independent Style by Embracing Uniqueness <br />
              with Our Exclusive Designer Apparel
            </p>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Home;
