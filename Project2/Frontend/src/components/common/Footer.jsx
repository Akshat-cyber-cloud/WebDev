import React from 'react';
import GauntletLogo from '../ui/GauntletLogo';

const Footer = () => {
  return (
    <footer className="bg-[#101010] min-h-[500px] mt-24 relative overflow-hidden flex flex-col justify-between pt-24 px-8 md:px-16 lg:px-24 border-t border-white/5">
      
      {/* Top section: Info and Links */}
      <div className="max-w-screen-2xl mx-auto w-full flex flex-col md:flex-row justify-between mb-32 z-10">
        
        {/* Left Side: Logo Marker & Tagline */}
        <div className="mb-16 md:mb-0 max-w-sm">
          <div className="mb-6 opacity-60">
            <GauntletLogo size={32} color="rgb(212, 212, 216)" />
          </div>
          <p className="text-xl md:text-2xl text-zinc-300 font-light leading-snug">
            Gauntlet is the home<br/>you've been searching for.
          </p>
        </div>

        {/* Right Side: Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24 text-sm text-zinc-400">
          <div className="flex flex-col gap-4">
            <h6 className="text-[10px] uppercase font-bold text-zinc-600 tracking-widest mb-1">Useful</h6>
            <a href="#" className="hover:text-zinc-100 transition-colors">Manifesto</a>
            <a href="#" className="hover:text-zinc-100 transition-colors">Careers</a>
          </div>
          <div className="flex flex-col gap-4">
            <h6 className="text-[10px] uppercase font-bold text-zinc-600 tracking-widest mb-1">Legal</h6>
            <a href="#" className="hover:text-zinc-100 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-100 transition-colors">Terms & Conditions</a>
          </div>
          <div className="flex flex-col gap-4">
            <h6 className="text-[10px] uppercase font-bold text-zinc-600 tracking-widest mb-1">Updates</h6>
            <a href="#" className="hover:text-zinc-100 transition-colors">Twitter</a>
            <a href="#" className="hover:text-zinc-100 transition-colors">Instagram</a>
          </div>
        </div>
      </div>

      {/* Massive Background Text */}
      <div className="absolute left-0 w-full flex justify-center pointer-events-none select-none z-0" 
           style={{ bottom: '-15%', transform: 'translateY(10%)' }}>
        <h1 className="font-headline font-bold text-[#b8b8b8] opacity-[0.9] tracking-tighter whitespace-nowrap m-0 p-0 scale-y-110" 
            style={{ fontSize: 'min(24vw, 360px)', lineHeight: '0.75' }}>
          GAUNTLET
        </h1>
      </div>
      
    </footer>
  );
};

export default Footer;
