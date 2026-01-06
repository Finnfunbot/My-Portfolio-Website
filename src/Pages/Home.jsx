import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation';
import HeroSection from '../Components/HeroSection';
import SkillsSection from '../Components/SkillsSection';
import ExperienceSection from '../Components/ExperienceSection';
import ProjectsView from '../Components/ProjectsView';
import ContactView from '../Components/ContactView';
import Footer from '../Components/Footer';

export default function Home() {
  const [currentView, setCurrentView] = useState('home');

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const renderContent = () => {
    if (currentView === 'home') {
      return (
        <>
          <HeroSection />
          <SkillsSection />
          <ExperienceSection />
        </>
      );
    }

    if (currentView.startsWith('project-')) {
      const category = currentView.replace('project-', '');
      return <ProjectsView category={category} />;
    }

    if (currentView === 'contact') {
      return <ContactView />;
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-[#F1EAD6]">
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      
      <main>
        {renderContent()}
      </main>

      <Footer setCurrentView={setCurrentView} />
    </div>
  );
}