import { Suspense } from 'react';
import Navigation from '@/components/dom/Navigation';
import HeroText from '@/components/dom/HeroText';
import BentoGrid from '@/components/dom/BentoGrid';
import SkillsSection from '@/components/dom/SkillsSection';
import StatsSection from '@/components/dom/StatsSection';
import ContactSection from '@/components/dom/ContactSection';
import Footer from '@/components/dom/Footer';
import BackToTop from '@/components/dom/BackToTop';
import KeyboardShortcuts from '@/components/dom/KeyboardShortcuts';
import ScrollProgress from '@/components/dom/ScrollProgress';
import SectionDivider from '@/components/dom/SectionDivider';
import FloatingParticles from '@/components/canvas/FloatingParticles';
import { SplineAnimation } from '@/components/canvas/SplineAnimation';

const Canvas3DFallback = () => (
  <div className="absolute inset-0 bg-gradient-radial from-muted/20 to-transparent" aria-hidden="true" />
);

const Index = () => {
  return (
    <>
      {/* Floating Particles Background */}
      <FloatingParticles />
      
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      {/* Keyboard Shortcuts */}
      <KeyboardShortcuts />
      
      {/* Semantic header with navigation */}
      <header role="banner">
        <Navigation />
      </header>

      {/* Main content area for SEO */}
      <main id="main-content" role="main">
        {/* Hero Section */}
        <section 
          id="hero" 
          className="relative h-screen overflow-hidden bg-gradient-to-b from-background via-background to-background/95"
          aria-label="Introduction"
        >
          {/* Background Spline - Interactive Layer with subtle fade */}
          <div className="absolute inset-0 z-0 animate-fade-in">
            <Suspense fallback={<Canvas3DFallback />}>
              <SplineAnimation scene="https://prod.spline.design/3yefatOWqMXP5p6l/scene.splinecode" />
            </Suspense>
          </div>
          
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-[5] pointer-events-none" />
          
          {/* Hero Text - On top but stays interactive */}
          <HeroText />
        </section>

        {/* Section Divider */}
        <SectionDivider variant="wave" />

        {/* Stats Section - NEW */}
        <StatsSection />
        
        {/* Section Divider */}
        <SectionDivider />

        {/* Projects Section */}
        <BentoGrid />
        
        {/* Section Divider */}
        <SectionDivider variant="dots" />

        {/* Skills Section */}
        <SkillsSection />
        
        {/* Section Divider */}
        <SectionDivider variant="wave" />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Semantic footer */}
      <Footer />
      
      {/* Back to Top Button */}
      <BackToTop />
    </>
  );
};

export default Index;
