import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import ArenaNavbar from '../components/common/ArenaNavbar';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const HistoryPage = () => {
  const [battles, setBattles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/battles/history`, {
          withCredentials: true
        });
        setBattles(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to retrieve neural logs.');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <ArenaNavbar />
      
      <main className="max-w-7xl mx-auto px-8 py-32">
        <header className="mb-16">
          <h1 className="font-headline text-5xl font-bold tracking-tighter text-on-surface mb-4">
            Neural <span className="text-primary italic">Archive.</span>
          </h1>
          <p className="text-on-surface-variant max-w-2xl font-light">
            Review past collisions and historical verdicts retrieved from the high-frequency observatory.
          </p>
        </header>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="font-mono text-primary animate-pulse uppercase tracking-[0.4em] text-xs">Accessing Data Bank...</div>
          </div>
        ) : error ? (
          <div className="bg-error/10 border border-error/20 p-8 text-error font-mono text-sm uppercase tracking-widest text-center">
            {error}
          </div>
        ) : battles.length === 0 ? (
          <div className="text-center py-20 border border-outline-variant/10 bg-surface-container-low">
             <p className="text-on-surface-variant font-mono text-sm uppercase tracking-widest leading-loose">
               No records found.<br/>
               The observatory is currently empty.
             </p>
          </div>
        ) : (
          <div className="grid gap-6">
            <AnimatePresence>
              {battles.map((battle, index) => (
                <motion.div
                  key={battle._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-surface-container-low border border-outline-variant/10 p-6 hover:border-primary/30 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-[2px] h-full bg-primary/20 group-hover:bg-primary transition-colors"></div>
                  
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="font-mono text-[9px] text-on-surface/30 uppercase tracking-[0.3em]">
                          {new Date(battle.createdAt).toLocaleString()}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-on-surface/20"></span>
                        <span className="font-mono text-[9px] text-primary uppercase tracking-[0.3em]">
                          Battle_Record_{battle._id.slice(-6).toUpperCase()}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-on-surface mb-4 line-clamp-1">{battle.query}</h3>
                      
                      <div className="flex gap-8">
                        <div>
                          <p className="text-[10px] text-on-surface/30 uppercase font-mono tracking-widest mb-1">Judge Victor</p>
                          <p className={`text-xs font-bold uppercase tracking-widest ${battle.judgeWinner === 'solution_1' ? 'text-primary' : 'text-secondary'}`}>
                            {battle.judgeWinner === 'solution_1' ? 'Mistral' : 'Gemini'}
                          </p>
                        </div>
                        {battle.userWinner && (
                          <div>
                            <p className="text-[10px] text-on-surface/30 uppercase font-mono tracking-widest mb-1">User Choice</p>
                            <p className={`text-xs font-bold uppercase tracking-widest ${battle.userWinner === 'solution_1' ? 'text-primary' : 'text-secondary'}`}>
                              {battle.userWinner === 'solution_1' ? 'Mistral' : 'Gemini'}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-6 border-l border-outline-variant/10 pl-6 md:min-w-[200px]">
                       <div className="text-right">
                          <p className="text-[9px] text-on-surface/30 uppercase font-mono tracking-widest">Avg Latency</p>
                          <p className="text-sm font-bold text-on-surface">
                            {Math.round((battle.solution_1.metrics.latency_ms + battle.solution_2.metrics.latency_ms) / 2)}ms
                          </p>
                       </div>
                       <div className="text-right">
                          <p className="text-[9px] text-on-surface/30 uppercase font-mono tracking-widest">Total Tokens</p>
                          <p className="text-sm font-bold text-on-surface">
                            {battle.solution_1.metrics.total_tokens + battle.solution_2.metrics.total_tokens}
                          </p>
                       </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Background Decorative Element */}
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 blur-[160px] rounded-full -ml-32 -mb-32 pointer-events-none z-0"></div>
    </div>
  );
};

export default HistoryPage;
