import { memo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  technologies: string[];
  features: string[];
}

const services: Service[] = [
  {
    id: 'fullstack',
    title: 'Full Stack Web Development',
    description: 'Building dynamic, scalable web applications from frontend to backend with modern technologies and best practices.',
    icon: '💻',
    technologies: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'Prisma', 'Tailwind CSS'],
    features: ['Responsive Design', 'API Development', 'Database Design', 'Authentication', 'Performance Optimization'],
  },
  {
    id: 'ai',
    title: 'AI Integration & Chatbots',
    description: 'Leverage cutting-edge AI models to create intelligent chatbots and automation solutions that enhance user experience.',
    icon: '🤖',
    technologies: ['Google Gemini', 'LLMs', 'Node.js', 'React', 'Real-time Processing'],
    features: ['Conversational AI', 'Natural Language Processing', 'Custom Training', 'Multi-language Support', 'Analytics & Insights'],
  },
  {
    id: 'platform',
    title: 'Platform Architecture',
    description: 'Design and implement robust, scalable architectures supporting high traffic and complex business requirements.',
    icon: '🏗️',
    technologies: ['Microservices', 'WebSockets', 'Docker', 'Kubernetes', 'AWS', 'MongoDB', 'Redis'],
    features: ['Real-time Communication', 'Load Balancing', 'Caching Strategy', 'Security', 'DevOps Pipeline'],
  },
];

const ServiceCard = memo(({ service, index }: { service: Service; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('in-view');
        } else if (entry.boundingClientRect.top > 0) {
          element.classList.remove('in-view');
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: false, margin: '0px 0px -100px 0px' }}
      className="group relative scroll-animate slide-up"
    >
      <div className="relative h-full backdrop-blur-sm bg-gradient-to-br from-background/40 to-background/20 border border-border/30 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 overflow-hidden">
        {/* Animated gradient border on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10" />

        <div className="relative z-10">
          {/* Icon */}
          <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
            {service.icon}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {service.description}
          </p>

          {/* Features */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-primary/80 mb-3 uppercase tracking-wider">Key Features</p>
            <ul className="space-y-2">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <p className="text-xs font-semibold text-foreground/60 mb-3 uppercase tracking-wider">Technologies</p>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-mono bg-primary/10 text-primary/80 border border-primary/30 rounded-md group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const ServicesSection = memo(() => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = headerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('in-view');
        } else if (entry.boundingClientRect.top > 0) {
          element.classList.remove('in-view');
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, []);

  return (
    <section id="services" className="relative py-20 overflow-hidden" aria-label="Services">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-30" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="section-container max-w-6xl mx-auto relative">
        {/* Header */}
        <header ref={headerRef} className="mb-16 text-center scroll-animate slide-up">
          <span className="inline-block text-primary font-mono text-sm uppercase tracking-[0.3em] mb-4 backdrop-blur-sm bg-primary/10 px-4 py-2 rounded-full border border-primary/30">
            What I Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-primary/70 bg-clip-text text-transparent">
            Services & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto backdrop-blur-sm bg-background/30 p-4 rounded-xl border border-border/30">
            I deliver comprehensive solutions that transform your ideas into high-performing, scalable applications.
          </p>
        </header>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default ServicesSection;
