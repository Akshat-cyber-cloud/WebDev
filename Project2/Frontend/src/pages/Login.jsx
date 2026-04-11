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
      navigate('/hello');
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
      <div className="max-w-md w-full bg-surface-container/90 backdrop-blur-xl border border-white/5 p-10 relative shadow-2xl shadow-black/50 z-10 ring-1 ring-white/10">        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
        
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

        <p className="mt-8 font-dm-sans text-xs text-on-surface/40 text-center">
          New researcher? <Link to="/register" className="text-primary hover:underline">Apply for Entry</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
