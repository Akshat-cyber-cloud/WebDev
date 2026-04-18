import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const RadiantPortal = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Pure dark background */}
      <div className="absolute inset-0 bg-[#0a0706]"></div>

      {/* The white glowing door/source — anchored to the far left edge */}
      <div
        className="absolute top-1/2 -translate-y-1/2 z-20"
        style={{
          left: '-2px',
          width: '18px',
          height: '38vh',
          background: 'white',
          borderRadius: '0 10px 10px 0',
          boxShadow: `
            0 0 30px 15px rgba(255,255,255,1),
            0 0 80px 40px rgba(255,255,255,0.8),
            0 0 160px 80px rgba(255,200,100,0.4)
          `,
        }}
      ></div>

      {/* Primary beam — wide cone, but fades to dark BEFORE reaching the text area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute top-1/2 -translate-y-1/2 left-0 origin-left"
        style={{
          width: '70vw',
          height: '200vh',
          clipPath: 'polygon(0 38%, 100% 0%, 100% 100%, 0 62%)',
          background:
            'linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,130,20,0.85) 8%, rgba(220,50,0,0.55) 25%, rgba(140,10,0,0.2) 50%, rgba(0,0,0,0) 75%)',
          filter: 'blur(45px)',
          mixBlendMode: 'screen',
        }}
      ></motion.div>

      {/* Inner brighter cone — tighter angle, shorter reach */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ duration: 1.8, ease: 'easeOut', delay: 0.1 }}
        className="absolute top-1/2 -translate-y-1/2 left-0 origin-left"
        style={{
          width: '40vw',
          height: '120vh',
          clipPath: 'polygon(0 41%, 100% 20%, 100% 80%, 0 59%)',
          background:
            'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,180,50,0.9) 10%, rgba(255,80,0,0.5) 30%, transparent 100%)',
          filter: 'blur(18px)',
          mixBlendMode: 'screen',
        }}
      ></motion.div>

      {/* Edge vignette — keeps right half of screen truly dark */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, transparent 20%, rgba(10,7,6,0.65) 50%, rgba(10,7,6,0.92) 70%, rgba(10,7,6,1) 100%)',
        }}
      ></div>

      {/* Subtle top/bottom vignette */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,7,6,0.8) 0%, transparent 25%, transparent 75%, rgba(10,7,6,0.9) 100%)',
        }}
      ></div>

      {/* Drifting particles inside the beam */}
      <div className="absolute inset-0 overflow-hidden mix-blend-screen opacity-60 z-10">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: -20, y: '50vh', opacity: 0 }}
            animate={{
              x: `${30 + Math.random() * 40}vw`,
              y: `${50 + (Math.random() - 0.5) * 60}vh`,
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: 'linear',
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ boxShadow: '0 0 8px 2px rgba(255,200,100,0.9)' }}
          />
        ))}
      </div>
    </div>
  );
};

const Hero = () => {
  const ease = [0.22, 1, 0.36, 1];

  return (
    <header className="relative w-full h-screen min-h-[700px] overflow-hidden flex items-center">
      <RadiantPortal />

      <div className="max-w-screen-xl mx-auto px-8 lg:px-16 relative z-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
        {/* Left spacer — lets the light breathe */}
        <div className="hidden lg:block" />

        {/* Right column — all the content */}
        <div className="flex flex-col items-start text-left">

          {/* Community avatar chip */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0, duration: 0.7, ease }}
            className="flex items-center gap-2.5 px-2 py-1.5 bg-white/6 backdrop-blur-sm rounded-full border border-white/10 mb-8"
          >
            <div className="flex -space-x-1.5 pl-1">
              {['Felix', 'Aneka', 'JD'].map((seed) => (
                <img
                  key={seed}
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
                  alt="avatar"
                  className="w-6 h-6 rounded-full border-2 border-[#0a0706] bg-zinc-700"
                />
              ))}
            </div>
          </motion.div> */}

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.85, ease }}
            className="font-headline text-[2.8rem] sm:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[1.05] mb-6"
          >
            Two Models Enter.<br />
            <span className="text-white/90">One Gets Judged.</span>
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.8, ease }}
            className="text-base lg:text-lg text-zinc-400 font-light mb-10 leading-relaxed max-w-lg"
          >
            A serverless evaluation cloud for AI and ML workloads. Designed to help developers
            build, train, and scale effortlessly with statistically rigorous side-by-side LLM benchmarks.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36, duration: 0.7, ease }}
            className="flex items-center gap-4"
          >
            <Link
              to="/register"
              className="px-6 py-3 bg-white text-black text-sm font-semibold rounded-[6px] hover:bg-zinc-100 active:scale-95 transition-all duration-150"
            >
              Get started
            </Link>
          </motion.div>

        </div>
      </div>
    </header>
  );
};

export default Hero;
