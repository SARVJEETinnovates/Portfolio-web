import { memo } from 'react';
import { motion } from 'framer-motion';

const HeroText = memo(() => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-4 md:px-8">
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left side - Text content */}
        <article className="flex-1 pointer-events-none space-y-8" itemScope itemType="https://schema.org/Person">
        
          {/* Greeting line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4"
          >
            <p className="text-xl md:text-2xl text-muted-foreground font-light">
              Hi There, it's
            </p>
          </motion.div>

          {/* Name with split color styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight" itemProp="name">
              <span className="text-primary">Sarvjeet</span>{' '}
              <span className="text-foreground">Yadav</span>
            </h1>
          </motion.div>

          {/* Role badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 backdrop-blur-sm bg-muted/20 px-5 py-3 rounded-full border border-primary/30">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="text-sm font-mono text-foreground uppercase tracking-wider" itemProp="jobTitle">
                Full Stack Developer & AI Engineer
              </span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-10"
            itemProp="description"
          >
            Turning Visions into Reality: Seamlessly crafted web experiences and cutting-edge AI solutions, empowering businesses to thrive in the digital age.
          </motion.p>

          {/* CTA buttons */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-wrap gap-4 pointer-events-auto"
            aria-label="Quick navigation"
          >
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group pointer-events-auto px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:shadow-[0_0_30px_rgba(204,255,0,0.5)] transition-all duration-300 font-semibold relative overflow-hidden"
              aria-label="Contact Sarvjeet Yadav"
            >
              <span className="relative z-10 flex items-center gap-2">
                Contact Me
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </button>
            
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group pointer-events-auto px-8 py-4 border-2 border-border backdrop-blur-sm bg-background/50 text-foreground rounded-xl hover:border-primary hover:bg-background/70 transition-all duration-300 font-semibold"
              aria-label="View projects"
            >
              <span className="flex items-center gap-2">
                Discover
                <svg className="w-4 h-4 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
          </motion.nav>

          {/* Experience badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-12 flex items-center gap-8 text-sm text-muted-foreground"
          >
            <div>
              <div className="text-3xl font-bold text-primary">2+</div>
              <div className="text-xs uppercase tracking-wider">Years Experience</div>
            </div>
            <div className="h-12 w-px bg-border"></div>
            <div>
              <div className="text-3xl font-bold text-primary">5+</div>
              <div className="text-xs uppercase tracking-wider">Projects Delivered</div>
            </div>
          </motion.div>
        </article>

        {/* Right side - Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hidden lg:flex flex-1 items-center justify-center pointer-events-none"
          style={{ perspective: '1000px' }}
        >
          <div className="relative w-64 h-80">
            {/* Glowing background circle */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 rounded-3xl blur-3xl animate-pulse" />
            
            {/* Floating element background */}
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl border border-primary/30 backdrop-blur-sm"
            />
            
            {/* Profile image placeholder with gradient */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-primary/50 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background/80" />
              
              {/* SVG Avatar as placeholder */}
              <svg 
                viewBox="0 0 200 240" 
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background */}
                <defs>
                  <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: 'rgba(204, 255, 0, 0.1)', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: 'rgba(204, 255, 0, 0.05)', stopOpacity: 1}} />
                  </linearGradient>
                </defs>
                <rect width="200" height="240" fill="url(#bgGradient)" />
                
                {/* Head */}
                <circle cx="100" cy="70" r="35" fill="rgba(204, 255, 0, 0.3)" stroke="rgba(204, 255, 0, 0.5)" strokeWidth="2" />
                
                {/* Body/Torso */}
                <path d="M 70 105 Q 70 110 75 115 L 75 200 Q 75 210 85 210 L 115 210 Q 125 210 125 200 L 125 115 Q 130 110 130 105" fill="rgba(204, 255, 0, 0.2)" stroke="rgba(204, 255, 0, 0.5)" strokeWidth="2" />
                
                {/* Arms */}
                <line x1="75" y1="120" x2="50" y2="150" stroke="rgba(204, 255, 0, 0.4)" strokeWidth="8" strokeLinecap="round" />
                <line x1="125" y1="120" x2="150" y2="150" stroke="rgba(204, 255, 0, 0.4)" strokeWidth="8" strokeLinecap="round" />
                
                {/* Face details */}
                <circle cx="90" cy="65" r="3" fill="rgba(204, 255, 0, 0.8)" />
                <circle cx="110" cy="65" r="3" fill="rgba(204, 255, 0, 0.8)" />
                <path d="M 95 75 Q 100 78 105 75" stroke="rgba(204, 255, 0, 0.6)" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </div>

            {/* Decorative elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 border border-primary/20 rounded-3xl"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator - Enhanced and positioned better */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Scroll down</span>
          
          {/* Animated scroll icon */}
          <div className="relative w-6 h-10 border-2 border-primary/50 rounded-full flex items-center justify-center">
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
            className="w-5 h-5 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </motion.svg>
        </motion.div>
      </div>
        
      {/* Hidden SEO content for crawlers */}
      <meta itemProp="url" content="https://sarvjeetyadav.dev" />
      <meta itemProp="email" content="sarvjeetyadav2969@gmail.com" />
    </div>
  );
});

export default HeroText;
