import { skills } from '@/store/useStore';
import { memo, useEffect, useRef } from 'react';

const skillIcons: Record<string, string> = {
  sql: 'https://img.shields.io/badge/SQL-CC2927?style=for-the-badge&logo=microsoftsqlserver&logoColor=white',
  'rest-api': 'https://img.shields.io/badge/REST_API-FF6B6B?style=for-the-badge&logo=postman&logoColor=white',
  'docker-compose': 'https://img.shields.io/badge/Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white',
  'data-structures': 'https://img.shields.io/badge/Data_Structures-336791?style=for-the-badge&logo=python&logoColor=white',
  html5: 'https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white',
  css3: 'https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white',
  typescript: 'https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white',
  javascript: 'https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black',
  python: 'https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white',
  nodejs: 'https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white',
  express: 'https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white',
  react: 'https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black',
  nextjs: 'https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white',
  redux: 'https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white',
  vite: 'https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white',
  threejs: 'https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white',
  chartjs: 'https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white',
  tailwind: 'https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white',
  'material-ui': 'https://img.shields.io/badge/Material_UI-0081CB?style=for-the-badge&logo=mui&logoColor=white',
  mongodb: 'https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white',
  mysql: 'https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white',
  prisma: 'https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white',
  firebase: 'https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black',
  kafka: 'https://img.shields.io/badge/Kafka-231F20?style=for-the-badge&logo=apachekafka&logoColor=white',
  jwt: 'https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white',
  oauth2: 'https://img.shields.io/badge/OAuth_2.0-EB5424?style=for-the-badge&logo=auth0&logoColor=white',
  'passport.js': 'https://img.shields.io/badge/Passport.js-34E27A?style=for-the-badge&logo=passport&logoColor=white',
  jest: 'https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white',
  cypress: 'https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white',
  docker: 'https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white',
  kubernetes: 'https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white',
  helm: 'https://img.shields.io/badge/Helm-0F1689?style=for-the-badge&logo=helm&logoColor=white',
  'github-actions': 'https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white',
  aws: 'https://img.shields.io/badge/AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white',
  gcp: 'https://img.shields.io/badge/GCP-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white',
  nginx: 'https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white',
  prometheus: 'https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white',
  git: 'https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white',
  github: 'https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white',
  postman: 'https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white',
  vercel: 'https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white',
  jira: 'https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white',
  eslint: 'https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white',
  vscode: 'https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white',
};

const categories: Record<string, string[]> = {
  'Frontend Core': ['html5', 'css3', 'javascript', 'typescript'],
  'Frameworks & UI': ['react', 'nextjs', 'vite', 'tailwind', 'material-ui', 'redux', 'chartjs', 'threejs'],
  'Backend & DB': ['nodejs', 'express', 'python', 'rest-api', 'mongodb', 'mysql', 'prisma', 'firebase', 'sql'],
  'Auth & Testing': ['kafka', 'jwt', 'oauth2', 'passport.js', 'jest', 'cypress'],
  'DevOps & Tools': ['docker', 'docker-compose', 'kubernetes', 'helm', 'github-actions', 'aws', 'gcp', 'nginx', 'prometheus', 'git', 'github', 'postman', 'vercel', 'jira', 'eslint', 'vscode', 'data-structures'],
};

// Skill category with scroll animation
const SkillCategory = memo(({ categoryName, categorySkills, index }: { 
  categoryName: string; 
  categorySkills: typeof skills; 
  index: number 
}) => {
  const categoryRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = categoryRef.current;
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
    <div 
      ref={categoryRef} 
      className="group relative pl-8 md:pl-12 scroll-animate slide-up"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="absolute top-6 left-0 w-8 md:w-12 h-px bg-primary/20 border-t-2 border-dashed border-primary/20 group-hover:bg-primary/40 transition-all duration-300" />
      <div className="absolute -left-[9px] top-4 w-5 h-5 rounded-full border-4 border-background bg-primary shadow-[0_0_15px_rgba(204,255,0,0.5)] group-hover:shadow-[0_0_25px_rgba(204,255,0,0.8)] transition-all duration-300" />

      <div className="backdrop-blur-sm bg-background/20 p-6 rounded-xl border border-border/30 group-hover:border-primary/30 transition-all duration-300 group-hover:bg-background/30">
        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {categoryName}
          </span>
        </h3>

        <div className="flex flex-wrap gap-3 justify-start">
          {categorySkills.map((skill, idx) => (
            <div 
              key={skill.id} 
              className="transform hover:scale-110 transition-transform duration-300"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <img
                src={skillIcons[skill.id]}
                alt={skill.name}
                className="h-8 hover:drop-shadow-[0_0_10px_rgba(204,255,0,0.5)]"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

const SkillsSection = memo(() => {
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
    <section id="skills" className="relative py-20 overflow-hidden" aria-label="Technical Skills">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-30" />
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-5" />
      
      <div className="section-container max-w-5xl mx-auto relative">
        <header ref={headerRef} className="mb-16 text-center scroll-animate slide-up">
          <span className="inline-block text-primary font-mono text-sm uppercase tracking-[0.3em] mb-4 backdrop-blur-sm bg-primary/10 px-4 py-2 rounded-full border border-primary/30">
            Tech Arsenal
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-primary/70 bg-clip-text text-transparent">
            Technical Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto backdrop-blur-sm bg-background/30 p-4 rounded-xl border border-border/30">
            Comprehensive tech stack spanning frontend, backend, databases, and DevOps. 
            Proficient in modern JavaScript ecosystem with hands-on experience in AI/ML integration.
          </p>
        </header>

        <div className="relative border-l-2 border-dashed border-primary/20 ml-4 md:ml-10 space-y-12" role="list">
          {Object.entries(categories).map(([categoryName, categoryIds], index) => {
            const categorySkills = skills.filter(skill => categoryIds.includes(skill.id));
            
            if (categorySkills.length === 0) return null;

            return (
              <SkillCategory 
                key={categoryName} 
                categoryName={categoryName} 
                categorySkills={categorySkills} 
                index={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default SkillsSection;
