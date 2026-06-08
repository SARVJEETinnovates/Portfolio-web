import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ end, duration, suffix = '', label }: { end: number; duration: number; suffix?: string; label: string }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            setCount(Math.floor(progress * end));
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [end, duration, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative group"
    >
      <div className="relative backdrop-blur-sm bg-card/30 p-8 rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 text-center">
          <div className="text-5xl font-display font-bold mb-2 bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
            {count}{suffix}
          </div>
          <div className="text-sm text-muted-foreground uppercase tracking-wider">
            {label}
          </div>
        </div>
        
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
};

const StatsSection = () => {
  const stats = [
    { end: 6, suffix: '+', label: 'Clients Served', duration: 2000 },
    { end: 40, suffix: '+', label: 'Technologies Mastered', duration: 2500 },
    { end: 100, suffix: '%', label: 'Client Satisfaction', duration: 2000 },
    { end: 3, suffix: '+', label: 'Years Experience', duration: 1500 },
  ];

  return (
    <section className="relative py-20 overflow-hidden" aria-label="Statistics">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-30" />
      
      <div className="section-container max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-mono text-sm uppercase tracking-[0.3em] mb-4 backdrop-blur-sm bg-primary/10 px-4 py-2 rounded-full border border-primary/30">
            By The Numbers
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-foreground via-foreground to-primary/70 bg-clip-text text-transparent">
            Proven Track Record
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
