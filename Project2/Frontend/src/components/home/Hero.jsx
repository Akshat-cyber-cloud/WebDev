import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Ticker from '../ui/Ticker';

const Hero = () => {
  const tickerItems = [
    "BATTLE #8423: Claude 3 vs GPT-4 » VERDICT PENDING",
    "SYS_LOG: 2.4k inference requests/sec",
    "NODE_STATUS: ALL SYSTEMS GREEN",
    "EVAL_PROTOCOL: STRICT_BLIND",
    "BATTLE #8422: Llama-3 vs Mixtral » WINNER: LLAMA-3",
  ];

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.8, ease: "easeOut" }
    })
  };

  return (
    <header className="relative pt-40 pb-16 overflow-hidden arena-grid min-h-[90vh] flex flex-col items-center justify-center">
      {/* Decorative Glows (Pure Green) */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none animate-float-reverse"></div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-8 relative z-10 text-center flex-1 flex flex-col justify-center">
        <motion.div 
          custom={0}
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          className="inline-block px-4 py-1.5 bg-surface-container-high rounded-full border border-primary/20 mb-8 mx-auto"
        >
          <span className="font-mono text-xs tracking-widest text-primary uppercase font-medium text-glow">
            [ BLIND AI EVALUATION PLATFORM ]
          </span>
        </motion.div>
        
        <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter text-on-surface mb-6 leading-tight flex flex-col items-center">
          <motion.span custom={1} initial="hidden" animate="visible" variants={titleVariants}>
            Two Models Enter.
          </motion.span>
          <motion.span custom={2} initial="hidden" animate="visible" variants={titleVariants} className="text-primary">
            One Gets Judged.
          </motion.span>
        </h1>
        
        <motion.p 
          custom={3} 
          initial="hidden" 
          animate="visible" 
          variants={titleVariants}
          className="max-w-2xl mx-auto text-lg text-on-surface-variant font-light mb-12 leading-relaxed"
        >
          Empowering developers with unbiased, statistically rigorous side-by-side LLM benchmarks. Real-time inference battlegrounds for the next generation of AI.
        </motion.p>
        
        <motion.div 
          custom={4} 
          initial="hidden" 
          animate="visible" 
          variants={titleVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Link to="/register" className="group px-8 py-4 bg-primary text-background font-bold active:scale-95 duration-200 transition-all shadow-xl shadow-primary/10 flex items-center gap-2 uppercase text-xs tracking-widest relative overflow-hidden">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none"></div>
            <span className="relative z-10">Start Experimenting</span>
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1 relative z-10">arrow_forward</span>
          </Link>
          <button className="px-8 py-4 border border-primary/30 text-primary font-semibold hover:bg-primary/5 active:scale-95 duration-200 transition-all uppercase text-xs tracking-widest">
            See How It Works
          </button>
        </motion.div>
        
        <motion.div 
          custom={5} 
          initial="hidden" 
          animate="visible" 
          variants={titleVariants}
          className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto"
        >
          <div className="text-center p-6 bg-surface-container-lowest border border-primary/10 shadow-2xl shadow-black/50">
            <div className="font-mono text-3xl font-bold text-primary mb-1">2,400+</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-primary/50">Battles Recorded</div>
          </div>
          <div className="text-center p-6 bg-surface-container-lowest border border-primary/10 shadow-2xl shadow-black/50">
            <div className="font-mono text-3xl font-bold text-primary mb-1">91%</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-primary/50">Judgment Accuracy</div>
          </div>
          <div className="text-center p-6 bg-surface-container-lowest border border-primary/10 shadow-2xl shadow-black/50 col-span-2 md:col-span-1">
            <div className="font-mono text-3xl font-bold text-primary mb-1">6</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-primary/50">Battle Strategies</div>
          </div>
        </motion.div>
      </div>
      
      <div className="w-full absolute bottom-0 left-0">
        <Ticker items={tickerItems} speed={30} />
      </div>
    </header>
  );
};

export default Hero;


