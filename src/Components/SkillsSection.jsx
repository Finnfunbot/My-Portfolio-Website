import React from 'react';
import { motion } from 'framer-motion';
import { 
  PenTool, 
  Box, 
  Cpu, 
  BarChart3, 
  Ruler, 
  FileCheck,
  Layers,
  Target
} from 'lucide-react';

const skills = [
  {
    name: 'SolidWorks',
    category: 'CAD',
    level: 60,
    icon: Box,
    color: 'from-red-500 to-orange-500',
  },
  {
    name: 'Creo Parametric',
    category: 'CAD',
    level: 75,
    icon: PenTool,
    color: 'from-red-600 to-red-400',
  },
  {
    name: 'ANSYS',
    category: 'FEA',
    level: 53,
    icon: BarChart3,
    color: 'from-yellow-500 to-amber-500',
  },
  {
    name: 'Rapid Prototyping',
    category: 'Prototyping',
    level: 80,
    icon: Ruler,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: '3D Printing',
    category: 'Prototyping',
    level: 94,
    icon: Layers,
    color: 'from-blue-600 to-indigo-500',
  },
  {
    name: 'MATLAB',
    category: 'Coding',
    level: 65,
    icon: Target,
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Python',
    category: 'Coding',
    level: 58,
    icon: FileCheck,
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Collaborative Work',
    category: 'Analysis',
    level: 88,
    icon: Cpu,
    color: 'from-orange-500 to-red-500',
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 bg-[#00416B]/10 rounded-full text-sm font-medium text-[#00416B] mb-4">
            Technical Expertise
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#00416B] mb-6">
            Skills & Proficiencies
          </h2>
          <p className="text-[#00416B]/70 max-w-2xl mx-auto text-lg">
            Comprehensive expertise across industry-leading engineering software 
            and methodologies, delivering precision and innovation.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg shadow-[#00416B]/5 border border-[#00416B]/5 h-full transition-all duration-300 group-hover:shadow-xl group-hover:shadow-[#00416B]/10">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${skill.color} p-3 mb-6 shadow-lg`}>
                  <skill.icon className="w-full h-full text-white" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#00416B]/50">
                    {skill.category}
                  </span>
                  <h3 className="text-xl font-bold text-[#00416B]">
                    {skill.name}
                  </h3>

                  {/* Progress Bar */}
                  <div className="pt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#00416B]/60">Proficiency</span>
                      <span className="font-semibold text-[#00416B]">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-[#F1EAD6] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-[#00416B]/60 mb-6">Also proficient in:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Problem Solving', 'Circuitry', 'Communication', 'Arduino', 'Python', 'Teamwork'].map((skill) => (
              <span
                key={skill}
                className="px-5 py-2.5 bg-white rounded-full text-sm font-medium text-[#00416B] shadow-md shadow-[#00416B]/5 border border-[#00416B]/5 hover:bg-[#00416B] hover:text-white transition-all duration-300 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
