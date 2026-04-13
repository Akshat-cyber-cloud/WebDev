import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProcessCards = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const steps = [
    {
      id: '01',
      icon: 'terminal',
      title: 'Submit Prompt',
      description: 'Enter your testing parameters or choose from our expert-curated evaluation sets designed to stress-test logical reasoning.',
      color: 'bg-primary',
      textColor: 'text-primary',
    },
    {
      id: '02',
      icon: 'visibility',
      title: 'Watch Live Battle',
      description: 'Observe two unidentified models generate responses in parallel. No model names, just raw performance data.',
      color: 'bg-primary',
      textColor: 'text-primary',
    },
    {
      id: '03',
      icon: 'gavel',
      title: 'The Verdict',
      description: 'Cast your vote or let our automated Referee-Models score the responses based on truthfulness, safety, and coherence.',
      color: 'bg-primary',
      textColor: 'text-primary',
    },
  ];

  return (
    <section className="py-32 bg-surface-container-lowest relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface-container-lowest to-surface-container-lowest pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="flex justify-between items-end mb-20">
          <div className="max-w-xl">
            <h2 className="font-headline text-4xl font-bold mb-4 uppercase tracking-tight">Scientific Evaluation</h2>
            <p className="text-on-surface-variant font-light py-2 px-4 border-l-2 border-primary bg-primary/5 font-mono text-xs uppercase tracking-widest">
              Protocol: Remove hallucinations & prompt bias through controlled comparative testing environments.
            </p>
          </div>
          <div className="hidden lg:block h-px flex-1 bg-outline-variant/30 mx-12 mb-4 relative">
            <motion.div
              className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full mix-blend-screen"
              animate={{ left: ["0%", "100%", "0%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const isHovered = hoveredCard === step.id;

            return (
              <motion.div
                key={step.id}
                onHoverStart={() => setHoveredCard(step.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative group p-8 bg-surface border border-white/5 shadow-2xl overflow-hidden cursor-crosshair transition-colors duration-300 h-80 flex flex-col justify-between"
              >
                {/* Diagnostic X-Ray Overlay */}
                <motion.div
                  className="absolute inset-0 diagnostic-grid border-2 border-dashed border-primary/40 opacity-0 bg-surface/80 backdrop-blur-sm pointer-events-none z-10"
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.15 }}
                />

                {/* Background ID */}
                <div className="absolute -top-4 -right-4 font-headline text-9xl font-black text-white/[0.02] pointer-events-none transition-transform duration-700 group-hover:scale-110">
                  {step.id}
                </div>

                <div className="relative z-20">
                  <div className="flex justify-between items-start mb-8">
                    <div className={`w-12 h-12 flex items-center justify-center ${step.textColor} bg-surface-container border border-outline-variant`}>
                      <span className="material-symbols-outlined">{step.icon}</span>
                    </div>

                    {/* Active Status Badge */}
                    <motion.div
                      className="font-mono text-[10px] uppercase tracking-widest text-primary border border-primary/30 px-2 py-1 bg-primary/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      [ACTIVE]
                    </motion.div>
                  </div>

                  <h3 className={`text-xl font-bold mb-3 uppercase tracking-wider transition-colors duration-300 ${isHovered ? 'text-primary' : 'text-white'}`}>
                    {step.title}
                  </h3>

                  <motion.div
                    animate={{
                      opacity: isHovered ? [1, 0, 1, 1] : 1,
                      scale: isHovered ? [1, 0.98, 1.02, 1] : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className={`text-sm leading-relaxed ${isHovered ? 'font-mono text-primary/80 lowercase tracking-tight' : 'text-zinc-500'}`}>
                      {step.description}
                    </p>
                  </motion.div>
                </div>

                {/* Corner Accents */}
                <motion.div
                  className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary opacity-0 pointer-events-none z-20"
                  animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 1.2 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.div
                  className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary opacity-0 pointer-events-none z-20"
                  animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 1.2 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessCards;

