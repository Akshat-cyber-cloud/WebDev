import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { useAuth } from "../../auth/hook/useAuth";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
    Plus,
    Send,
    LogOut,
    Trash2,
    Bell,
    User as UserIcon
} from "lucide-react";
import "../styles/dashboard.css";

export default function Dashboard() {
    const chat = useChat();
    const { user } = useSelector(s => s.auth);
    const { handleLogout } = useAuth();
    const { chats, currentChatId, isLoading } = useSelector(s => s.chat);
    const [input, setInput] = useState("");
    const bottom = useRef(null);

    useEffect(() => {
        chat.initializeSocketConnection();
        chat.handleGetChats();
    }, []);

    useEffect(() => {
        bottom.current?.scrollIntoView({ behavior: "smooth" });
    }, [chats, currentChatId, isLoading]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedMessage = input.trim();
        if (!trimmedMessage || isLoading) return;
        chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId });
        setInput("");
    };

    const openChat = (chatId) => {
        chat.handleOpenChat(chatId, chats);
    };

    const messages = chats[currentChatId]?.messages ?? [];

    return (
        <div className="flex h-screen bg-[#131313] text-[#e5e2e1] font-body selection:bg-[#ff5722]/30 overflow-hidden">
            {/* SideNavBar - Kinetic Hearth */}
            <aside className="w-64 flex flex-col py-8 px-4 bg-[#1C1B1B] z-50 border-r border-[#5B4039]/10">
                <div className="mb-10 px-4">
                    <h1 className="text-xl font-extrabold tracking-tighter text-[#FFB5A0] uppercase">Ember AI</h1>
                    <p className="text-[10px] tracking-[0.1em] text-[#E5E2E1]/40 uppercase mt-1 font-bold">The Kinetic Hearth</p>
                </div>

                <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
                    <button
                        onClick={() => chat.handleSetCurrentChatId(null)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${!currentChatId ? 'text-[#FFB5A0] bg-[#2A2A2A] font-bold' : 'text-[#E5E2E1]/60 hover:text-[#E5E2E1] hover:bg-[#2A2A2A]'}`}
                    >
                        <span className="material-symbols-outlined">search</span>
                        <span className="text-sm font-medium">Search</span>
                    </button>

                    <div className="pt-6 pb-2 px-4 text-[10px] uppercase tracking-[0.2em] text-[#E5E2E1]/30 font-bold">Recent Evolution</div>
                    <div className="space-y-1">
                        {Object.values(chats).map((c) => (
                            <div
                                key={c.id}
                                className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 ${c.id === currentChatId ? "bg-[#2A2A2A] text-[#FFB5A0]" : "text-[#E5E2E1]/50 hover:bg-[#2A2A2A]/50 hover:text-[#E5E2E1]"}`}
                                onClick={() => openChat(c.id)}
                            >
                                <span className="flex-1 text-xs font-medium truncate">{c.title}</span>
                                <button
                                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-[#ff5722]/10 hover:text-[#ff5722] rounded transition-all"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        chat.handleDeleteChat(c.id);
                                    }}
                                >
                                    <Trash2 size={12} />
                                </button>
                            </div>
                        ))}
                    </div>
                </nav>

                <div className="mt-auto pt-6 space-y-1 border-t border-[#5B4039]/10">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-[#E5E2E1]/60 font-medium hover:text-[#FFB5A0] hover:bg-[#2A2A2A] rounded-xl transition-all duration-200"
                    >
                        <LogOut size={16} />
                        <span className="text-sm">Log out</span>
                    </button>
                </div>
            </aside>

            {/* Main Canvas */}
            <main className="flex-1 flex flex-col relative bg-[#0e0e0e] overflow-hidden neural-bg">
                {/* TopNavBar */}
                <header className="w-full h-16 flex justify-end items-center px-8 z-40">
                    <div className="flex items-center gap-6">
                        <Bell size={18} className="text-[#E5E2E1]/40 hover:text-[#FFB5A0] cursor-pointer transition-colors" />
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1C1B1B] border border-[#5B4039]/10 group cursor-pointer hover:border-[#FFB5A0]/30 transition-all">
                            <UserIcon size={14} className="text-[#FFB5A0]" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#E5E2E1]/80">{user?.email?.split('@')[0] ?? "Admin"}</span>
                        </div>
                    </div>
                </header>

                {/* Workspace Content */}
                <div className="flex-1 overflow-y-auto no-scrollbar relative">
                    <div className="max-w-5xl mx-auto w-full px-8 py-12 flex flex-col min-h-full">
                        {messages.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-700">
                                {/* Hero Statement */}
                                <div className="text-center mb-16 relative z-10">
                                    <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#e5e2e1] mb-6">
                                        Where <span className="text-[#FFB5A0] italic font-medium">knowledge</span> begins
                                    </h2>
                                    <p className="text-[#e5e2e1]/60 max-w-xl mx-auto text-lg font-light leading-relaxed">
                                        Harness the power of Ember AI to synthesize complex information into actionable insights with kinetic speed.
                                    </p>
                                </div>

                                {/* Bento Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
                                    <div className="md:col-span-8 glass-card rounded-2xl p-8 hover:bg-[#393939]/30 transition-all duration-500 group relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-6">
                                            <span className="material-symbols-outlined text-[#FFB5A0] text-3xl group-hover:scale-110 transition-transform">bolt</span>
                                        </div>
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#FFB5A0] mb-3 block font-bold">System Status</span>
                                        <h3 className="text-2xl font-bold mb-6">Neural Engine v4.2 Active</h3>
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <div className="h-32 md:w-1/3 rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                                                <img
                                                    alt="Abstract data waves"
                                                    className="w-full h-full object-cover"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDQQvFvWbt-3N8WE1C64IPVk1RV8oZwi36-2wCZCMSSkIIAk9lU-JfdE8OO8yItlL5orbBOtfdOlbfg60V1afKMj00CXIE9pTBV5tXY-TM1kmvIYpNWFy4rfWuT3r-iDl4FWiOB2tJRG0SCIzwtXXGKGyUvpGx-b-AibDlXEV9jqxjRxezrceHiYM1T1nt-raulfvFMHaQ908wAmSirc-3RofHl3qvdQUqEEv4o073J5bEGbfqeVPxeTPst-XdrXPjjCFQV9xrbG5m"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-[#e5e2e1]/70 text-sm leading-relaxed mb-6">
                                                    Sub-millisecond latent response times achieved across all library nodes. Semantic mapping precision increased by 42%.
                                                </p>
                                                <button className="text-[#FFB5A0] text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all group/btn">
                                                    View Logs <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:col-span-4 glass-card rounded-2xl p-8 hover:bg-[#393939]/30 transition-all duration-500">
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#ffdf9e] mb-6 block font-bold">Active Streams</span>
                                        <div className="flex items-end gap-3 mb-3">
                                            <span className="text-5xl font-extrabold tracking-tighter text-white">1,204</span>
                                            <span className="text-[#ffdf9e] text-xs mb-2 font-bold">+12%</span>
                                        </div>
                                        <p className="text-[#e5e2e1]/40 text-xs leading-relaxed">Concurrent processing streams currently active in kinetic environment.</p>
                                        <div className="mt-10 flex -space-x-3">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="h-9 w-9 rounded-full border-2 border-[#1C1B1B] bg-[#2A2A2A] overflow-hidden grayscale hover:grayscale-0 transition-all">
                                                    <img src={`https://i.pravatar.cc/100?u=${i}`} className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                            <div className="h-9 w-9 rounded-full border-2 border-[#1C1B1B] bg-[#2A2A2A] flex items-center justify-center text-[10px] font-bold text-[#ffdf9e]">
                                                +4
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:col-span-12 glass-card rounded-2xl p-6 flex items-center justify-between border-l-4 border-[#FFB5A0]">
                                        <div className="flex items-center gap-8">
                                            <div className="flex items-center gap-3">
                                                <div className="h-2 w-2 rounded-full bg-[#FF5722] animate-pulse shadow-[0_0_8px_#FF5722]"></div>
                                                <span className="text-xs font-bold tracking-tight uppercase">System Healthy</span>
                                            </div>
                                            <div className="h-4 w-px bg-[#5B4039]/20"></div>
                                            <div className="flex items-center gap-3 text-[#e5e2e1]/60">
                                                <span className="material-symbols-outlined text-lg">database</span>
                                                <span className="text-xs font-medium uppercase tracking-wider text-muted">8.4 TB Indexed</span>
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-[#e5e2e1]/30 font-bold uppercase tracking-widest">Update: 2m ago</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 space-y-12 pb-32">
                                {messages.map((m, idx) => (
                                    <div key={idx} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="flex gap-6">
                                            <div className="mt-1">
                                                {m.role === "user" ? (
                                                    <div className="h-8 w-8 rounded-lg bg-[#2A2A2A] flex items-center justify-center text-[#ffb5a0] border border-[#5B4039]/20 shadow-lg">
                                                        <UserIcon size={16} />
                                                    </div>
                                                ) : (
                                                    <div className="h-8 w-8 rounded-lg ember-gradient flex items-center justify-center text-[#3b0900] shadow-[0_0_15px_rgba(255,87,34,0.3)]">
                                                        <span className="material-symbols-outlined text-[18px] font-bold">bolt</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 max-w-3xl">
                                                <h4 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e5e2e1]/30 mb-2">
                                                    {m.role === "user" ? "Transmitting" : "Ember Synthesis"}
                                                </h4>
                                                <div className={`prose prose-invert prose-sm max-w-none text-on-surface/90 leading-relaxed font-light text-base`}>
                                                    {m.role === "user" ? (
                                                        <p className="text-lg font-medium tracking-tight text-[#e5e2e1]">{m.content}</p>
                                                    ) : (
                                                        <ReactMarkdown
                                                            remarkPlugins={[remarkGfm]}
                                                            components={{
                                                                p: ({ children }) => <p className="mb-6 last:mb-0">{children}</p>,
                                                                ul: ({ children }) => <ul className="mb-6 list-disc pl-6 space-y-3">{children}</ul>,
                                                                ol: ({ children }) => <ol className="mb-6 list-decimal pl-6 space-y-3">{children}</ol>,
                                                                li: ({ children }) => <li>{children}</li>,
                                                                h1: ({ children }) => <h1 className="mb-6 text-3xl font-bold tracking-tight text-white">{children}</h1>,
                                                                h2: ({ children }) => <h2 className="mb-4 text-2xl font-semibold text-[#FFB5A0] border-b border-[#5B4039]/20 pb-2">{children}</h2>,
                                                                code: ({ children }) => <code className="rounded bg-[#2A2A2A] px-2 py-1 font-mono text-sm text-[#FFB5A0] border border-[#5B4039]/20">{children}</code>,
                                                                pre: ({ children }) => (
                                                                    <div className="relative group my-8">
                                                                        <pre className="overflow-x-auto rounded-2xl bg-[#0e0e0e] p-6 font-mono text-sm border border-[#5B4039]/20 shadow-2xl">
                                                                            {children}
                                                                        </pre>
                                                                    </div>
                                                                ),
                                                                img: ({ src, alt }) => (
                                                                    <div className="my-8 rounded-2xl overflow-hidden glass-card border border-[#5B4039]/20 transition-all hover:border-[#FF5722]/30 group">
                                                                        <img src={src} alt={alt} className="w-full h-auto block" />
                                                                        {alt && <div className="p-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e5e2e1]/40 text-center border-t border-[#5B4039]/10 bg-[#131313]/50">{alt}</div>}
                                                                    </div>
                                                                )
                                                            }}
                                                        >
                                                            {m.content}
                                                        </ReactMarkdown>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex gap-6 animate-in fade-in duration-700">
                                        <div className="h-8 w-8 rounded-lg ember-gradient flex items-center justify-center text-[#3b0900] shadow-[0_0_15px_rgba(255,87,34,0.3)]">
                                            <span className="material-symbols-outlined text-[18px] font-bold animate-pulse">bolt</span>
                                        </div>
                                        <div className="flex-1 space-y-4 pt-1">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-24 bg-[#FFB5A0]/10 rounded-full skeleton-shimmer"></div>
                                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFB5A0] animate-pulse">Thinking...</span>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="h-3 w-[90%] bg-[#2A2A2A] rounded-md skeleton-shimmer"></div>
                                                <div className="h-3 w-[75%] bg-[#2A2A2A] rounded-md skeleton-shimmer"></div>
                                                <div className="h-3 w-[85%] bg-[#2A2A2A] rounded-md skeleton-shimmer"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={bottom} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom-Docked Command Bar */}
                <footer className="w-full pb-4 px-8 flex justify-center sticky bottom-0 z-40">
                    <div className="w-full max-w-3xl">
                        <form className="glass-card rounded-2xl p-2.5 flex items-center gap-2 shadow-2xl border border-[#5B4039]/30 focus-within:border-[#FFB5A0]/40 transition-all" onSubmit={handleSubmit}>
                            <button type="button" className="p-2.5 hover:bg-[#2A2A2A] rounded-xl text-[#e5e2e1]/40 hover:text-[#FFB5A0] transition-all">
                                <span className="material-symbols-outlined">attach_file</span>
                            </button>
                            <textarea
                                rows={1}
                                className="flex-1 bg-transparent border-none focus:ring-0 text-[#e5e2e1] placeholder-[#e5e2e1]/30 font-medium text-lg min-h-[48px] py-3 no-scrollbar resize-none"
                                placeholder="Command Ember AI..."
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(e); } }}
                            />
                            <div className="flex items-center gap-2 ml-2">
                                <button type="button" className="p-2.5 hover:bg-[#2A2A2A] rounded-xl text-[#e5e2e1]/40 hover:text-[#FFB5A0] transition-all">
                                    <span className="material-symbols-outlined">mic</span>
                                </button>
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="ember-gradient ember-glow h-12 w-12 flex items-center justify-center rounded-xl text-[#3b0900] disabled:opacity-30 disabled:grayscale hover:scale-105 active:scale-95 transition-all duration-200"
                                >
                                    <span className="material-symbols-outlined font-bold">arrow_upward</span>
                                </button>
                            </div>
                        </form>

                        {messages.length === 0 && (
                            <div className="flex justify-center gap-3 mt-4 animate-in slide-in-from-bottom-2 duration-700 delay-300">
                                {["Synthesize Trends", "Ember Report", "Market Analysis"].map(chip => (
                                    <button
                                        key={chip}
                                        onClick={() => setInput(chip)}
                                        className="px-4 py-1.5 rounded-full border border-[#5B4039]/20 bg-[#131313]/60 text-[10px] uppercase tracking-widest font-bold text-[#e5e2e1]/40 hover:border-[#FFB5A0]/50 hover:text-[#FFB5A0] transition-all"
                                    >
                                        {chip}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </footer>

                {/* Decorative Elements */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FFB5A0]/5 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#FF5722]/5 blur-[120px] rounded-full pointer-events-none"></div>
            </main>
        </div>
    );
}