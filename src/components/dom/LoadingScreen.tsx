import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FallingCharacter {
  id: number;
  char: string;
  xPosition: number;
  delay: number;
  duration: number;
}

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Generate falling characters once
  const fallingCharacters = useMemo(() => {
    const codeCharacters = ['<', '>', '{', '}', '[', ']', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '=', '+', '-', '*'];
    const characters: FallingCharacter[] = [];
    
    for (let i = 0; i < 20; i++) {
      characters.push({
        id: i,
        char: codeCharacters[Math.floor(Math.random() * codeCharacters.length)],
        xPosition: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 4 + Math.random() * 4,
      });
    }
    
    return characters;
  }, []);

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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-background via-background/95 to-background flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Falling code characters background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {fallingCharacters.map((charData) => (
              <motion.div
                key={charData.id}
                initial={{
                  y: -50,
                  x: `${charData.xPosition}%`,
                  opacity: 0,
                  rotate: 0,
                }}
                animate={{
                  y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1000,
                  opacity: [0, 0.6, 0.3, 0],
                  rotate: 360,
                }}
                transition={{
                  duration: charData.duration,
                  delay: charData.delay,
                  repeat: Infinity,
                  ease: 'linear',
                  opacity: {
                    times: [0, 0.2, 0.8, 1],
                    duration: charData.duration,
                  },
                  rotate: {
                    duration: charData.duration * 0.6,
                    repeat: Infinity,
                  },
                }}
                className="absolute text-4xl font-mono font-bold text-primary/30"
              >
                {charData.char}
              </motion.div>
            ))}
          </div>

          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full border border-primary/20 opacity-40"
            />
            <motion.div
              animate={{ 
                rotate: -360,
                scale: [1, 0.8, 1],
              }}
              transition={{ 
                rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute -bottom-1/2 -left-1/2 w-full h-full rounded-full border border-primary/10 opacity-30"
            />
          </div>

          {/* Main content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 text-center space-y-8"
          >
            {/* Animated logo */}
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-7xl font-display font-bold mb-4"
              >
                <span className="inline-block bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent animate-gradient">
                  SY<span className="text-primary">.</span>
                </span>
              </motion.div>
              
              {/* Glowing orbit around logo */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-24 h-24 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30"
              />
            </motion.div>

            {/* Loading text with typing effect */}
            <motion.div variants={itemVariants} className="space-y-3">
              <p className="text-lg font-display text-foreground tracking-widest">
                Initializing Portfolio
              </p>
              <p className="text-sm text-muted-foreground font-mono">
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ▌
                </motion.span>
              </p>
            </motion.div>

            {/* Animated progress bar with glow */}
            <motion.div variants={itemVariants} className="w-80 space-y-3">
              <div className="relative h-2 bg-border/30 rounded-full overflow-hidden backdrop-blur-sm border border-primary/20">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full shadow-[0_0_20px_rgba(204,255,0,0.8)]"
                />
              </div>
              <div className="text-xs text-muted-foreground text-center font-mono">
                {Math.floor(progress)}%
              </div>
            </motion.div>

            {/* Scanning lines animation */}
            <motion.div variants={itemVariants} className="space-y-2 h-16 overflow-hidden">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    opacity: [0.3, 1, 0.3],
                    x: [-100, 100, -100],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="h-px bg-gradient-to-r from-transparent via-primary to-transparent w-64"
                />
              ))}
            </motion.div>

            {/* Status text */}
            <motion.div
              variants={itemVariants}
              className="text-xs text-muted-foreground/70 space-y-1 font-mono"
            >
              <p>{'> System initialized'}</p>
              <p>{'> Loading experience modules'}</p>
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
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
