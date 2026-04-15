import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

const API_BASE_URL = 'http://localhost:3000';

const BattleArena = () => {
  const [query, setQuery] = useState('');
  const [isFighting, setIsFighting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
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
      reasoning: results.judge?.solution_1_reasoning
    },
    {
      id: 'B',
      name: 'GEMINI VISION',
      content: results.solution_2,
      score: results.judge?.solution_2_score,
      reasoning: results.judge?.solution_2_reasoning
    }
  ] : [];

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-8 pt-32 pb-20">
      {/* Header Section */}
      <header className="mb-16">
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-on-surface mb-4">
          Initiate <span className="text-primary italic">Collision.</span>
        </h1>
        <p className="text-on-surface-variant max-w-2xl font-light text-lg">
          Submit your query to the observatory. Two anonymous entities will compete to resolve your inquiry under high-frequency evaluation.
        </p>
      </header>

      {/* Input / Submit Section */}
      <section className="mb-12">
        <form onSubmit={handleInitiate} className="relative group mx-auto max-w-5xl">
          <div className="bg-surface-container-lowest border border-outline-variant p-1.5 flex flex-col md:flex-row gap-3 focus-within:border-primary/40 transition-all duration-500 shadow-2xl">
            <div className="flex-1 flex flex-col">
              <div className="px-4 pt-2 flex justify-between items-center opacity-30 select-none">
                <span className="font-mono text-[8px] uppercase tracking-widest">Input_Buffer_v0.1</span>
                <span className="font-mono text-[8px] uppercase tracking-widest">{query ? `Chars: ${query.length}` : 'Waiting...'}</span>
              </div>
              <textarea
                className="flex-1 bg-transparent border-0 outline-none focus:ring-0 px-4 py-2 text-on-surface font-light text-lg resize-none min-h-[70px] placeholder:text-on-surface/10"
                placeholder="Submit your query to the high-court..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button 
              type="submit"
              disabled={isFighting || !query.trim()}
              className="bg-primary text-on-primary px-8 py-4 font-bold uppercase tracking-widest text-[10px] hover:brightness-110 active:scale-95 transition-all disabled:opacity-30 disabled:grayscale pointer-events-auto h-full self-center md:self-stretch min-w-[160px]"
            >
              {isFighting ? 'Analyzing...' : 'Start Fusion'}
            </button>
          </div>
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-700"></div>
        </form>
        {error && <p className="text-error text-[10px] font-mono mt-4 text-center uppercase tracking-widest">{error}</p>}
      </section>

      {/* Battle Grid */}
      <AnimatePresence>
        {showResults && results && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {models.map((model) => {
                const cardWinner = results.judge?.winner === (model.id === 'A' ? 'solution_1' : 'solution_2');
                const isUserChoice = userSelectedWinner === (model.id === 'A' ? 'solution_1' : 'solution_2');
                const isDimmed = userSelectedWinner && !isUserChoice;

                return (
                  <div 
                    key={model.id}
                    className={`bg-surface-container-high p-8 flex flex-col relative overflow-hidden min-h-[400px] transition-all duration-700 ${
                      cardWinner ? 'border border-primary/40 ring-1 ring-primary/20 shadow-[0_0_80px_-20px_rgba(245,158,11,0.2)]' : 'border border-transparent'
                    } ${isDimmed ? 'opacity-40 grayscale-[0.5]' : 'opacity-100'} ${isUserChoice ? 'ring-2 ring-secondary/50' : ''}`}
                    style={{ 
                      boxShadow: !cardWinner ? (model.id === 'A' 
                        ? 'inset 4px 0 0 0 rgba(173, 198, 255, 0.2)' 
                        : 'inset -4px 0 0 0 rgba(213, 195, 255, 0.2)') : undefined
                    }}
                  >
                    {cardWinner && (
                      <motion.div 
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="absolute top-4 right-4 z-20"
                      >
                        <div className="bg-primary text-on-primary px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2 shadow-xl">
                          <span className="material-symbols-outlined text-sm animate-pulse">new_releases</span>
                          JUDGE VICTOR
                        </div>
                      </motion.div>
                    )}

                    {isUserChoice && (
                      <motion.div 
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="absolute top-4 left-4 z-20"
                      >
                        <div className="bg-secondary text-on-secondary px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2 shadow-xl border border-secondary/50">
                          <span className="material-symbols-outlined text-sm">person</span>
                          USER CHOICE
                        </div>
                      </motion.div>
                    )}

                    <div className="flex justify-between items-center mb-8">
                      <div className="flex flex-col">
                        <span className={`font-mono text-[10px] tracking-[0.3em] font-bold uppercase ${cardWinner ? 'text-primary' : 'text-on-surface/40'}`}>
                          Entity_{model.id}
                        </span>
                        <span className="text-[10px] text-on-surface/30 font-bold mt-1 uppercase tracking-widest">{model.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right mr-4">
                          <div className="text-[10px] text-white/20 font-mono">Score</div>
                          <div className={`text-xl font-bold ${cardWinner ? 'text-primary' : 'text-on-surface/40'}`}>{model.score}/10</div>
                        </div>
                        <span className={`w-1.5 h-1.5 rounded-full ${cardWinner ? 'bg-primary shadow-[0_0_10px_rgba(255,193,116,1)]' : 'bg-on-surface/10'}`}></span>
                      </div>
                    </div>

                    <div className={`flex-1 font-body text-lg leading-relaxed ${cardWinner ? 'text-on-surface' : 'text-on-surface/40'} prose prose-invert max-w-none`}>
                      <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                        {model.content}
                      </ReactMarkdown>
                    </div>

                    <div className="mt-8 flex gap-4">
                      <button 
                        onClick={() => !isFinalized && setUserSelectedWinner(model.id === 'A' ? 'solution_1' : 'solution_2')}
                        disabled={isFinalized}
                        className={`flex-1 py-4 border transition-all text-[10px] font-bold uppercase tracking-widest ${
                        isUserChoice 
                          ? 'bg-secondary text-on-secondary border-secondary shadow-[0_0_20px_rgba(173,198,255,0.3)]' 
                          : isDimmed
                          ? 'border-outline-variant text-on-surface/10 grayscale'
                          : cardWinner
                          ? 'bg-primary/10 border-primary/40 text-primary hover:bg-primary/20' 
                          : 'border-outline-variant text-on-surface/40 hover:text-on-surface hover:border-on-surface'
                      }`}>
                        {isUserChoice ? 'Selected as Victor' : cardWinner ? 'Validate Judge' : 'Overrule Judge'}
                      </button>
                    </div>
                  </div>
                );
            })}

            {/* Reasoning / Judge Section - Full Width */}
            <div className="col-span-1 md:col-span-2 mt-12 bg-surface-container-low p-12 relative border border-outline-variant/5 shadow-inner">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="bg-surface-container-low px-8 py-4 border border-outline-variant shadow-2xl flex flex-col items-center min-w-[300px]">
                    <span className="font-mono text-[8px] uppercase tracking-[0.6em] text-on-surface/30 mb-2">Final_Affirmation</span>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-[1px] bg-primary/30"></div>
                      <h3 className="font-headline text-2xl font-bold tracking-widest text-primary uppercase italic">
                        {results.judge?.winner === 'solution_1' ? 'ENTITY A' : 'ENTITY B'} WINS
                      </h3>
                      <div className="w-8 h-[1px] bg-primary/30"></div>
                    </div>
                  </div>
               </div>
               
               <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4 border-l border-primary/20 pl-6">
                    <h4 className="font-mono text-[10px] uppercase tracking-widest text-primary/60">Critique: Model A</h4>
                    <div className="text-sm text-on-surface/60 leading-relaxed font-light prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                        {results.judge?.solution_1_reasoning}
                      </ReactMarkdown>
                    </div>
                  </div>
                  <div className="space-y-4 border-l border-secondary/20 pl-6">
                    <h4 className="font-mono text-[10px] uppercase tracking-widest text-secondary/60">Critique: Model B</h4>
                    <div className="text-sm text-on-surface/60 leading-relaxed font-light prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                        {results.judge?.solution_2_reasoning}
                      </ReactMarkdown>
                    </div>
                  </div>
               </div>
            </div>

            {/* Manual Verdict Submission */}
            {userSelectedWinner && !isFinalized && (
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="col-span-1 md:col-span-2 flex flex-col items-center gap-6 pt-12"
               >
                 <div className="flex flex-col items-center text-center max-w-md">
                    <p className="font-mono text-[10px] tracking-[0.3em] text-on-surface/40 uppercase mb-4">Manual_Override_Detected</p>
                    <h4 className="text-xl font-headline font-bold text-on-surface">
                      {userSelectedWinner === results.judge?.winner 
                        ? 'You have validated the system verdict.' 
                        : 'You are contradicting the system judge.'}
                    </h4>
                 </div>
                 <button 
                   onClick={() => setIsFinalized(true)}
                   className="bg-on-surface text-surface px-12 py-5 font-bold uppercase tracking-[0.4em] text-[12px] hover:bg-primary hover:text-on-primary transition-all shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                 >
                   Finalize Verdict
                 </button>
               </motion.div>
             )}

             {isFinalized && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="col-span-1 md:col-span-2 flex flex-col items-center gap-4 pt-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
                     <span className="material-symbols-outlined text-primary text-3xl">verified</span>
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-primary uppercase tracking-widest">Case Closed</h3>
                  <p className="text-on-surface/60 font-light max-w-xs">The outcome has been recorded in the high-frequency logs. The manual selection is now part of the dataset.</p>
                </motion.div>
             )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State Overlay */}
      <AnimatePresence>
        {isFighting && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="relative w-40 h-40 mb-12">
               <div className="absolute inset-0 border border-primary/20 animate-[spin_10s_linear_infinite]"></div>
               <div className="absolute inset-4 border border-secondary/20 animate-[spin_7s_linear_infinite_reverse]"></div>
               <div className="absolute inset-8 border border-tertiary/20 animate-[spin_5s_linear_infinite]"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-4xl animate-pulse">hub</span>
               </div>
            </div>
            <div className="font-mono text-[10px] tracking-[0.5em] text-primary uppercase font-bold text-glow">
              Processing_Fusion_Sequence...
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BattleArena;
