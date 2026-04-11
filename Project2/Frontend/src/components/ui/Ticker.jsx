import React from "react";
import { motion } from "framer-motion";

const Ticker = ({ items, speed = 40 }) => {
  return (
    <div className="w-full overflow-hidden bg-surface-container-lowest border-y border-outline-variant py-2 flex whitespace-nowrap relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
      
      <motion.div
        className="flex gap-12 text-on-surface-variant font-mono text-[10px] uppercase tracking-widest px-6 w-max"
        animate={{
          x: ["0%", "-50%"]
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed
        }}
      >
        {[...items, ...items, ...items].map((item, index) => (
          <span key={index} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary/50 animate-pulse"></span>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Ticker;
