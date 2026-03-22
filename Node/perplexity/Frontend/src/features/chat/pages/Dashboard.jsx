import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "../styles/dashboard.css";

export default function Dashboard() {
    const chat = useChat();
    const user = useSelector(s => s.auth);
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
        <div className="layout">
            <aside className="sidebar">
                <div className="sidebar-top">
                    <div className="brand">
                        <div className="brand-dot">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                        </div>
                        Perplexity
                    </div>
                    <button className="new-btn" onClick={() => chat.handleSetCurrentChatId(null)}>+ New Chat</button>
                </div>

                <div className="chat-list">
                    {Object.values(chats).map((c, i) => (
                        <div
                            key={i}
                            className={`chat-item ${c.id === currentChatId ? "active" : ""}`}
                            onClick={() => openChat(c.id)}
                        >
                            {c.title}
                        </div>
                    ))}
                </div>

                <div className="sidebar-footer">
                    <div className="avatar">{user?.name?.[0]?.toUpperCase() ?? "U"}</div>
                    {user?.name ?? "User"}
                </div>
            </aside>

            <div className="main">
                <div className="topbar">
                    <div className="user-tag">{user?.email ?? "user@example.com"}</div>
                </div>

                <div className="messages">
                    {messages.map((m, idx) => (
                        <div key={idx} className={`row ${m.role}`}>
                            <div className={`bubble ${m.role}`}>
                                {m.role === "user" ? (
                                    <p>{m.content}</p>
                                ) : (
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                            ul: ({ children }) => <ul className="mb-2 list-disc pl-5">{children}</ul>,
                                            ol: ({ children }) => <ol className="mb-2 list-decimal pl-5">{children}</ol>,
                                            code: ({ children }) => <code className="rounded bg-white/10 px-1 py-0.5">{children}</code>,
                                            pre: ({ children }) => <pre className="mb-2 overflow-x-auto rounded-xl bg-black/30 p-3">{children}</pre>,
                                        }}
                                    >
                                        {m.content}
                                    </ReactMarkdown>
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="row">
                            <div className="bubble ai"><div className="dots"><span /><span /><span /></div></div>
                        </div>
                    )}
                    <div ref={bottom} />
                </div>

                <form className="input-wrap" onSubmit={handleSubmit}>
                    <div className="input-box">
                        <textarea
                            rows={1}
                            placeholder="Ask anything…"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(e); } }}
                        />
                        <button type="submit" className="send" disabled={!input.trim() || isLoading}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                        </button>
                    </div>
                    <div className="hint">Enter to send · Shift+Enter for newline</div>
                </form>
            </div>
        </div>
    );
}