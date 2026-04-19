import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const BattleArena = () => {
  const [query, setQuery] = useState('');
  const [isFighting, setIsFighting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [battleId, setBattleId] = useState(null);
  const [error, setError] = useState(null);
  const [userSelectedWinner, setUserSelectedWinner] = useState(null);
  const [isFinalized, setIsFinalized] = useState(false);

  const handleInitiate = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsFighting(true);
    setError(null);
    setUserSelectedWinner(null);
    setIsFinalized(false);
    try {
      const response = await axios.post(`${API_BASE_URL}/use-graph`, { query }, {
        withCredentials: true
      });
      setResults(response.data);
      setBattleId(response.data.battleId);
      setShowResults(true);
    } catch (err) {
      console.error(err);
      setError('System failure during fusion. Please recalibrate.');
    } finally {
      setIsFighting(false);
    }
  };

  const models = results ? [
    {
      id: 'A',
      name: 'MISTRAL EMBEDDING',
      content: results.solution_1,
      score: results.judge?.solution_1_score,
      reasoning: results.judge?.solution_1_reasoning,
      metrics: results.solution_1_metrics
    },
    {
      id: 'B',
      name: 'GEMINI VISION',
      content: results.solution_2,
      score: results.judge?.solution_2_score,
      reasoning: results.judge?.solution_2_reasoning,
      metrics: results.solution_2_metrics
    }
  ] : [];

  const handleFinalize = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/battles/finalize`, {
        battleId,
        userWinner: userSelectedWinner
      }, { withCredentials: true });
      setIsFinalized(true);
    } catch (err) {
      console.error(err);
      setError('Failed to record the verdict in the high-frequency logs.');
    }
  };

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-8 pt-40 pb-32">

      {/* 1. Header Observer Section */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center relative z-10 flex flex-col items-center pt-10"
      >
        {/* The Gauntlet Neural Orb */}
        <div 
          className="w-24 h-24 rounded-full mb-8 relative shadow-[0_0_80px_-10px_rgba(245,158,11,0.5)] bg-black overflow-hidden ring-1 ring-white/10"
        >
           {/* Core Gradient - Gauntlet Amber Theme */}
           <div className="absolute inset-0" style={{
              background: 'radial-gradient(circle at 35% 35%, #fff 0%, #fef3c7 10%, #f59e0b 40%, #7c2d12 85%, #000 100%)'
           }}></div>
           
           {/* Pulsing Core Overlay */}
           <motion.div 
             animate={isFighting ? { 
               opacity: [0.4, 0.8, 0.4], 
               scale: [1, 1.2, 1],
               rotate: [0, 360] 
             } : { 
               opacity: [0.3, 0.6, 0.3], 
               scale: [1, 1.1, 1] 
             }}
             transition={{ 
               repeat: Infinity, 
               duration: isFighting ? 2 : 4, 
               ease: "easeInOut" 
             }}
             className="absolute inset-0 rounded-full bg-primary/20 blur-xl mix-blend-overlay flex items-center justify-center"
           >
              {isFighting && (
                <span className="material-symbols-outlined text-white/40 text-4xl animate-spin">radar</span>
              )}
           </motion.div>
           
           {/* Subtle Scanline on Orb */}
           <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.5)_2px,rgba(0,0,0,0.5)_4px)]"></div>
        </div>

        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter text-white mb-3">
          Good Evening, <span className="text-primary italic">Researcher.</span>
        </h1>
        <p className="text-zinc-500 text-xl font-light tracking-wide max-w-xl mx-auto">
          Synchronize with the Gauntlet high-court. Your neural collision query is ready for execution.
        </p>
      </motion.header>

      {/* 2. Floating Command Box */}
      <section className="mb-24 relative z-20 flex justify-center px-4">
        <form onSubmit={handleInitiate} className="w-full max-w-3xl relative group">
          
          {/* Volumetric Box Glow on Focus */}
          <div className="absolute inset-0 bg-primary/5 blur-[40px] rounded-[30px] opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

          <div className="relative bg-[#0c0d10]/90 backdrop-blur-3xl border border-white/[0.05] rounded-3xl p-5 shadow-[0_30px_70px_-20px_rgba(0,0,0,1)] group-focus-within:border-primary/30 transition-all duration-500 overflow-hidden">
            
            {/* Corner Tech Brackets */}
            <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-primary/20 group-focus-within:border-primary/50 transition-colors"></div>
            <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-primary/20 group-focus-within:border-primary/50 transition-colors"></div>
            
            <textarea
              className="w-full bg-transparent border-0 outline-none focus:ring-0 px-3 py-2 text-white font-light text-xl resize-none min-h-[100px] placeholder:text-zinc-600 leading-relaxed"
              placeholder="Provide query to Gauntlet..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                 if (e.key === 'Enter' && !e.shiftKey) {
                     e.preventDefault();
                     handleInitiate(e);
                 }
              }}
            />

            {/* Bottom Toolbar */}
            <div className="flex items-center justify-between mt-4 px-1 relative z-10">
               <div className="flex items-center gap-3">
                  <button type="button" className="p-2 transition-colors text-zinc-600 hover:text-primary hover:bg-primary/5 rounded-full">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" /></svg>
                  </button>
                  <div className="flex gap-2">
                    <button type="button" className="flex items-center gap-2 px-4 py-2 bg-white/[0.02] hover:bg-primary/10 border border-white/[0.05] group-focus-within:border-primary/20 rounded-2xl text-[10px] font-mono font-bold text-zinc-500 hover:text-primary transition-all tracking-[0.2em] uppercase">
                       <span className="material-symbols-outlined text-[16px]">psychology</span>
                       DEEP_CONTEXT
                    </button>
                    <button type="button" className="flex items-center gap-2 px-4 py-2 bg-white/[0.02] hover:bg-primary/10 border border-white/[0.05] group-focus-within:border-primary/20 rounded-2xl text-[10px] font-mono font-bold text-zinc-500 hover:text-primary transition-all tracking-[0.2em] uppercase">
                       <span className="material-symbols-outlined text-[16px]">travel_explore</span>
                       WEB_SEARCH
                    </button>
                  </div>
               </div>
               
               <div className="flex items-center gap-2">
                  <button type="button" className="p-2 transition-colors text-zinc-600 hover:text-primary hover:bg-primary/5 rounded-full mr-1">
                     <span className="material-symbols-outlined text-[20px]">mic</span>
                  </button>
                  <button 
                    type="submit"
                    disabled={isFighting || !query.trim()}
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 ${query.trim() && !isFighting ? 'bg-primary text-black hover:scale-105 active:scale-95 shadow-lg shadow-primary/30 border-t border-white/20' : 'bg-white/[0.03] text-zinc-800 border border-white/[0.03] cursor-not-allowed'}`}
                  >
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                       <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
                     </svg>
                  </button>
               </div>
            </div>

            {/* Scanline Texture Layer */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(245,158,11,0.5)_2px,rgba(245,158,11,0.5)_4px)]"></div>
          </div>

          {/* Micro HUD Metadata */}
          <div className="absolute -bottom-8 left-6 flex gap-6 opacity-30 group-focus-within:opacity-60 transition-opacity">
             <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-primary">AI Engine Online</span>
             <span className={`font-mono text-[8px] uppercase tracking-[0.3em] ${isFighting ? 'text-primary animate-pulse' : ''}`}>
               {isFighting ? 'Generating Side-by-Side Analysis...' : 'Ready for Input'}
             </span>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-14 left-0 w-full text-red-400 text-[12px] font-medium tracking-wide text-center uppercase font-mono"
            >
              [ ALERT // {error} ]
            </motion.div>
          )}
        </form>
      </section>

      {/* 3. Skeleton Loading Grid (Shown during fusion) */}
      <AnimatePresence>
        {isFighting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-[#0a0a0a]/40 backdrop-blur-xl p-10 flex flex-col relative overflow-hidden min-h-[500px] rounded-lg border border-white/5"
              >
                {/* Header Skeleton */}
                <div className="flex justify-between items-start mb-12">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-zinc-800 animate-pulse"></div>
                      <div className="w-24 h-3 bg-zinc-800 rounded animate-pulse"></div>
                    </div>
                    <div className="w-40 h-2 bg-zinc-900 rounded animate-pulse ml-6"></div>
                  </div>
                  <div className="flex gap-4">
                     <div className="w-12 h-8 bg-zinc-900 rounded animate-pulse"></div>
                     <div className="w-12 h-8 bg-zinc-900 rounded animate-pulse"></div>
                  </div>
                </div>

                {/* Content Skeleton Lines */}
                <div className="flex-1 space-y-4">
                  <div className="w-full h-4 bg-zinc-900/50 rounded animate-pulse"></div>
                  <div className="w-[90%] h-4 bg-zinc-900/50 rounded animate-pulse"></div>
                  <div className="w-[95%] h-4 bg-zinc-900/50 rounded animate-pulse"></div>
                  <div className="w-[70%] h-4 bg-zinc-900/50 rounded animate-pulse"></div>
                  <div className="pt-4 w-[40%] h-4 bg-zinc-900/50 rounded animate-pulse"></div>
                  <div className="w-full h-4 bg-zinc-900/50 rounded animate-pulse"></div>
                  <div className="w-[85%] h-4 bg-zinc-900/50 rounded animate-pulse"></div>
                </div>

                {/* Bottom Bar Skeleton */}
                <div className="mt-12 h-14 w-full bg-zinc-900/30 rounded-lg animate-pulse"></div>
                
                {/* Shimmer Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Result Matrix (Battle Output Cards) */}
      <AnimatePresence>
        {showResults && results && !isFighting && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            {models.map((model, idx) => {
              const cardWinner = results.judge?.winner === (model.id === 'A' ? 'solution_1' : 'solution_2');
              const isUserChoice = userSelectedWinner === (model.id === 'A' ? 'solution_1' : 'solution_2');
              const isDimmed = userSelectedWinner && !isUserChoice;

              return (
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, scale: 0.98, x: idx === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: idx * 0.2, duration: 1 }}
                  className={`group/card bg-[#0a0a0a]/40 backdrop-blur-xl p-10 flex flex-col relative overflow-hidden min-h-[500px] transition-all duration-700 rounded-lg border border-white/[0.05] ${cardWinner ? 'border-primary/30 shadow-[0_0_100px_-20px_rgba(245,158,11,0.15)] ring-1 ring-primary/20' : ''
                    } ${isDimmed ? 'opacity-30 grayscale-[0.8]' : 'opacity-100'} ${isUserChoice ? 'ring-2 ring-blue-500/50' : ''}`}
                >

                  {/* Victory Halo Background Element */}
                  {cardWinner && (
                    <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-primary/10 blur-[100px] rounded-full pointer-events-none group-hover/card:bg-primary/20 transition-all duration-1000"></div>
                  )}

                  {/* Victory HUD Badge */}
                  {cardWinner && (
                    <motion.div
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="absolute top-0 right-0 z-20"
                    >
                      <div className="bg-primary text-black px-6 py-2.5 font-mono text-[11px] font-black uppercase tracking-[0.4em] flex items-center gap-2 shadow-2xl skew-x-[-12deg] mr-[-6px]">
                        JUDGE VICTOR
                      </div>
                    </motion.div>
                  )}

                  {/* Card Metadata HUD */}
                  <div className="flex justify-between items-start mb-12 relative z-10">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`w-3 h-3 rounded-full ${cardWinner ? 'bg-primary shadow-[0_0_15px_rgba(245,158,11,1)]' : 'bg-zinc-800'}`}></span>
                        <span className={`font-mono text-[11px] tracking-[0.4em] font-black uppercase ${cardWinner ? 'text-primary' : 'text-zinc-600'}`}>
                          ENTITY_{model.id}
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest pl-6">{model.name}</span>
                    </div>

                    {/* Micro-Metrics Grid */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 pt-1 border-r border-white/5 pr-6">
                      <div className="text-right">
                        <div className="text-[9px] text-zinc-600 font-mono uppercase tracking-widest mb-1">LATENCY</div>
                        <div className={`text-xs font-mono font-bold ${cardWinner ? 'text-primary' : 'text-zinc-400'}`}>{model.metrics?.latency_ms}ms</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[9px] text-zinc-600 font-mono uppercase tracking-widest mb-1">TOKENS</div>
                        <div className={`text-xs font-mono font-bold ${cardWinner ? 'text-primary' : 'text-zinc-400'}`}>{model.metrics?.total_tokens}</div>
                      </div>
                    </div>

                    <div className="pl-6 text-center">
                      <div className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest mb-1">SCORE</div>
                      <div className={`text-3xl font-bold tracking-tighter ${cardWinner ? 'text-primary' : 'text-zinc-400'}`}>{model.score}/10</div>
                    </div>
                  </div>

                  {/* Response Content with code-like borders */}
                  <div className={`flex-1 font-body text-lg leading-relaxed ${cardWinner ? 'text-white' : 'text-zinc-500'} prose prose-invert max-w-none relative z-10`}>
                    <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                      {model.content}
                    </ReactMarkdown>
                  </div>

                  {/* Verdict Controls */}
                  <div className="mt-12 flex gap-4 relative z-10">
                    <button
                      onClick={() => !isFinalized && setUserSelectedWinner(model.id === 'A' ? 'solution_1' : 'solution_2')}
                      disabled={isFinalized}
                      className={`group/btn flex-1 py-5 border rounded-lg transition-all text-[11px] font-black uppercase tracking-[0.3em] relative overflow-hidden ${isUserChoice
                        ? 'bg-blue-600 text-white border-blue-500 shadow-[0_15px_30px_rgba(37,99,235,0.3)]'
                        : isDimmed
                          ? 'border-white/5 text-zinc-800 pointer-events-none'
                          : cardWinner
                            ? 'bg-primary/5 border-primary/20 text-primary hover:bg-primary hover:text-black'
                            : 'border-white/10 text-zinc-500 hover:text-white hover:border-white/30 hover:bg-white/[0.02]'
                        }`}>
                      <span className="relative z-10">{isUserChoice ? 'Selected as Victor' : cardWinner ? 'Validate Judge' : 'Overrule Judge'}</span>
                      <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-10 transition-opacity"></div>
                    </button>
                  </div>
                </motion.div>
              );
            })}

            {/* Sub-Matrix: Final Judge Verdict Section */}
            <div className="col-span-1 md:col-span-2 mt-20 relative px-4">

              {/* Centered Floating Affirmation Badge */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                <div className="bg-[#0f0f0f] border border-white/10 px-10 py-5 rounded-lg shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col items-center min-w-[340px] relative overflow-hidden">
                  {/* Animated side highlight lines */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-3/4 bg-primary rounded-full blur-[2px]"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-3/4 bg-primary rounded-full blur-[2px]"></div>

                  <span className="font-mono text-[9px] uppercase tracking-[0.6em] text-zinc-600 mb-3">Neural_Verdict_Finalized</span>
                  <h3 className="font-headline text-3xl font-black tracking-widest text-primary uppercase italic text-glow">
                    {results.judge?.winner === 'solution_1' ? 'ENTITY A' : 'ENTITY B'} WINS
                  </h3>
                </div>
              </div>

              <div className="bg-[#0a0a0a]/40 backdrop-blur-md pt-20 pb-16 px-12 rounded-2xl border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono text-primary/40">ANALYTICS//01</span>
                    <h4 className="font-mono text-[11px] uppercase tracking-[0.4em] font-black text-primary/80">Critique: Model A</h4>
                  </div>
                  <div className="text-base text-zinc-400 leading-relaxed font-light prose prose-invert prose-sm max-w-none prose-p:mb-4">
                    <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                      {results.judge?.solution_1_reasoning}
                    </ReactMarkdown>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono text-blue-500/40">ANALYTICS//02</span>
                    <h4 className="font-mono text-[11px] uppercase tracking-[0.4em] font-black text-blue-500/80">Critique: Model B</h4>
                  </div>
                  <div className="text-base text-zinc-400 leading-relaxed font-light prose prose-invert prose-sm max-w-none prose-p:mb-4">
                    <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                      {results.judge?.solution_2_reasoning}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to action for finalization */}
            {userSelectedWinner && !isFinalized && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="col-span-1 md:col-span-2 flex flex-col items-center gap-8 pt-16"
              >
                <div className="flex flex-col items-center text-center max-w-xl">
                  <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-primary mb-6"></div>
                  <p className="font-mono text-[10px] tracking-[0.4em] text-zinc-500 uppercase mb-4">Manual_Overwrite_Buffer</p>
                  <h4 className="text-2xl font-headline font-bold text-white tracking-tight">
                    {userSelectedWinner === results.judge?.winner
                      ? 'System verdict has been validated by senior researcher.'
                      : 'Neural override detected. Subverting system verdict.'}
                  </h4>
                </div>
                <button
                  onClick={handleFinalize}
                  className="bg-white text-black px-16 py-6 font-black uppercase tracking-[0.5em] text-[12px] hover:bg-primary transition-all shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] rounded-[4px] active:scale-95"
                >
                  Finalize Verdict
                </button>
              </motion.div>
            )}

            {isFinalized && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-1 md:col-span-2 flex flex-col items-center gap-6 pt-20 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 border border-primary/40 relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping"></div>
                  <span className="material-symbols-outlined text-primary text-4xl relative z-10">verified</span>
                </div>
                <h3 className="text-3xl font-headline font-black text-white uppercase tracking-[0.3em]">Evaluation Absolute</h3>
                <p className="text-zinc-500 font-light max-w-md text-lg leading-relaxed">The outcome has been localized in the high-frequency evaluation logs. The neural override data is now part of the master dataset.</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
};

export default BattleArena;
