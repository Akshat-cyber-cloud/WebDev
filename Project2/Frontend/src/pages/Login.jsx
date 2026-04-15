import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate('/battle');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Premium Animated Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-[-50px] arena-grid animate-grid-drift opacity-60"></div>
        {/* Soft floating orbs (Pure Green) */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/10 blur-[130px] rounded-full animate-float mix-blend-screen"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[700px] h-[700px] bg-primary/10 blur-[150px] rounded-full animate-float-reverse mix-blend-screen"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 blur-[140px] rounded-full animate-float mix-blend-screen"></div>
      </div>

      {/* Foreground Card */}
      <div className="max-w-md w-full bg-surface-container/90 backdrop-blur-xl border border-white/5 p-10 relative shadow-2xl shadow-black/50 z-10 ring-1 ring-white/10">
        <Link
          to="/"
          className="absolute top-6 right-6 text-on-surface/40 hover:text-white transition-colors z-20"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </Link>
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

        <div className="text-center mb-10">
          <Link to="/" className="font-syne text-2xl uppercase tracking-tighter text-white inline-block mb-8">
            Gauntlet <span className="text-primary italic">AI</span>
          </Link>
          <h1 className="font-syne text-3xl uppercase tracking-tight text-white mb-2">Researcher Login</h1>
          <p className="font-dm-sans text-on-surface/40 text-sm">Access the high-court database</p>
        </div>

        {error && (
          <div className="bg-error/10 border border-error/20 p-4 mb-6 text-error text-xs uppercase tracking-widest font-dm-mono">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-dm-mono text-[10px] uppercase tracking-[0.2em] text-on-surface/40 mb-2">Registry ID (Email)</label>
            <input
              required
              type="email"
              className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary text-on-surface placeholder:text-on-surface/20 py-3 font-dm-sans outline-none"
              placeholder="agent@sovereign.lab"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block font-dm-mono text-[10px] uppercase tracking-[0.2em] text-on-surface/40 mb-2">Access Key (Password)</label>
            <input
              required
              type="password"
              className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary text-on-surface placeholder:text-on-surface/20 py-3 font-dm-sans outline-none"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button type="submit" className="w-full bg-primary text-background py-5 font-bold uppercase tracking-[0.2em] text-sm hover:brightness-110 active:scale-[0.98] transition-all">
            Unlock Database
          </button>
        </form>


        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-outline-variant/30"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-on-surface/30">
            <span className="bg-surface-container px-4">Or continue with</span>
          </div>
        </div>

        <button
          onClick={() => window.location.href = 'http://localhost:3000/api/auth/google'}
          className="w-full bg-white/5 border border-white/10 text-white py-4 font-dm-mono text-xs uppercase tracking-[0.2em] hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Google Identity
        </button>


        <p className="mt-8 font-dm-sans text-xs text-on-surface/40 text-center">
          New researcher? <Link to="/register" className="text-primary hover:underline">Apply for Entry</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
