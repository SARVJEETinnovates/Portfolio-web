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
          className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center"
        >
          <div className="relative">
            {/* Logo - SY with new style and color */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-7xl font-display font-bold mb-8"
            >
              <motion.span
                animate={{ 
                  y: [0, -8, 0],
                  letterSpacing: ['-0.02em', '0em', '-0.02em'],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block bg-gradient-to-r from-primary via-primary/90 to-primary bg-clip-text text-transparent"
              >
                SY
              </motion.span>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-primary ml-1"
              >
                .
              </motion.span>
            </motion.div>

            {/* Progress bar */}
            <div className="w-64 h-1 bg-border rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
              />
            </div>

            {/* Loading text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-muted-foreground mt-4 text-center font-mono"
            >
              Loading experience...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
