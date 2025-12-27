import React from 'react'
import hero from '../assets/Gemini_Generated_Image_9h2c4z9h2c4z9h2c.png'

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-800 p-10">
            <div
                className="h-screen bg-cover bg-center rounded-4xl p-6 flex flex-col items-start justify-between"
                style={{
                    backgroundImage: `url(${hero})`,
                    height: '450px'
                }}
            >
                <div className=' px-5 py-3 border border-amber-100 rounded-full backdrop-blur-10xl font-bold'>
                    <h1 className='text-white'>Now Trending 🔥</h1>
                </div>

                <div className='flex gap-3 text-white'>
                    <span className='font-semibold text-md border border-amber-200 px-4 py-2 rounded-full'>Fantasy</span>
                    <span className='font-semibold text-md border border-amber-200 px-4 py-2 rounded-full'>Drama</span>
                </div>

                <div className='text-white'>
                    <h1 className='text-7xl font-bold mb-4'>Dimensional Kids on Adventure</h1>
                    <p className='text-2xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores laudantium  <br />illum autem natus enim animi facere, exercitationem fuga. Ducimus, natus.</p>
                </div>

                <div className='text-white flex gap-5'>
                    <button className='px-4 py-2 border border-amber-300 rounded-full font-semibold bg-blue-600'>Watch Now</button>
                    <button className='px-4 py-2 border border-amber-300 rounded-full font-semibold'>Download</button>
                    <button className='px-5 py-2 border border-amber-300 rounded-full text-xl font-semibold'>...</button>
                </div>
            </div>

            <div className="w-full px-6 py-6 ">

                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-white text-xl font-semibold">
                        Continue Watching
                    </h1>
                    <button className="text-md text-gray-400 hover:text-white">
                        See All
                    </button>
                </div>

                <div className="flex gap-5 overflow-x-auto scrollbar-hide">

                    <div className="min-w-70 h-40 rounded-xl overflow-hidden relative">

                        {/* Background Image */}
                        <img
                            src="https://images.unsplash.com/photo-1606112219348-204d7d8b94ee"
                            className="w-full h-full object-cover"
                            alt=""
                        />

                        <div className="absolute bottom-3 left-3 right-3 text-white">
                            <h2 className="text-sm font-semibold">
                                Legends of the Emerald Mist
                            </h2>

                            <div className="flex justify-between text-xs text-gray-300 mt-1">
                                <span>S1, Ep-3</span>
                                <span>30min 55sec</span>
                            </div>

                            <div className="mt-2 h-1 bg-gray-600 rounded">
                                <div className="h-full w-[60%] bg-purple-500 rounded"></div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        </div>
    )
}

export default Home
