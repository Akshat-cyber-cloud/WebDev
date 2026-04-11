import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#131313] border-t border-zinc-900 w-full py-16">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 font-body text-sm">
        <div className="col-span-1 lg:col-span-1">
          <div className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-500">bolt</span>
            Gauntlet AI
          </div>
          <p className="text-zinc-500 leading-relaxed mb-6">
            Evaluate smarter. Ship better. The industry standard for blind LLM evaluation.
          </p>
          <div className="font-mono text-[10px] text-zinc-700 tracking-tighter uppercase">
            Built with Groq · Gemini · Mistral
          </div>
        </div>
        <div>
          <h5 className="text-zinc-100 font-bold mb-4">Platform</h5>
          <ul className="space-y-2 text-zinc-500">
            <li><a className="hover:text-amber-400 transition-colors" href="#">Public Leaderboard</a></li>
            <li><a className="hover:text-amber-400 transition-colors" href="#">Private Arena</a></li>
            <li><a className="hover:text-amber-400 transition-colors" href="#">API Access</a></li>
            <li><a className="hover:text-amber-400 transition-colors" href="#">Integrations</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-zinc-100 font-bold mb-4">Company</h5>
          <ul className="space-y-2 text-zinc-500">
            <li><a className="hover:text-amber-400 transition-colors" href="#">Privacy Policy</a></li>
            <li><a className="hover:text-amber-400 transition-colors" href="#">Terms of Service</a></li>
            <li><a className="hover:text-amber-400 transition-colors" href="#">Security</a></li>
            <li><a className="hover:text-amber-400 transition-colors" href="#">API Status</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-zinc-100 font-bold mb-4">Community</h5>
          <ul className="space-y-2 text-zinc-500">
            <li><a className="hover:text-amber-400 transition-colors" href="#">Twitter</a></li>
            <li><a className="hover:text-amber-400 transition-colors" href="#">Discord</a></li>
            <li><a className="hover:text-amber-400 transition-colors" href="#">GitHub</a></li>
            <li><a className="hover:text-amber-400 transition-colors" href="#">Documentation</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 mt-16 pt-8 border-t border-zinc-900/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-zinc-500 text-xs">
          © 2024 Gauntlet AI. Engineered for precision.
        </div>
        <div className="flex gap-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase">SYSTEMS_OPERATIONAL</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
