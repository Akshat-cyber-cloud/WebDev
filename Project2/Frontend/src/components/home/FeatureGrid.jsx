import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Feature Images
import blindTestingImg from '../../assets/features/blind_testing_tech.png';
import ragModeImg from '../../assets/features/rag_mode_tech.png';
import cotAnalysisImg from '../../assets/features/cot_analysis_tech.png';
import arenaScoreImg from '../../assets/features/arenascore_tech.png';
import leaderboardImg from '../../assets/features/leaderboard_tech.png';

const BentoCard = ({ feature, index }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative group overflow-hidden rounded-[24px] border border-white/10 bg-zinc-900/40 backdrop-blur-3xl transition-all duration-500 hover:border-primary/50 ${feature.spanClass} flex flex-col justify-between`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Animated Glow on Hover */}
      <div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--color-primary), 0.08), transparent 40%)`
        }}
      />
      
      {/* Optional Gradient Background for Hero cards */}
      {feature.bgGradient && (
        <div className={`absolute inset-0 z-0 opacity-20 ${feature.bgGradient}`}></div>
      )}

      {/* Grid Pattern overlay for depth */}
      <div className="absolute inset-0 z-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none mix-blend-overlay"></div>

      {/* Feature Image Asset */}
      {feature.image && (
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-20 group-hover:opacity-40 transition-all duration-700">
          <img 
            src={feature.image} 
            alt="" 
            className={`absolute ${feature.isHero ? 'right-[-10%] top-[-10%] w-[80%] h-[120%]' : 'right-[-20%] bottom-[-20%] w-[100%] h-[100%]'} object-contain object-right-bottom scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out opacity-60 group-hover:opacity-100`}
          />
          <div className={`absolute inset-0 bg-gradient-to-br from-zinc-900 via-transparent to-transparent ${feature.isHero ? 'opacity-80' : 'opacity-60'}`}></div>
        </div>
      )}

      <div className="relative z-10 p-8 h-full flex flex-col justify-between items-start gap-8">
        <div className="flex justify-between items-start w-full">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:text-primary transition-all duration-500 shadow-xl">
            <span className="material-symbols-outlined text-2xl opacity-80 group-hover:opacity-100">{feature.icon}</span>
          </div>
          <span className="font-mono text-[10px] text-zinc-600 group-hover:text-primary/70 uppercase tracking-widest transition-colors duration-500">
            // {feature.id}
          </span>
        </div>

        <div className={`${feature.isHero ? 'mt-16' : 'mt-8'}`}>
          <h3 className={`${feature.isHero ? 'text-3xl lg:text-4xl' : 'text-xl'} font-bold text-white mb-3 tracking-tighter leading-tight`}>
            {feature.title}
          </h3>
          <p className="text-zinc-400 font-light leading-relaxed max-w-sm">
            {feature.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const FeatureGrid = () => {
  const features = [
    { 
      id: 'BLIND_TEST',
      icon: 'blind', 
      title: 'Anonymous Blind Testing', 
      desc: 'Eliminate brand loyalty bias with anonymous side-by-side inference comparisons. Real performance over marketing.', 
      spanClass: "col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2 min-h-[400px]",
      isHero: true,
      bgGradient: "bg-gradient-to-br from-primary/30 via-transparent to-transparent",
      image: blindTestingImg
    },
    { 
      id: 'RAG_MODE',
      icon: 'database', 
      title: 'RAG Mode', 
      desc: 'Evaluate how models handle private documents & context injection logic.', 
      spanClass: "col-span-1 lg:col-span-1",
      image: ragModeImg
    },
    { 
      id: 'COT_ANALYSIS',
      icon: 'psychology', 
      title: 'CoT Analysis', 
      desc: 'Deep Chain-of-Thought inspection to see exactly how reasoning pathways form.', 
      spanClass: "col-span-1 lg:col-span-1",
      image: cotAnalysisImg
    },
    { 
      id: 'ARENA_SCORE',
      icon: 'monitoring', 
      title: 'ArenaScore Algorithm', 
      desc: 'Proprietary scoring matrix normalized across 40+ distinct performance dimensions.', 
      spanClass: "col-span-1 lg:col-span-1",
      image: arenaScoreImg
    },
    { 
      id: 'LEADERBOARD',
      icon: 'leaderboard', 
      title: 'Global Live Leaderboard', 
      desc: 'Real-time ELO ratings based on millions of blind user evaluations processed daily.', 
      spanClass: "col-span-1 md:col-span-2 lg:col-span-2 min-h-[300px]",
      bgGradient: "bg-gradient-to-tl from-zinc-800/50 to-transparent",
      image: leaderboardImg
    },
  ];

  return (
    <section className="py-32 relative bg-[#0a0a0a] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-primary/10 blur-[150px] rounded-[100%] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <motion.div
          className="text-center mb-24 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary font-mono text-[10px] uppercase tracking-[0.3em] mb-8 shadow-[0_0_20px_rgba(var(--color-primary),0.1)]">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Module: Core_Architecture
          </div>
          <h2 className="font-headline text-5xl md:text-6xl font-extrabold mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500">
            Engineered for Precision
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl text-center">
            Pushing the boundaries of LLM benchmarking with state-of-the-art telemetry and zero-bias environments.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
          {features.map((feature, i) => (
            <BentoCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default FeatureGrid;
