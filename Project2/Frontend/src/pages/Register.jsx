import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import GauntletLogo from '../components/ui/GauntletLogo';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { register, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(formData.name, formData.email, formData.password);
    if (result.success) {
      navigate('/battle');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Volumetric "Halo" Background Engine */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
        {/* Deep grid base */}
        <div className="absolute inset-[-50px] arena-grid opacity-[0.07]"></div>
        
        {/* Primary Central Portal Glow */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-[800px] h-[800px] bg-primary/20 blur-[140px] rounded-full mix-blend-screen"
        ></motion.div>
        
        {/* Intense white backlight right behind the card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/10 blur-[80px] rounded-full mix-blend-overlay"></div>
      </div>

      {/* Researcher Onboarding Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20, perspective: 1000, rotateX: 5 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-[440px] w-full bg-[#0a0a0a]/80 backdrop-blur-2xl border-y border-white/[0.08] border-x border-white/[0.04] p-10 relative z-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] rounded-xl"
      >
        {/* Subtle top edge highlighting */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>

        {/* Close/Back Button */}
        <Link
          to="/"
          className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors z-20"
          aria-label="Return home"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </Link>

        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <GauntletLogo size={48} />
          </div>
          <h1 className="font-headline text-2xl font-bold tracking-tight text-white mb-2 uppercase">Create Profile</h1>
          <p className="text-zinc-500 text-sm font-light">Initialize your secure researcher identity</p>
        </div>

        {/* Error Notification */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-500/10 border border-red-500/20 p-4 mb-8 text-red-500 text-xs uppercase tracking-widest font-mono rounded"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Full Name</label>
            <div className="relative group">
              <input
                required
                type="text"
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3.5 text-zinc-200 placeholder:text-zinc-700 text-sm outline-none transition-all focus:border-primary/50 focus:bg-white/[0.05] focus:shadow-[0_0_15px_rgba(245,158,11,0.1)]"
                placeholder="Agent Smith"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Registry ID (Email)</label>
            <div className="relative group">
              <input
                required
                type="email"
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3.5 text-zinc-200 placeholder:text-zinc-700 text-sm outline-none transition-all focus:border-primary/50 focus:bg-white/[0.05] focus:shadow-[0_0_15px_rgba(245,158,11,0.1)]"
                placeholder="agent@sovereign.lab"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Access Key (Password)</label>
            <div className="relative group">
              <input
                required
                type="password"
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3.5 text-zinc-200 placeholder:text-zinc-700 text-sm outline-none transition-all focus:border-primary/50 focus:bg-white/[0.05] focus:shadow-[0_0_15px_rgba(245,158,11,0.1)]"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-primary text-[#050505] py-4 rounded-lg font-bold uppercase tracking-widest text-xs hover:brightness-110 active:scale-[0.98] transition-all relative overflow-hidden group shadow-lg shadow-primary/10"
          >
            <span className="relative z-10 transition-transform group-hover:scale-105 inline-block">Request Hub Access</span>
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center px-4">
            <div className="w-full border-t border-white/[0.05]"></div>
          </div>
          <div className="relative flex justify-center text-[9px] uppercase tracking-[0.3em] text-zinc-600">
            <span className="bg-[#0a0a0a] px-4">Authorized Identity Gate</span>
          </div>
        </div>

        {/* Third Party Login */}
        <button
          onClick={() => window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth/google`}
          className="w-full bg-white/[0.03] border border-white/[0.1] text-zinc-300 py-3.5 rounded-lg font-mono text-[10px] uppercase tracking-widest hover:bg-white/[0.06] hover:border-white/[0.2] transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Verification with Google
        </button>

        {/* Footer Link */}
        <p className="mt-10 text-zinc-500 text-[11px] text-center tracking-wide">
          Already authorized? <Link to="/login" className="text-primary hover:text-primary-light transition-colors font-medium">Log in to Hub</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
