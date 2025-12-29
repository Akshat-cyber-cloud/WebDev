import React from 'react'

const Aside = () => {
    const MenuItem = ({ icon, label, active }) => {
        return (
            <div
                className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer
      ${active ? 'bg-purple-600/20 text-white' : 'hover:bg-white/5'}`}
            >
                <span className="text-lg">{icon}</span>
                <span className="text-sm">{label}</span>
            </div>
        );
    };

    return (
        <aside className="w-64 min-h-screen text-gray-300 px-5 py-6 flex flex-col rounded-r-2xl">

            {/* Logo */}
            <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                    ▶
                </div>
                <h1 className="text-white text-xl font-bold">Drameeo</h1>
            </div>

            {/* Menu */}
            <div className="space-y-2">
                <MenuItem icon="🏠" label="Home" active />
                <MenuItem icon="🔍" label="Explore" />
                <MenuItem icon="🎭" label="Genres" />
                <MenuItem icon="❤️" label="Favourites" />
            </div>

            {/* Library */}
            <div className="mt-10">
                <p className="text-xs uppercase text-gray-500 mb-3">Library</p>
                <div className="space-y-2">
                    <MenuItem icon="▶" label="Continue Watching" />
                    <MenuItem icon="🕒" label="Recently Added" />
                    <MenuItem icon="📁" label="My Collections" />
                    <MenuItem icon="⬇️" label="Downloads" />
                </div>
            </div>

            {/* Settings */}
            <div className="mt-auto">
                <MenuItem icon="⚙️" label="Settings" />
            </div>
        </aside>
    )
}

export default Aside