import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Linkedin, Box, Printer, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation({ currentView, setCurrentView }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projectItems = [
    { id: '3d-modeling', label: '3D Modeling', icon: Box },
    { id: '3d-printing', label: '3D Printing', icon: Printer },
    { id: 'fea', label: 'FEA Analysis', icon: Activity },
  ];

  const handleNavClick = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    setIsProjectsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-[#00416B]/5'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-10 h-10 bg-[#00416B] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">GS</span>
            </div>
            <span className="text-[#00416B] font-semibold text-lg hidden sm:block">
              Portfolio
            </span>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink
              active={currentView === 'home'}
              onClick={() => handleNavClick('home')}
            >
              Home
            </NavLink>

            {/* Projects Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                onMouseEnter={() => setIsProjectsOpen(true)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  currentView.startsWith('project')
                    ? 'bg-[#00416B] text-white'
                    : 'text-[#00416B] hover:bg-[#00416B]/10'
                }`}
              >
                Projects
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isProjectsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {isProjectsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    onMouseLeave={() => setIsProjectsOpen(false)}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl shadow-[#00416B]/10 border border-[#00416B]/5 overflow-hidden"
                  >
                    {projectItems.map((item, index) => (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleNavClick(`project-${item.id}`)}
                        className="w-full px-5 py-4 text-left text-[#00416B] hover:bg-[#F1EAD6] transition-colors flex items-center gap-3 group"
                      >
                        <item.icon className="w-5 h-5 text-[#00416B]/60 group-hover:text-[#00416B] transition-colors" />
                        <span className="font-medium">{item.label}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink
              active={currentView === 'contact'}
              onClick={() => handleNavClick('contact')}
            >
              Contact Me
            </NavLink>

            {/* LinkedIn Icon */}
            <a
              href="https://www.linkedin.com/in/gregory-simone/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 p-2.5 rounded-full bg-[#00416B]/10 text-[#00416B] hover:bg-[#00416B] hover:text-white transition-all duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#00416B]"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white rounded-2xl mb-4 shadow-xl overflow-hidden"
            >
              <div className="p-4 space-y-2">
                <MobileNavLink
                  active={currentView === 'home'}
                  onClick={() => handleNavClick('home')}
                >
                  Home
                </MobileNavLink>

                <div className="space-y-1">
                  <p className="px-4 py-2 text-sm font-semibold text-[#00416B]/60 uppercase tracking-wider">
                    Projects
                  </p>
                  {projectItems.map((item) => (
                    <MobileNavLink
                      key={item.id}
                      active={currentView === `project-${item.id}`}
                      onClick={() => handleNavClick(`project-${item.id}`)}
                      icon={item.icon}
                    >
                      {item.label}
                    </MobileNavLink>
                  ))}
                </div>

                <MobileNavLink
                  active={currentView === 'contact'}
                  onClick={() => handleNavClick('contact')}
                >
                  Contact Me
                </MobileNavLink>

                <a
                  href="https://www.linkedin.com/in/gregory-simone/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 text-[#00416B] hover:bg-[#00416B]/10 rounded-xl transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="font-medium">LinkedIn Profile</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

function NavLink({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
        active
          ? 'bg-[#00416B] text-white'
          : 'text-[#00416B] hover:bg-[#00416B]/10'
      }`}
    >
      {children}
    </button>
  );
}

function MobileNavLink({ children, active, onClick, icon: Icon }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-colors ${
        active
          ? 'bg-[#00416B] text-white'
          : 'text-[#00416B] hover:bg-[#00416B]/10'
      }`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
}
