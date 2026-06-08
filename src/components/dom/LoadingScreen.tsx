import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Primary gradient blob */}
            <motion.div
              animate={{ 
                x: [0, 30, -20, 0],
                y: [0, -30, 20, 0],
                scale: [1, 1.3, 0.9, 1],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-1/3 -left-1/4 w-96 h-96 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-3xl opacity-50"
            />
            
            {/* Secondary gradient blob */}
            <motion.div
              animate={{ 
                x: [0, -30, 20, 0],
                y: [0, 30, -20, 0],
                scale: [1, 0.9, 1.3, 1],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-1/3 -right-1/4 w-96 h-96 bg-gradient-to-tl from-primary/20 to-transparent rounded-full blur-3xl opacity-40"
            />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />

            {/* Animated scan lines */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  opacity: [0.1, 0.3, 0.1],
                  y: [0, window.innerHeight, 0],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.2,
                }}
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
              />
            ))}

            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/30" />
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-primary/30" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-primary/30" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary/30" />
          </div>

          <div className="relative z-10">
            {/* SY Logo - Enhanced styling */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              {/* Orbital rings around SY */}
              <div className="relative w-40 h-40 flex items-center justify-center mx-auto">
                {/* Outer ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-primary/30 rounded-full"
                />
                
                {/* Middle ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 border border-primary/20 rounded-full"
                />

                {/* Inner ring with particles */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-8 border border-primary/10 rounded-full"
                />

                {/* Rotating particles */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      rotate: 360 * (i + 1),
                    }}
                    transition={{
                      duration: 10 + i * 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-6"
                  >
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(204,255,0,0.8)]" />
                  </motion.div>
                ))}

                {/* SY Text in center */}
                <motion.div
                  animate={{ 
                    y: [0, -12, 0],
                    rotateY: [0, 10, -10, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  style={{ perspective: '1000px' }}
                  className="relative z-10 text-8xl font-display font-black tracking-tighter"
                >
                  <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(204,255,0,0.4)]">
                    SY
                  </span>
                  <motion.span
                    animate={{ 
                      opacity: [0.4, 1, 0.4],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-primary ml-1"
                  >
                    .
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>

            {/* Loading status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-12"
            >
              <p className="text-sm text-muted-foreground font-mono uppercase tracking-widest">
                Initializing Portfolio
              </p>
            </motion.div>

            {/* Progress bar with enhanced styling */}
            <div className="w-80 space-y-6 mb-12">
              {/* Main progress bar */}
              <div className="relative h-2.5 bg-border/40 rounded-full overflow-hidden border border-primary/30">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-primary via-primary/90 to-primary/70 rounded-full shadow-[0_0_20px_rgba(204,255,0,0.7)]"
                />
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-mono">Building Experience</span>
                <span className="text-primary font-bold font-mono bg-primary/10 px-2 py-1 rounded">{Math.floor(progress)}%</span>
              </div>
            </div>

            {/* Animated dots loader */}
            <div className="flex items-center justify-center gap-3 mb-12">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [0.5, 1.3, 0.5],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                  className="w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_10px_rgba(204,255,0,0.6)]"
                />
              ))}
            </div>

            {/* Status messages with tech feel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center space-y-2"
            >
              <div className="space-y-2">
                {[
                  '> System initializing...',
                  '> Loading core modules',
                  '> Compiling assets',
                  '> Ready in moments...',
                ].map((msg, idx) => (
                  <motion.div
                    key={idx}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: idx * 0.25,
                    }}
                    className="text-xs text-primary/70 font-mono"
                  >
                    {msg}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
