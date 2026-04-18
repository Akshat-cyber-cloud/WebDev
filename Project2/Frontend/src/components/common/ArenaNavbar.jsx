import React from 'react';
import GauntletLogo from '../ui/GauntletLogo';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ArenaNavbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Battle', path: '/battle' },
    { name: 'History', path: '/history' },
    { name: 'Leaderboard', path: '/leaderboard' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant">
      <div className="max-w-screen-2xl mx-auto px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <GauntletLogo size={32} />
            <span className="font-headline font-bold text-xl tracking-tight text-on-surface">
              GAUNTLET <span className="text-primary">AI</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs uppercase tracking-[0.2em] font-medium transition-all hover:text-primary ${
                  location.pathname === link.path ? 'text-primary' : 'text-on-surface/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Profile & Logout */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-mono text-primary uppercase tracking-widest leading-none mb-1">Authenticated</span>
            <span className="text-sm font-medium text-on-surface">{user?.name || 'Research Agent'}</span>
          </div>
          
          <div className="h-10 w-10 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center overflow-hidden">
             {user?.avatar ? (
               <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
             ) : (
               <span className="material-symbols-outlined text-on-surface/30">person</span>
             )}
          </div>

          <button 
            onClick={logout}
            className="p-2 hover:bg-surface-container-high rounded-full transition-all text-on-surface/50 hover:text-error group"
            title="Terminate Session"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default ArenaNavbar;
