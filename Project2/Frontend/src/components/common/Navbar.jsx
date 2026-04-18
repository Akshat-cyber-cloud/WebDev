import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import GauntletLogo from '../ui/GauntletLogo';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 transition-all duration-300"
      initial={{ backgroundColor: 'rgba(8, 8, 13, 0)', backdropFilter: 'blur(0px)', borderBottom: '1px solid rgba(255, 255, 255, 0)' }}
      animate={{
        backgroundColor: isScrolled ? 'rgba(8, 8, 13, 0.8)' : 'rgba(8, 8, 13, 0)',
        backdropFilter: isScrolled ? 'blur(16px)' : 'blur(0px)',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(255, 255, 255, 0)',
        boxShadow: isScrolled ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : 'none'
      }}
    >
      <div className="flex justify-between items-center h-20 px-8 max-w-screen-2xl mx-auto font-headline tracking-tight">
        <div className="flex items-center gap-8">
          <Link className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2.5" to="/">
            <GauntletLogo size={30} />
            Gauntlet AI
          </Link>
          <div className="hidden md:flex gap-6 items-center">
            <Link className="text-primary font-bold border-b-2 border-primary pb-1" to="#">Arena</Link>
            <a className="text-zinc-400 font-medium hover:text-zinc-100 transition-all duration-300" href="#">Leaderboard</a>
            <a className="text-zinc-400 font-medium hover:text-zinc-100 transition-all duration-300" href="#">Docs</a>
            {/* <a className="text-zinc-400 font-medium hover:text-zinc-100 transition-all duration-300" href="#">Pricing</a> */}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-6">
              <Link to="/hello" className="text-zinc-100 font-dm-mono text-xs uppercase tracking-widest hover:text-primary transition-colors">
                Agent: {user.name}
              </Link>
              <button
                onClick={logout}
                className="px-6 py-2 bg-surface border border-outline-variant text-primary text-xs font-bold uppercase tracking-widest hover:bg-surface-container transition-all"
              >
                Exit Hub
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="px-5 py-2 text-zinc-400 font-medium hover:text-zinc-100 active:scale-95 duration-200 transition-all">
                Sign In
              </Link>
              <Link to="/register" className="px-6 py-2 bg-primary text-on-primary font-bold active:scale-95 duration-200 transition-all shadow-lg shadow-primary/20 uppercase text-xs tracking-widest">
                Join Arena
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

