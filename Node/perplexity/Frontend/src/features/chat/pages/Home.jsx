import React from "react";
import { useNavigate } from "react-router";
import "../styles/home.css";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="bg-[#131313] text-[#e5e2e1] font-body selection:bg-[#ff5722]/30 selection:text-[#ffdbd1] overflow-x-hidden min-h-screen">
            {/* TopNavBar */}
            <nav className="fixed top-0 w-full z-50 bg-[#131313]/80 backdrop-blur-xl border-b border-[#5B4039]/20">
                <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
                    <div className="text-2xl font-extrabold tracking-tighter text-[#FFB5A0]">EMBER</div>
                    <div className="hidden md:flex items-center space-x-8 font-manrope text-sm font-medium tracking-wide uppercase">
                        <a className="text-[#FFB5A0] border-b-2 border-[#FF5722] pb-1" href="#">Product</a>
                        <a className="text-[#E5E2E1]/60 hover:text-[#FFB5A0] transition-colors duration-300" href="#">Features</a>
                        <a className="text-[#E5E2E1]/60 hover:text-[#FFB5A0] transition-colors duration-300" href="#">Live Feed</a>
                    </div>
                    <div className="flex items-center space-x-6 font-manrope text-sm font-medium tracking-wide uppercase">
                        <button 
                            onClick={() => navigate("/login")}
                            className="text-[#E5E2E1]/60 hover:text-[#FFB5A0] transition-colors duration-300"
                        >
                            Sign In
                        </button>
                        <button 
                            onClick={() => navigate("/login")}
                            className="ember-gradient text-[#3b0900] px-6 py-2.5 rounded-lg font-bold tracking-tight scale-100 hover:scale-105 active:scale-95 transition-transform"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            <main className="relative pt-32 min-h-screen flex flex-col items-center justify-center px-6">
                {/* Background Neural Visualization */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full neural-glow"></div>
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #FF5722 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                    <img 
                        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30" 
                        alt="Intricate glowing orange neural network connections" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoUVSjVK5rZ9rnhAoTd_jDgE5gGIu4z3Y245mm-AHDk41PeASnLXmZwHALqs3IJgxdtkj5BS4yMpQGaIZB0B8K6EYeOM2enfH5e2p0m6W4ikl65c01enkkDr26vBTx_W6_MinR00mtp9CjAu7RLa0COY7TDZ69mNhd5wWlTwYeTLN895VyhG_8hrCNEy4nS2UjtW-PahFJuLGAly9AfWIk2iXWrsJeIAMjb9bX55rtSJz_6minSi8NWnEasB4pOHpfqTMXLLU4VqZe" 
                    />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 w-full max-w-5xl text-center space-y-12">
                    <div className="space-y-4">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 glass-panel rounded-full mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5722] animate-pulse"></span>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#ffb5a0]">System Online: v4.0.2</span>
                        </div>
                        <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-[-0.03em] leading-tight text-[#e5e2e1]">
                            Intelligence, <span className="text-[#ffb5a0] italic font-medium">Refined.</span><br/>
                            Workflow, <span className="text-[#ff5722]">Redefined.</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-[#e5e2e1]/60 text-lg md:text-xl font-light leading-relaxed">
                            Harness the volatile energy of next-generation kinetic AI. Precision processing meets atmospheric design for the modern enterprise.
                        </p>
                    </div>

                    {/* Search Area */}
                    <div className="max-w-3xl mx-auto w-full group">
                        <div className="relative glass-panel p-2 rounded-2xl ring-1 ring-[#5b4039]/10 focus-within:ring-[#ffb5a0]/40 transition-all duration-500 shadow-2xl">
                            <div className="absolute inset-0 noise-texture rounded-2xl"></div>
                            <div className="flex items-center bg-[#0e0e0e] rounded-xl px-6 py-4 border border-[#5b4039]/10">
                                <span className="material-symbols-outlined text-[#ffb5a0]/40 mr-4">terminal</span>
                                <input 
                                    className="w-full bg-transparent border-none text-[#e5e2e1] placeholder-[#e5e2e1]/30 focus:ring-0 text-lg font-light" 
                                    placeholder="Ask anything..." 
                                    type="text" 
                                />
                                <button className="flex items-center justify-center w-12 h-12 rounded-lg ember-gradient shadow-[0_0_20px_rgba(255,87,34,0.3)] hover:shadow-[0_0_30px_rgba(255,87,34,0.5)] transition-all">
                                    <span className="material-symbols-outlined text-[#3b0900] font-bold">keyboard_return</span>
                                </button>
                            </div>
                        </div>

                        {/* Neural Indicators */}
                        <div className="mt-8 flex flex-wrap justify-center gap-8 md:gap-12">
                            <div className="flex items-center space-x-3 group/item cursor-default">
                                <div className="relative">
                                    <div className="absolute -inset-1 bg-[#ffb5a0]/20 blur-sm rounded-full scale-0 group-hover/item:scale-100 transition-transform"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff5722] shadow-[0_0_8px_#FF5722]"></div>
                                </div>
                                <span className="text-[10px] uppercase tracking-[0.15em] text-[#e5e2e1]/40 group-hover/item:text-[#ffb5a0] transition-colors">Real-Time Analysis</span>
                            </div>
                            <div className="flex items-center space-x-3 group/item cursor-default">
                                <div className="relative">
                                    <div className="absolute -inset-1 bg-[#ffb5a0]/20 blur-sm rounded-full scale-0 group-hover/item:scale-100 transition-transform"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff5722] shadow-[0_0_8px_#FF5722]"></div>
                                </div>
                                <span className="text-[10px] uppercase tracking-[0.15em] text-[#e5e2e1]/40 group-hover/item:text-[#ffb5a0] transition-colors">Pulse Check</span>
                            </div>
                            <div className="flex items-center space-x-3 group/item cursor-default">
                                <div className="relative">
                                    <div className="absolute -inset-1 bg-[#ffb5a0]/20 blur-sm rounded-full scale-0 group-hover/item:scale-100 transition-transform"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff5722] shadow-[0_0_8px_#FF5722]"></div>
                                </div>
                                <span className="text-[10px] uppercase tracking-[0.15em] text-[#e5e2e1]/40 group-hover/item:text-[#ffb5a0] transition-colors">Market Trends</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Asymmetric Detail: Floating Card */}
                <div className="absolute bottom-24 right-12 hidden lg:block w-72 glass-panel p-6 rounded-xl border-l-4 border-[#ff5722] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="noise-texture absolute inset-0 rounded-xl"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="text-[10px] font-bold tracking-widest text-[#ffb5a0] uppercase">Ember Engine</div>
                        <span className="material-symbols-outlined text-[#ffb5a0] scale-75">bolt</span>
                    </div>
                    <div className="space-y-3">
                        <div className="h-1 w-full bg-[#353534] rounded-full overflow-hidden">
                            <div className="h-full w-[65%] ember-gradient"></div>
                        </div>
                        <p className="text-[11px] leading-relaxed text-[#e5e2e1]/70">
                            Proprietary neural architecture optimizing workflow throughput by 42%.
                        </p>
                        <div className="flex items-center text-[10px] text-[#ffb5a0]/80 font-bold uppercase tracking-tighter">
                            Active Pipeline <span className="ml-2 material-symbols-outlined text-[12px]">arrow_forward</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
