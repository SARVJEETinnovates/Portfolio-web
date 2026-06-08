import { projects } from '@/store/useStore';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { memo, useEffect, useRef, useState } from 'react';

// Memoized project card with scroll animations and magnetic effect
const ProjectCard = memo(({ project, index }: { project: typeof projects[0]; index: number }) => {
  const cardRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('in-view');
        } else if (entry.boundingClientRect.top > 0) {
          // Only hide if element is BELOW viewport (scrolled back up past it)
          element.classList.remove('in-view');
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(element);
    return () => observer.unobserve(element);
  }, []);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    setMousePosition({ x: x * 0.1, y: y * 0.1 });
  };
  
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };
  
  const isEven = index % 2 === 0;
  
  return (
    <article 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`timeline-item scroll-animate ${isEven ? 'slide-in-left' : 'slide-in-right'}`}
      style={{ 
        animationDelay: `${index * 0.15}s`,
        transform: isHovered ? `translate(${mousePosition.x}px, ${mousePosition.y}px)` : 'translate(0, 0)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out'
      }}
    >
      <div className="timeline__content group relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
        
        {/* Glowing orb that follows mouse */}
        {isHovered && (
          <div 
            className="absolute w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none transition-opacity duration-300"
            style={{
              left: `${mousePosition.x * 5}px`,
              top: `${mousePosition.y * 5}px`,
              opacity: 0.5,
            }}
          />
        )}
        
        <h3 className="relative text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 mb-4 group-hover:scale-105 transition-transform duration-300">
          {project.title}
        </h3>
        
        <div className="relative flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 5).map((tech, idx) => (
            <span
              key={tech}
              style={{ animationDelay: `${idx * 0.1}s` }}
              className="px-3 py-1.5 text-xs font-mono bg-primary/10 backdrop-blur-sm border border-primary/30 rounded-full text-primary hover:bg-primary/20 hover:scale-105 transition-all duration-300 cursor-default"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-3 py-1.5 text-xs font-mono bg-muted/50 backdrop-blur-sm border border-border rounded-full text-muted-foreground">
              +{project.technologies.length - 5} more
            </span>
          )}
        </div>

        <hr className="border-border/50 opacity-50 mb-4" />
        
        <p className="relative text-muted-foreground leading-relaxed mb-6">
          {project.longDescription}
        </p>

        <div className="relative grid grid-cols-3 gap-4 mb-6 p-5 bg-gradient-to-br from-muted/40 to-muted/20 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="text-center group">
              <div className="text-lg font-display font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                {metric.value}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        <div className="relative flex gap-3">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl font-semibold hover:shadow-[0_0_20px_rgba(204,255,0,0.4)] transition-all duration-300 transform hover:scale-105"
            >
              <FaExternalLinkAlt className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              Live Demo
            </a>
          )}
        </div>
      </div>

      <figure className="timeline__image group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        <img 
          src={`/${project.image === 'nexorithm' ? 'Nexorithm.png' : project.image === 'drk-mttr' ? 'DRLMTTR.jpg' : project.image === 'job-portal' ? 'JOB_portal.jpg' : project.image === 'emware-ai' ? 'Emware.ai.jpg' : project.image === 'eats' ? 'Eats.png' : "Paul's.png"}`}
          alt={`${project.title} - ${project.description}. Built with ${project.technologies.slice(0, 3).join(', ')}`}
          title={project.title}
          loading="lazy"
          decoding="async"
          width="400"
          height="300"
          className={`w-full h-full ${
            project.image === 'eats' || project.image === 'pauls' ? 'object-contain' : 'object-cover'
          } group-hover:scale-110 transition-transform duration-700`}
        />
      </figure>
    </article>
  );
});

const BentoGrid = () => {
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
      { threshold: 0.1 }
    );
    
    observer.observe(element);
    return () => observer.unobserve(element);
  }, []);
  
  return (
    <section id="projects" className="section-container py-20 relative overflow-hidden" aria-label="Featured Projects">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-50" />
      
      <header ref={headerRef} className="relative mb-16 text-center scroll-animate slide-up">
        <span className="inline-block text-primary font-mono text-sm uppercase tracking-[0.3em] mb-4 backdrop-blur-sm bg-primary/10 px-4 py-2 rounded-full border border-primary/30" aria-hidden="true">
          Featured Work
        </span>
        <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-primary/70 bg-clip-text text-transparent">
          Projects & Portfolio
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto backdrop-blur-sm bg-background/30 p-4 rounded-xl border border-border/30">
          Building digital experiences that push the boundaries of web technology. 
          From AI-powered platforms to real-time applications, each project showcases modern full-stack development expertise.
        </p>
      </header>

      <div className="timeline max-w-5xl mx-auto" role="list" aria-label="Project showcase">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default memo(BentoGrid);
