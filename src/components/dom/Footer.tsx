import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      label: 'GitHub', 
      href: 'https://github.com/SARVJEETinnovates', 
      icon: FaGithub,
      color: 'hover:text-[#333] dark:hover:text-white'
    },
    { 
      label: 'LinkedIn', 
      href: 'https://www.linkedin.com/in/sarvjeetyadav2969/', 
      icon: FaLinkedin,
      color: 'hover:text-[#0077b5]'
    },
    { 
      label: 'Email', 
      href: 'mailto:sarvjeetyadav2969@gmail.com', 
      icon: FaEnvelope,
      color: 'hover:text-[#EA4335]'
    },
  ];

  return (
    <footer role="contentinfo" className="relative py-16 px-6 border-t border-primary/20 bg-gradient-to-t from-background via-background to-transparent overflow-hidden" aria-label="Site footer">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Enhanced Logo */}
          <motion.a
            href="#"
            className="group font-display font-bold text-2xl text-foreground hover:text-primary transition-all duration-300 relative"
            whileHover={{ scale: 1.05 }}
          >
            <span className="relative z-10">SY<span className="text-primary group-hover:animate-pulse">.</span></span>
            <div className="absolute inset-0 bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>

          <div className="flex items-center gap-6">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative text-muted-foreground transition-all duration-300 ${link.color} hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.5)]`}
                  aria-label={link.label}
                >
                  <div className="p-3 rounded-lg bg-muted/20 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                </motion.a>
              );
            })}
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/30">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(204,255,0,0.8)]" />
              <span className="text-sm text-foreground font-medium whitespace-nowrap">
                Available for work
              </span>
            </div>
            <p className="text-muted-foreground text-sm font-mono">
              © {currentYear} Sarvjeet Yadav
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
