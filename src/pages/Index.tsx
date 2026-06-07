import { Suspense, lazy } from 'react';
import Navigation from '@/components/dom/Navigation';
import HeroText from '@/components/dom/HeroText';
import BentoGrid from '@/components/dom/BentoGrid';
import SkillsSection from '@/components/dom/SkillsSection';
import ContactSection from '@/components/dom/ContactSection';
import Footer from '@/components/dom/Footer';
import { SplineAnimation } from '@/components/canvas/SplineAnimation';

const Canvas3DFallback = () => (
  <div className="absolute inset-0 bg-gradient-radial from-muted/20 to-transparent" aria-hidden="true" />
);

const Index = () => {
  return (
    <>
      {/* Semantic header with navigation */}
      <header role="banner">
        <Navigation />
      </header>

      {/* Main content area for SEO */}
      <main id="main-content" role="main">
        {/* Hero Section */}
        <section 
          id="hero" 
          className="relative h-screen overflow-hidden bg-background"
          aria-label="Introduction"
        >
          {/* Background Spline - Interactive Layer */}
          <div className="absolute inset-0 z-0">
            <Suspense fallback={<Canvas3DFallback />}>
              <SplineAnimation scene="https://prod.spline.design/3yefatOWqMXP5p6l/scene.splinecode" />
            </Suspense>
          </div>
          
          {/* Hero Text - On top but stays interactive */}
          <HeroText />
        </section>

        {/* Projects Section */}
        <BentoGrid />

        {/* Skills Section */}
        <SkillsSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Semantic footer */}
      <Footer />
    </>
  );
};

export default Index;
