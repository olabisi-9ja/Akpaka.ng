'use client';

import React, { useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    // The total time the splash screen is visible before triggering the exit
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const text = "Akpaka.NG";
  const letters = Array.from(text);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.4 }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: "100%" },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FAF9F6]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut", delay: 0.4 } }}
    >
      <div className="overflow-hidden pb-4">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          exit="exit"
          className="flex"
        >
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              variants={item}
              className="text-4xl sm:text-6xl md:text-7xl font-serif text-charcoal tracking-[0.1em]"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
