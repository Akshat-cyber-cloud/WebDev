import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ArenaNavbar from '../components/common/ArenaNavbar';
import BattleArena from '../components/home/BattleArena';

const BattlePage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="font-mono text-primary animate-pulse tracking-[0.4em] uppercase text-xs">
          Synchronizing Neural Link...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <ArenaNavbar />
      <main className="arena-grid min-h-screen">
        <BattleArena />
      </main>
      
      {/* Background Decorative Element */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[160px] rounded-full -mr-32 -mt-32 pointer-events-none z-0"></div>
    </div>
  );
};

export default BattlePage;
