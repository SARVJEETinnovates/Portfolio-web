import { useState, useEffect, memo } from 'react';

const Navigation = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
    // { label: 'Resume', href: 'https://drive.google.com/file/d/1Zvinh6Fzt1iWPnoGvVM6WWIBrR_LOtZK/view?usp=sharing', external: true },
  ];

  const scrollToSection = (href: string, external?: boolean) => {
    if (external) {
      window.open(href, '_blank');
      return;
    }
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'py-4 bg-background/90 backdrop-blur-xl border-b border-primary/20 shadow-[0_4px_20px_rgba(204,255,0,0.1)]' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Enhanced Logo */}
          <a
            href="#"
            aria-label="Sarvjeet Yadav - Home"
            title="Go to homepage"
            className="group font-display font-bold text-2xl text-foreground hover:text-primary transition-all duration-300 relative"
          >
            <span className="relative z-10">SY<span className="text-primary group-hover:animate-pulse">.</span></span>
            <div className="absolute inset-0 bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href, link.external)}
                className="group relative text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </button>
            ))}
            <button
              onClick={() => scrollToSection('#contact')}
              className="px-6 py-2.5 text-sm bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg hover:shadow-[0_0_20px_rgba(204,255,0,0.4)] transition-all duration-300 font-semibold transform hover:scale-105"
            >
              Let's Talk
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:bg-primary/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span 
                className={`w-full h-0.5 bg-current origin-left transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[2px]' : ''}`}
              />
              <span 
                className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 scale-0' : ''}`}
              />
              <span 
                className={`w-full h-0.5 bg-current origin-left transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[2px]' : ''}`}
              />
            </div>
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-gradient-to-br from-background via-background to-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 animate-fade-in"
        >
          <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />
          {navLinks.map((link, idx) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href, link.external)}
              style={{ animationDelay: `${idx * 0.1}s` }}
              className="relative text-3xl font-display font-bold text-foreground hover:text-primary transition-all duration-300 animate-fade-in group"
            >
              {link.label}
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </button>
          ))}
        </div>
      )}
    </>
  );
});

export default Navigation;
