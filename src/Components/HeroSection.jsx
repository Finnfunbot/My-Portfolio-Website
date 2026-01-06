import React from 'react';
import { motion } from 'framer-motion';
import profileImg from '../assets/Gerg.png'; // Adjust path if needed
import { Linkedin, ArrowDown, Cog, Settings, Wrench } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-20 -right-20 w-96 h-96 opacity-[0.03]"
        >
          <Cog className="w-full h-full text-[#00416B]" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] opacity-[0.03]"
        >
          <Settings className="w-full h-full text-[#00416B]" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#00416B]/10 rounded-full"
              >
                <Wrench className="w-4 h-4 text-[#00416B]" />
                <span className="text-sm font-medium text-[#00416B]">
                  Mechanical Engineer
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl lg:text-7xl font-bold text-[#00416B] leading-tight"
              >
                Engineering
                <br />
                <span className="text-[#00416B]/60">Excellence</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-[#00416B]/70 max-w-lg leading-relaxed"
              >
                Passionate mechanical engineer specializing in innovative design, 
                precision manufacturing, and cutting-edge simulation. Transforming 
                complex challenges into elegant, functional solutions.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4"
            >
              <a
                href="https://www.linkedin.com/in/gregory-simone/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#00416B] text-white rounded-full font-medium hover:bg-[#00416B]/90 transition-all duration-300 shadow-lg shadow-[#00416B]/20 hover:shadow-xl hover:shadow-[#00416B]/30 hover:-translate-y-0.5"
              >
                <Linkedin className="w-5 h-5" />
                Connect on LinkedIn
              </a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="p-4 rounded-full border-2 border-[#00416B]/20 text-[#00416B] hover:border-[#00416B] hover:bg-[#00416B]/5 transition-all duration-300"
              >
                <ArrowDown className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-[#00416B]/10"
            >
              {[
                { value: '8+', label: 'Years Experience' },
                { value: '50+', label: 'Projects Completed' },
                { value: '15+', label: 'Patents Filed' },
              ].map((stat, index) => (
                <div key={index}>
                  <p className="text-3xl font-bold text-[#00416B]">{stat.value}</p>
                  <p className="text-sm text-[#00416B]/60">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Abstract Engineering Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square">
              {/* Main circular element */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-[#00416B] to-[#00416B]/80 shadow-2xl shadow-[#00416B]/30">
                {/* Inner rings */}
                <div className="absolute inset-8 rounded-full border-4 border-white/20" />
                <div className="absolute inset-16 rounded-full border-2 border-white/10" />
                
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Profile Image Container */}
                    <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white/30 shadow-inner relative z-10">
                    <img 
                        src={profileImg} 
                        alt="Profile" 
                        className="w-full h-full object-cover" 
                    />
                    </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-12 right-12 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center"
              >
                <Settings className="w-8 h-8 text-[#00416B]" />
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-12 left-12 w-20 h-20 bg-[#F1EAD6] rounded-2xl shadow-xl flex items-center justify-center border border-[#00416B]/10"
              >
                <Wrench className="w-10 h-10 text-[#00416B]" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}