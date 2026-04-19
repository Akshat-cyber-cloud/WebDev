import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import ArenaNavbar from '../components/common/ArenaNavbar';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const LeaderboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/battles/leaderboard`);
        setStats(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to synchronize global victory data.');
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const getRankData = () => {
    if (!stats) return [];
    
    return [
      {
        name: 'GEMINI VISION',
        provider: 'Google',
        wins: stats.gemini.wins,
        userWins: stats.gemini.userWins,
        avgScore: stats.gemini.avgScore.toFixed(1),
        avgLatency: Math.round(stats.gemini.avgLatency),
        winRate: stats.totalBattles > 0 ? ((stats.gemini.wins / stats.totalBattles) * 100).toFixed(1) : 0,
        color: 'text-secondary',
        bg: 'bg-secondary/10',
        border: 'border-secondary/20'
      },
      {
        name: 'MISTRAL EMBEDDING',
        provider: 'MistralAI',
        wins: stats.mistral.wins,
        userWins: stats.mistral.userWins,
        avgScore: stats.mistral.avgScore.toFixed(1),
        avgLatency: Math.round(stats.mistral.avgLatency),
        winRate: stats.totalBattles > 0 ? ((stats.mistral.wins / stats.totalBattles) * 100).toFixed(1) : 0,
        color: 'text-primary',
        bg: 'bg-primary/10',
        border: 'border-primary/20'
      }
    ].sort((a, b) => b.wins - a.wins);
  };

  const ranks = getRankData();

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <ArenaNavbar />

      <main className="max-w-7xl mx-auto px-8 py-32">
        <header className="mb-20 text-center md:text-left">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.5em] mb-4">High_Frequency_Analytics_v1.0</div>
          <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter text-on-surface mb-6">
            Elite <span className="text-primary italic">Standings.</span>
          </h1>
          <p className="text-on-surface-variant max-w-2xl font-light text-xl">
             Live win-rates and performance metrics across {stats?.totalBattles || 0} recorded collisions.
          </p>
        </header>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="font-mono text-primary animate-pulse uppercase tracking-[0.4em] text-xs">Calibrating Ranks...</div>
          </div>
        ) : error ? (
          <div className="bg-error/10 border border-error/20 p-8 text-error font-mono text-sm uppercase tracking-widest text-center">
            {error}
          </div>
        ) : (
          <div className="space-y-12">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-surface-container-low border border-outline-variant/10 p-8 text-center md:text-left shadow-2xl">
                  <p className="font-mono text-[10px] text-on-surface/30 uppercase tracking-widest mb-4">Total Collisions</p>
                  <h2 className="text-5xl font-bold text-on-surface font-headline">{stats.totalBattles}</h2>
               </div>
               {ranks.map((rank, i) => (
                 <div key={i} className={`bg-surface-container-low border ${rank.border} p-8 relative overflow-hidden group`}>
                    <div className={`absolute top-0 right-0 p-4 font-mono text-sm font-bold opacity-10 group-hover:opacity-100 transition-opacity ${rank.color}`}>
                       #{i + 1}
                    </div>
                    <p className="font-mono text-[10px] text-on-surface/30 uppercase tracking-widest mb-4">{rank.name} WIN RATE</p>
                    <div className="flex items-baseline gap-2">
                       <h2 className={`text-5xl font-bold font-headline ${rank.color}`}>{rank.winRate}%</h2>
                       <span className="text-on-surface/20 text-sm">{rank.wins} wins</span>
                    </div>
                 </div>
               ))}
            </div>

            {/* Detailed Table */}
            <div className="bg-surface-container-low border border-outline-variant/10 overflow-hidden shadow-2xl">
               <div className="bg-surface-container px-8 py-4 border-b border-outline-variant/10 flex justify-between items-center">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-on-surface/40">Observatory_Telemetry</span>
                  <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary/40"></div>
                      <div className="w-2 h-2 rounded-full bg-secondary/40"></div>
                  </div>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                     <thead>
                        <tr className="border-b border-outline-variant/10 font-mono text-[10px] text-on-surface/30 uppercase tracking-widest">
                           <th className="px-8 py-6">Tier_Rank</th>
                           <th className="px-8 py-6">Entity_ID</th>
                           <th className="px-8 py-6">Judge_Score_Avg</th>
                           <th className="px-8 py-6">Latency_Avg</th>
                           <th className="px-8 py-6">User_Preference</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-outline-variant/5">
                        {ranks.map((rank, i) => (
                           <tr key={i} className="group hover:bg-on-surface/[0.02] transition-colors">
                              <td className="px-8 py-8">
                                 <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold ${rank.bg} ${rank.color} border ${rank.border}`}>
                                    {i + 1}
                                 </div>
                              </td>
                              <td className="px-8 py-8">
                                 <div>
                                    <div className="font-bold text-on-surface tracking-tight">{rank.name}</div>
                                    <div className="text-[10px] text-on-surface/30 font-mono uppercase tracking-widest mt-1">{rank.provider}</div>
                                 </div>
                              </td>
                              <td className="px-8 py-8">
                                 <div className="flex items-center gap-3">
                                    <div className="text-xl font-bold font-mono">{rank.avgScore}</div>
                                    <div className="w-20 h-1 bg-surface-container-lowest rounded-full overflow-hidden">
                                       <div className={`h-full ${rank.color === 'text-primary' ? 'bg-primary' : 'bg-secondary'}`} style={{ width: `${(Number(rank.avgScore) / 10) * 100}%` }}></div>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-8 py-8 font-mono text-sm text-on-surface/60">
                                 {rank.avgLatency}ms
                              </td>
                              <td className="px-8 py-8">
                                 <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm opacity-30">person</span>
                                    <span className="text-sm font-bold text-on-surface">{rank.userWins}</span>
                                    <span className="text-[10px] text-on-surface/20 uppercase font-mono italic ml-2">Final_Verdicts</span>
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
          </div>
        )}
      </main>

      {/* Background Decorative Element */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[160px] rounded-full -mr-32 -mt-32 pointer-events-none z-0"></div>
    </div>
  );
};

export default LeaderboardPage;
