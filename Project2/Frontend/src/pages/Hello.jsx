import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Hello = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/battle');
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="font-dm-mono text-primary animate-pulse tracking-widest uppercase text-xs">
          Synchronizing Neural Link...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 arena-grid relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none"></div>
      
      <div className="max-w-2xl w-full bg-surface-container border border-white/5 p-16 text-center relative overflow-hidden shadow-2xl shadow-black/50">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        
        <div className="mb-12">
          <div className="w-20 h-20 bg-primary/20 flex items-center justify-center mx-auto mb-8 ghost-border">
            <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified_user
            </span>
          </div>
          <h1 className="font-syne text-5xl md:text-7xl uppercase tracking-tighter text-white mb-6">
            Hello, <span className="text-primary italic">{user?.name}</span>
          </h1>
          <p className="font-dm-sans text-xl text-on-surface/60 font-light leading-relaxed mb-12 max-w-lg mx-auto">
            You have successfully bypassed the neutrality protocol and entered the Gauntlet AI high-court. Your neural profile is now active.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link to="/" className="w-full md:w-auto bg-primary text-on-primary px-10 py-5 text-sm font-bold tracking-widest uppercase hover:brightness-110 transition-all">
            Return to Arena
          </Link>
          <button 
            onClick={logout}
            className="w-full md:w-auto ghost-border px-10 py-5 text-sm font-bold tracking-widest uppercase text-on-surface/60 hover:text-white hover:bg-surface-container transition-all"
          >
            Terminate Session
          </button>
        </div>
        
        <div className="mt-16 pt-8 border-t border-outline-variant flex justify-between items-center text-[10px] font-dm-mono text-on-surface/20 uppercase tracking-[0.3em]">
          <span>Auth_Status: Verified</span>
          <span>Access_Level: Research_Agent</span>
        </div>
      </div>
    </div>
  );
};

export default Hello;
