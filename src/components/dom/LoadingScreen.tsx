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
          setTimeout(() => setIsLoading(false), 800);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Rotating circles */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-primary/10"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-primary/20"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-primary/30"
            />
          </div>

          {/* Main content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 text-center space-y-8"
          >
            {/* Animated logo with better styling */}
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 3, -3, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-8xl font-display font-bold"
              >
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent animate-gradient">
                  SY
                </span>
                <span className="text-primary animate-pulse ml-2">.</span>
              </motion.div>
            </motion.div>

            {/* Loading text */}
            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-xl font-display text-foreground tracking-wider">
                Initializing Portfolio
              </p>
              <motion.div className="flex items-center justify-center gap-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [0.8, 1.2, 0.8] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="w-2 h-2 bg-primary rounded-full"
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Enhanced progress bar */}
            <motion.div variants={itemVariants} className="w-80 space-y-3">
              <div className="relative h-2.5 bg-border/30 rounded-full overflow-hidden border border-primary/30">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full"
                />
                {/* Shimmer effect */}
                <motion.div
                  animate={{ 
                    x: ['-100%', '100%'],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
              </div>
              <div className="text-xs text-primary font-mono font-bold tracking-widest">
                {Math.floor(progress)}%
              </div>
            </motion.div>

            {/* Data flow visualization */}
            <motion.div variants={itemVariants} className="space-y-3 h-20 flex flex-col justify-center">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    opacity: [0.2, 1, 0.2],
                    x: [-60, 60, -60],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent w-64 mx-auto"
                />
              ))}
            </motion.div>

            {/* Status messages */}
            <motion.div
              variants={itemVariants}
              className="text-xs text-muted-foreground/70 space-y-1.5 font-mono tracking-wide"
            >
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
              >
                {'> System initialized'}
              </motion.p>
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              >
                {'> Loading modules'}
              </motion.p>
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
              >
                {'> Ready in a moment...'}
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
