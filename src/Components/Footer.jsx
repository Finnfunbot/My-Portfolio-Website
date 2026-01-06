import React from 'react';
import { Linkedin, Mail, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer({ setCurrentView }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#00416B] text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <button
              onClick={() => {
                setCurrentView('home');
                scrollToTop();
              }}
              className="flex items-center gap-3 mb-4 mx-auto md:mx-0"
            >
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="font-bold text-lg">GS</span>
              </div>
              <span className="font-semibold text-lg">Portfolio</span>
            </button>
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <button
              onClick={() => {
                setCurrentView('home');
                scrollToTop();
              }}
              className="text-white/70 hover:text-white transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => {
                setCurrentView('project-3d-modeling');
                scrollToTop();
              }}
              className="text-white/70 hover:text-white transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => {
                setCurrentView('contact');
                scrollToTop();
              }}
              className="text-white/70 hover:text-white transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Social & Back to Top */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/gregory-simone/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:gregory@simonefamily.net"
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-white text-[#00416B] hover:bg-white/90 transition-colors ml-4"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}