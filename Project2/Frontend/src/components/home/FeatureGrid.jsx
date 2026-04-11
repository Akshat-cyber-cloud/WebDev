import React from 'react';
import { motion } from 'framer-motion';

const FeatureGrid = () => {
  const features = [
    { icon: 'blind', title: 'Blind Testing', desc: 'Eliminate brand loyalty bias with anonymous side-by-side inference comparisons.' },
    { icon: 'database', title: 'RAG Mode', desc: 'Evaluate how models handle your private documents and context injection logic.' },
    { icon: 'psychology', title: 'CoT Analysis', desc: 'Chain-of-Thought inspection to see exactly how each model reached its final output.' },
    { icon: 'monitoring', title: 'ArenaScore', desc: 'Our proprietary scoring algorithm normalized across 40+ performance dimensions.' },
    { icon: 'leaderboard', title: 'Live Leaderboard', desc: 'Real-time ELO ratings based on thousands of blind user evaluations daily.' },
    { icon: 'analytics', title: 'Advanced Analytics', desc: 'Exportable telemetry on latency, token costs, and qualitative comparison metrics.' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      clipPath: 'inset(0 100% 0 0)'
    },
    show: {
      opacity: 1,
      clipPath: 'inset(0 0% 0 0)',
      transition: { type: 'spring', stiffness: 50, damping: 20 }
    }
  };

  return (
    <section className="py-32 arena-grid relative">
      <div className="absolute inset-0 bg-background/80 mix-blend-multiply pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary font-mono text-[10px] uppercase tracking-[0.3em] mb-6">
            Module: Core_Architecture
          </div>
          <h2 className="font-headline text-4xl font-bold mb-4 uppercase tracking-tighter">Engineered for Precision</h2>
          <div className="w-full max-w-xs mx-auto h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-6"></div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="p-8 bg-surface-container/50 backdrop-blur-md border border-white/5 hover:border-primary/40 hover:bg-surface-container transition-all duration-300 group relative overflow-hidden"
            >
              {/* Scanline hover effect */}
              <div className="absolute top-0 left-0 w-full h-1 bg-primary/40 -translate-y-full group-hover:translate-y-[400px] transition-transform duration-1000 ease-linear opacity-0 group-hover:opacity-100"></div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-surface flex flex-col items-center justify-center border border-outline-variant group-hover:border-primary/50 transition-colors">
                  <span className="material-symbols-outlined text-primary text-xl">{feature.icon}</span>
                </div>
                <h4 className="text-lg font-bold uppercase tracking-wide group-hover:text-primary transition-colors">{feature.title}</h4>
              </div>

              <p className="text-zinc-500 text-sm font-light leading-relaxed">{feature.desc}</p>

              <div className="mt-8 flex justify-end">
                <span className="font-mono text-[9px] text-zinc-700 group-hover:text-primary/50 uppercase tracking-[0.2em] transition-colors">
                  // {feature.title.replace(' ', '_')}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureGrid;

