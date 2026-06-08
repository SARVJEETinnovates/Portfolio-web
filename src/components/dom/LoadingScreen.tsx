import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
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
          {/* Animated background elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
            />
          </div>

          <div className="relative z-10">
            {/* SY Logo - Enhanced styling */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotateY: [0, 10, -10, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ perspective: '1000px' }}
                className="text-8xl font-display font-black tracking-tighter"
              >
                <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(204,255,0,0.3)]">
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
            </motion.div>

            {/* Loading status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-8"
            >
              <p className="text-sm text-muted-foreground font-mono uppercase tracking-widest">
                Initializing Portfolio
              </p>
            </motion.div>

            {/* Progress bar with enhanced styling */}
            <div className="w-72 space-y-4 mb-8">
              <div className="relative h-2 bg-border/40 rounded-full overflow-hidden border border-primary/20">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-primary via-primary/90 to-primary/80 rounded-full shadow-[0_0_15px_rgba(204,255,0,0.6)]"
                />
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-mono">Loading</span>
                <span className="text-primary font-bold font-mono">{Math.floor(progress)}%</span>
              </div>
            </div>

            {/* Animated dots loader */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [0.6, 1.2, 0.6],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-2 h-2 bg-primary rounded-full"
                />
              ))}
            </div>

            {/* Status messages */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <p className="text-xs text-muted-foreground/60 font-mono space-y-1">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                >
                  {'> System initializing'}
                </motion.div>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                >
                  {'> Loading modules'}
                </motion.div>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                >
                  {'> Ready soon...'}
                </motion.div>
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
