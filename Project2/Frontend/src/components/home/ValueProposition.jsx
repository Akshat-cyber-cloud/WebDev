import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const reasons = [
  {
    id: 'intelligence',
    title: 'Uncover Real Intelligence',
    subtitle: 'Eliminate Hype & Bias',
    description: 'Bypass brand loyalty and marketing claims. By testing identical prompts blindly across leading architectures, you discover which model genuinely provides the highest-quality logic, code, and reasoning for your specific use cases.',
    icon: 'psychology',
    color: 'from-blue-500/20 to-cyan-500/5',
    borderColor: 'border-blue-500/30'
  },
  {
    id: 'economics',
    title: 'Optimize Token Economics',
    subtitle: 'Cost vs Capability',
    description: 'Stop overpaying for bloated inference. Compare compute efficiency, token generation speed, and latency side-by-side to find the ultimate balance of cost and capability—saving thousands at scale.',
    icon: 'query_stats',
    color: 'from-emerald-500/20 to-teal-500/5',
    borderColor: 'border-emerald-500/30'
  },
  {
    id: 'rag',
    title: 'Validate RAG Pipelines',
    subtitle: 'Context Injection Tuning',
    description: 'Models react differently to injected context. Evaluate how competing architectures parse, prioritize, and synthesize your private documents without compromising data security.',
    icon: 'schema',
    color: 'from-purple-500/20 to-fuchsia-500/5',
    borderColor: 'border-purple-500/30'
  }
];

const ValueProposition = () => {
  const [activeReason, setActiveReason] = useState(reasons[0]);

  return (
    <section className="py-32 relative overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-block px-3 py-1 bg-surface border border-outline-variant text-zinc-400 font-mono text-[10px] uppercase tracking-[0.3em] mb-6">
            // Value_Proposition
          </div>
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6 tracking-tighter">Why Setup The Gauntlet?</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg font-light">
            AI is evolving too quickly for static benchmarks. You need a dynamic battleground to separate marketing from reality.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          
          {/* Left Column: Interactive List */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {reasons.map((reason) => {
              const isActive = activeReason.id === reason.id;
              
              return (
                <div
                  key={reason.id}
                  onMouseEnter={() => setActiveReason(reason)}
                  onClick={() => setActiveReason(reason)}
                  className={`group relative p-6 cursor-pointer border transition-all duration-500 ${
                    isActive 
                      ? 'bg-surface-container border-primary/50 shadow-lg shadow-primary/5' 
                      : 'bg-transparent border-transparent hover:border-white/10'
                  }`}
                >
                  {/* Animated Border indicator */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-sm transition-colors duration-500 ${isActive ? 'bg-primary/20 text-primary' : 'bg-surface text-zinc-500 group-hover:text-zinc-300'}`}>
                      <span className="material-symbols-outlined">{reason.icon}</span>
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold transition-colors duration-300 ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                        {reason.title}
                      </h3>
                      <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mt-1">
                        {reason.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Content Visualizer */}
          <div className="w-full lg:w-1/2 relative min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReason.id}
                initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.4, ease: "anticipate" }}
                className={`absolute inset-0 bg-gradient-to-br ${activeReason.color} border ${activeReason.borderColor} backdrop-blur-sm p-10 flex flex-col justify-center`}
              >
                <div className="absolute top-0 right-0 p-6 opacity-20 pointer-events-none">
                  <span className="material-symbols-outlined text-[120px]">{activeReason.icon}</span>
                </div>
                
                <h4 className="text-2xl font-bold mb-6 text-white leading-tight font-headline">
                  {activeReason.title}
                </h4>
                
                <p className="text-zinc-300 text-lg leading-relaxed font-light relative z-10">
                  {activeReason.description}
                </p>

                <div className="mt-12 flex items-center gap-4 relative z-10">
                  <div className="h-[1px] w-12 bg-white/30"></div>
                  <span className="font-mono text-xs text-white/50 tracking-widest uppercase">
                    SYS_MODULE_{activeReason.id.toUpperCase()}
                  </span>
                </div>
                
                {/* Decorative Grid Lines */}
                <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiIC8+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiIC8+CjxwYXRoIGQ9Ik0wIDRwaDQwdjFINHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIC8+CjxwYXRoIGQ9Ik00IDB2NDBoLTFWMHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIC8+Cjwvc3ZnPg==')] opacity-20 mask-image:linear-gradient(to_bottom,transparent,black,transparent)"></div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
