import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Calendar, ArrowRight } from 'lucide-react';

const experiences = [
  {
    title: 'Undergraduate Researcher',
    company: 'Computational Design Research Grouup',
    period: 'Winter 2025 - Present',
    location: 'Amherst, MA',
    description: 'Integrating AI, physics, and MATLAB to simulate the optimal topological structures for various aerospace, manufacturing, and robotic parts.',
    achievements: [
      'Read many research papers on topology',
      'Learning MATLAB and Python to develop the framework for the research',
    ],
  },
  {
    title: 'Teaching Asistant',
    company: 'Univerity of Massachusetts, Amherst',
    period: 'Fall 20255',
    location: 'Amherst, MA',
    description: 'Teaching Assistant for ECE 361 - Fundamentals of Electrical Engineering - under Professor David McLaughlin.',
    achievements: [
      'Coordinated with the professor about course expectations, grading, and support materials',
      'Assist students with homework, projects, and concept clarification',
    ],
  },
  {
    title: 'Manufacturing Engineer Intern',
    company: 'Schneider Electric',
    period: 'Summer 2025',
    location: 'Foxboro, MA',
    description: 'Worked with vendors and cross-functional teams to design and implement mechanical solutions, program and validate laser engravers, and support R&D with CAD design, prototyping, and process documentation to improve manufacturing efficiency.',
    achievements: [
      'Led technical discussions and coordinated with external vendors (Cognex, Keyence, Vention) for equipment procurement',
      'Designed mechanical solutions using CAD, including hydraulic lift bars, locking mechanisms, and 3D-printed prototypes',
      'Programmed and validated Gauge/Differential Pressure laser engravers and designed custom support tooling',
      'Authored technical work instructions in collaboration with R&D to ensure production line usability',
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section className="py-32 bg-[#00416B]/[0.02] relative">
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
            Career Journey
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#00416B] mb-6">
            Work Experience
          </h2>
          <p className="text-[#00416B]/70 max-w-2xl mx-auto text-lg">
            A track record of innovation and impact at leading engineering organizations.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00416B]/20 via-[#00416B]/40 to-[#00416B]/20 hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Node */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#00416B] border-4 border-[#F1EAD6] shadow-lg z-10" />

                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-3xl p-8 shadow-xl shadow-[#00416B]/5 border border-[#00416B]/5"
                  >
                    {/* Header */}
                    <div className={`flex items-start gap-4 mb-6 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <div className="w-14 h-14 rounded-2xl bg-[#00416B]/10 flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-7 h-7 text-[#00416B]" />
                      </div>
                      <div className={index % 2 === 0 ? 'md:text-right' : ''}>
                        <h3 className="text-xl font-bold text-[#00416B]">{exp.title}</h3>
                        <p className="text-[#00416B]/70 font-medium">{exp.company}</p>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className={`flex flex-wrap gap-4 mb-6 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F1EAD6] rounded-full text-sm text-[#00416B]">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </span>
                      <span className="px-3 py-1.5 bg-[#00416B]/10 rounded-full text-sm text-[#00416B]">
                        {exp.location}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-[#00416B]/70 mb-6 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <div
                          key={i}
                          className={`flex items-center gap-2 text-sm ${
                            index % 2 === 0 ? 'md:flex-row-reverse' : ''
                          }`}
                        >
                          <ArrowRight className="w-4 h-4 text-[#00416B]/40 flex-shrink-0" />
                          <span className="text-[#00416B]/80">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
