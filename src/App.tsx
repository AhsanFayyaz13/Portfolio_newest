import { useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { NAV_LINKS, type NavLinkItem, type Project } from './data/portfolio';
import { getActiveSectionId } from './utils/portfolioLogic';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WorkSection } from './components/WorkSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';

export default function App() {
  const [activeSection, setActiveSection] = useState<NavLinkItem['id'] | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    let rafId: number | null = null;

    const updateActiveSection = () => {
      rafId = null;
      const offsets = NAV_LINKS.map((link) => {
        const element = document.getElementById(link.id);
        if (!element) return null;
        return {
          id: link.id,
          top: element.offsetTop,
        };
      }).filter((item): item is { id: NavLinkItem['id']; top: number } => item !== null);

      setActiveSection(getActiveSectionId(offsets, window.scrollY, 160));
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#0A0F1C] text-[#F8FAFC]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-[#2563EB] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to main content
        </a>

        <Navbar activeSection={activeSection} />

        <main id="main-content">
          <Hero />
          <WorkSection onSelectProject={setSelectedProject} />
          <AboutSection />
          <ExperienceSection />
          <ContactSection />
        </main>

        <Footer />

        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </MotionConfig>
  );
}
