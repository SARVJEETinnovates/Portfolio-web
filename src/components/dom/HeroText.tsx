import { memo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const HeroText = memo(() => {
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    // Wait for loading screen to complete (1 second delay)
    const timer = setTimeout(() => setLoadingComplete(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-20 lg:pt-0">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-10 lg:gap-12">
        
        {/* Left side - Text content */}
        <article className="flex-1 pointer-events-none space-y-6 sm:space-y-8 w-full" itemScope itemType="https://schema.org/Person">
        
          {/* Greeting line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={loadingComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: loadingComplete ? 0.2 : 0 }}
            className="mb-4"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light">
              Hi There, it's
            </p>
          </motion.div>

          {/* Name with split color styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={loadingComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: loadingComplete ? 0.4 : 0 }}
            className="mb-6"
          >
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight" itemProp="name">
              <motion.span 
                className="inline-block bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent text-shadow-lg"
                animate={{ 
                  backgroundPosition: ['0%', '100%', '0%'],
                  letterSpacing: ['-0.02em', '-0.01em', '-0.02em'],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  backgroundSize: '200% 200%',
                  filter: 'drop-shadow(0 0 20px rgba(204, 255, 0, 0.3))',
                }}
              >
                Sarvjeet
              </motion.span>{' '}
              <motion.span 
                className="inline-block bg-gradient-to-r from-foreground/80 via-foreground/90 to-foreground/80 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ['0%', '100%', '0%'],
                  letterSpacing: ['-0.02em', '-0.01em', '-0.02em'],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                style={{
                  backgroundSize: '200% 200%',
                  filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.1))',
                }}
              >
                Yadav
              </motion.span>
            </h1>
          </motion.div>

          {/* Role badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={loadingComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: loadingComplete ? 0.6 : 0 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 backdrop-blur-sm bg-muted/20 px-3 sm:px-5 py-2 sm:py-3 rounded-full border border-primary/30">
              <span className="relative flex h-2 sm:h-3 w-2 sm:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 sm:h-3 w-2 sm:w-3 bg-primary"></span>
              </span>
              <span className="text-xs sm:text-sm font-mono text-foreground uppercase tracking-wider" itemProp="jobTitle">
                Full Stack Developer & AI Engineer
              </span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={loadingComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: loadingComplete ? 0.8 : 0 }}
            className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-10"
            itemProp="description"
          >
            Turning Visions into Reality: Seamlessly crafted web experiences and cutting-edge AI solutions, empowering businesses to thrive in the digital age.
          </motion.p>

          {/* CTA buttons */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={loadingComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: loadingComplete ? 1 : 0 }}
            className="flex flex-wrap gap-3 sm:gap-4 pointer-events-auto"
            aria-label="Quick navigation"
          >
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group pointer-events-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-primary text-primary-foreground rounded-xl hover:shadow-[0_0_30px_rgba(204,255,0,0.5)] transition-all duration-300 font-semibold relative overflow-hidden"
              aria-label="Contact Sarvjeet Yadav"
            >
              <span className="relative z-10 flex items-center gap-2">
                Contact Me
                <motion.svg 
                  className="w-4 sm:w-5 h-4 sm:h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ x: 8, y: -8 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </button>
            
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group pointer-events-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base border-2 border-border backdrop-blur-sm bg-background/50 text-foreground rounded-xl hover:border-primary hover:bg-background/70 transition-all duration-300 font-semibold"
              aria-label="View projects"
            >
              <span className="flex items-center gap-2">
                Discover
                <motion.svg 
                  className="w-4 sm:w-5 h-4 sm:h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ y: 6, x: 2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </motion.svg>
              </span>
            </button>
          </motion.nav>

          {/* Experience badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={loadingComplete ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: loadingComplete ? 1.2 : 0 }}
            className="mt-12 flex flex-wrap items-center gap-4 sm:gap-8 text-sm text-muted-foreground"
          >
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-primary">3+</div>
              <div className="text-xs uppercase tracking-wider">Years Experience</div>
            </div>
            <div className="hidden sm:block h-12 w-px bg-border"></div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-primary">15+</div>
              <div className="text-xs uppercase tracking-wider">Projects Delivered</div>
            </div>
          </motion.div>
        </article>

        {/* Right side - Profile Image Section */}
        <div className="flex md:flex-1 items-center justify-center pointer-events-none relative h-auto md:h-full w-full md:w-auto">
          {/* Full image display - scaled to fit layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={loadingComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: loadingComplete ? 1 : 0 }}
            whileHover={{ scale: 1.05 }}
            className="relative w-full max-w-xs sm:max-w-sm md:max-w-md drop-shadow-2xl"
          >
            {/* Subtle glow background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-teal-900/5 to-transparent rounded-3xl blur-2xl -z-10" />
            
            {/* Image container - circular with clipping */}
            <div 
              className="relative rounded-full overflow-hidden border-2 border-cyan-400/40"
              style={{
                width: '100%',
                maxWidth: '384px',
                aspectRatio: '384 / 460',
                boxShadow: '0 0 40px rgba(34, 211, 238, 0.4), inset 0 1px 20px rgba(255, 255, 255, 0.1)',
              }}
            >
              {/* Subtle gradient overlay for depth and polish */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 rounded-full z-10 pointer-events-none" />
              
              <img
                src="/hero.png"
                alt="Sarvjeet Yadav - Full Stack Developer and AI Engineer"
                className="w-full h-full object-cover object-center"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - Enhanced and positioned better */}
      <button
        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto z-20 group"
        aria-label="Scroll down to next section"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">Scroll down</span>
          
          {/* Animated scroll icon - Enhanced clickable area */}
          <div className="relative w-6 h-10 sm:w-8 sm:h-12 border-2 border-primary/50 rounded-full flex items-center justify-center group-hover:border-primary transition-colors">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 bg-primary rounded-full"
            />
          </div>

          {/* Chevrons */}
          <motion.svg
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            className="w-4 h-4 sm:w-6 sm:h-6 text-primary group-hover:text-primary/80 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </motion.svg>
        </motion.div>
      </button>
        
      {/* Hidden SEO content for crawlers */}
      <meta itemProp="url" content="https://sarvjeetyadav.dev" />
      <meta itemProp="email" content="sarvjeetyadav2969@gmail.com" />
    </div>
  );
});

export default HeroText;
