import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Printer, Activity, MousePointer2, Info, ChevronRight } from 'lucide-react';
import ModelViewer from './ModelViewer';

const projectData = {
  '3d-modeling': {
    title: '3D Modeling Projects',
    description: 'Precision-engineered CAD models and assemblies showcasing advanced design capabilities.',
    icon: Box,
    projects: [
      {
        id: 1,
        title: 'Robotic Arm Assembly',
        modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/ToyCar/glTF-Binary/ToyCar.glb', 
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80',
        challenge: 'Design a 6-DOF robotic arm with high precision repeatability for manufacturing applications.',
        solution: 'Developed parametric SolidWorks model with integrated motion studies and interference detection.',
        tags: ['SolidWorks', 'Motion Analysis', 'GD&T'],
      },
      {
        id: 2,
        title: 'Turbine Blade Design',
        // Cloudinary STL Link
        modelUrl: 'https://res.cloudinary.com/dwrts9bjq/raw/upload/v1765767653/Car_ptg3re.stl', 
        image: 'https://d2n4wb9orp1vta.cloudfront.net/cms/brand/CW/2020-CW/0920-cw-fod-ACTblade-drawing1.jpg;maxWidth=720',
        challenge: 'Create aerodynamically optimized turbine blade geometry for improved efficiency.',
        solution: 'Utilized surface modeling techniques and CFD-driven optimization to achieve 12% efficiency gain.',
        tags: ['CATIA', 'Surface Modeling', 'CFD'],
      },
      {
        id: 3,
        title: 'Electric Motor Housing',
        modelUrl: 'https://res.cloudinary.com/dwrts9bjq/image/upload/v1765768811/mwt_b-type_a0ursy.glb',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
        challenge: 'Design thermally efficient motor housing with integrated cooling channels.',
        solution: 'Implemented conformal cooling passages and topology-optimized ribbing structure.',
        tags: ['NX Siemens', 'Thermal Design', 'DFM'],
      },
      {
        id: 4,
        title: 'Precision Gearbox',
        modelUrl: 'https://res.cloudinary.com/dwrts9bjq/raw/upload/v1765767653/Car_ptg3re.stl',
        image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80',
        challenge: 'Model high-precision planetary gearbox for aerospace actuator.',
        solution: 'Created fully parametric assembly with gear tooth profiles and tolerance stackup analysis.',
        tags: ['SolidWorks', 'Gear Design', 'Tolerancing'],
      },
    ],
  },
  '3d-printing': {
    title: '3D Printing Projects',
    description: 'Additive manufacturing solutions pushing the boundaries of design freedom and rapid prototyping.',
    icon: Printer,
    projects: [
      {
        id: 1,
        title: 'Lattice Structure Optimization',
        modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/SheenChair/glTF-Binary/SheenChair.glb',
        image: 'https://images.unsplash.com/photo-1631378482655-f5dba44b5cd4?w=600&q=80',
        challenge: 'Develop lightweight structural components while maintaining strength requirements.',
        solution: 'Designed gyroid lattice structures using nTopology, achieving 60% weight reduction.',
        tags: ['nTopology', 'DMLS', 'Lightweighting'],
      },
      {
        id: 2,
        title: 'Custom Medical Implants',
        image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80',
        challenge: 'Create patient-specific orthopedic implants from CT scan data.',
        solution: 'Developed workflow for DICOM processing to titanium SLM printing with porous surfaces.',
        tags: ['Medical', 'Titanium SLM', 'Biomedical'],
      },
      {
        id: 3,
        title: 'Conformal Cooling Molds',
        image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=600&q=80',
        challenge: 'Reduce injection molding cycle time with improved thermal management.',
        solution: 'Printed mold inserts with conformal cooling channels, reducing cycle time by 40%.',
        tags: ['DMLS', 'Injection Molding', 'Thermal'],
      },
      {
        id: 4,
        title: 'Aerospace Bracket Redesign',
        image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=600&q=80',
        challenge: 'Redesign legacy bracket for AM production while meeting flight certification.',
        solution: 'Topology-optimized design with 45% weight savings, certified for flight use.',
        tags: ['Topology Optimization', 'Aerospace', 'Certification'],
      },
    ],
  },
  fea: {
    title: 'Finite Element Analysis',
    description: 'Advanced simulation and analysis ensuring structural integrity and optimal performance.',
    icon: Activity,
    projects: [
      {
        id: 1,
        title: 'Crash Simulation Analysis',
        image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80',
        challenge: 'Validate vehicle structure under NCAP frontal impact requirements.',
        solution: 'Conducted explicit dynamic analysis in LS-DYNA with material failure modeling.',
        tags: ['LS-DYNA', 'Crash Analysis', 'Automotive'],
      },
      {
        id: 2,
        title: 'Thermal-Structural Coupling',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80',
        challenge: 'Analyze spacecraft component under orbital thermal cycling conditions.',
        solution: 'Performed coupled thermal-structural analysis in ANSYS with orbital heat flux inputs.',
        tags: ['ANSYS', 'Thermal', 'Aerospace'],
      },
      {
        id: 3,
        title: 'Fatigue Life Prediction',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
        challenge: 'Predict service life of rotating machinery shaft under cyclic loading.',
        solution: 'Applied stress-life approach with rainflow counting and Miner\'s rule accumulation.',
        tags: ['Abaqus', 'Fatigue', 'Durability'],
      },
      {
        id: 4,
        title: 'Modal Vibration Study',
        image: 'https://images.unsplash.com/photo-1504222490345-c075b6008014?w=600&q=80',
        challenge: 'Characterize natural frequencies of satellite deployable antenna.',
        solution: 'Conducted modal analysis and random vibration response for launch qualification.',
        tags: ['ANSYS', 'Modal Analysis', 'Random Vibration'],
      },
      {
        id: 5,
        title: 'Modal Vibration Study',
        image: 'https://images.unsplash.com/photo-1504222490345-c075b6008014?w=600&q=80',
        challenge: 'Characterize natural frequencies of satellite deployable antenna.',
        solution: 'Conducted modal analysis and random vibration response for launch qualification.',
        tags: ['ANSYS', 'Modal Analysis', 'Random Vibration'],
      },
       {
        id: 6,
        title: 'Modal Vibration Study',
        image: 'https://images.unsplash.com/photo-1504222490345-c075b6008014?w=600&q=80',
        challenge: 'Characterize natural frequencies of satellite deployable antenna.',
        solution: 'Conducted modal analysis and random vibration response for launch qualification.',
        tags: ['ANSYS', 'Modal Analysis', 'Random Vibration'],
      },
    ],
  },
};

export default function ProjectsView({ category }) {
  const data = projectData[category];
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    if (data?.projects?.length > 0) {
      setActiveProject(data.projects[0]);
    }
  }, [category, data]);

  if (!data || !activeProject) return null;

  const Icon = data.icon;

  return (
    <section className="min-h-screen pt-32 pb-20 bg-[#F1EAD6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-[#00416B] flex items-center justify-center shadow-lg shadow-[#00416B]/20">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-[#00416B]">
                {data.title}
              </h1>
              <p className="text-[#00416B]/60 mt-2 text-lg">{data.description}</p>
            </div>
          </div>
        </motion.div>

        {/* --- SPOTLIGHT SECTION (Active Project) --- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-16 bg-white rounded-[2rem] shadow-xl shadow-[#00416B]/5 border border-[#00416B]/5 overflow-hidden"
          >
            <div className="grid lg:grid-cols-5 min-h-[500px]">
              
              {/* Left Column: Visual (Model or Image) */}
              <div className="lg:col-span-3 bg-gray-50 relative border-b lg:border-b-0 lg:border-r border-[#00416B]/5">
                {activeProject.modelUrl ? (
                  <div className="w-full h-full min-h-[400px]">
                     {/* Interactive Hint */}
                    <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-[#00416B] flex items-center gap-2 shadow-sm pointer-events-none">
                        <MousePointer2 className="w-4 h-4" />
                        Interactive 3D Model
                    </div>
                    {/* KEY PROP ADDED HERE TO FORCE RELOAD ON MODEL CHANGE */}
                    <ModelViewer 
                        key={activeProject.modelUrl}
                        url={activeProject.modelUrl} 
                        autoRotate={true}
                        autoRotateSpeed={0.8}
                    />
                  </div>
                ) : (
                  <div className="w-full h-full relative group">
                    <img 
                      src={activeProject.image} 
                      alt={activeProject.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00416B]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
              </div>

              {/* Right Column: Project Details */}
              <div className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-center">
                <div className="mb-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00416B]/5 rounded-full text-[#00416B] text-xs font-bold uppercase tracking-wider mb-4">
                        <Info className="w-3 h-3" />
                        Selected Project
                    </div>
                    <h2 className="text-3xl font-bold text-[#00416B] mb-6 leading-tight">
                        {activeProject.title}
                    </h2>
                    
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-bold uppercase text-[#00416B]/40 mb-2">The Challenge</h3>
                            <p className="text-[#00416B]/80 leading-relaxed">
                                {activeProject.challenge}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold uppercase text-[#00416B]/40 mb-2">The Solution</h3>
                            <p className="text-[#00416B]/80 leading-relaxed">
                                {activeProject.solution}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-[#00416B]/5">
                    <h3 className="text-sm font-bold uppercase text-[#00416B]/40 mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                        {activeProject.tags.map((tag) => (
                            <span
                            key={tag}
                            className="px-3 py-1.5 bg-[#F1EAD6] rounded-md text-xs font-bold text-[#00416B]"
                            >
                            {tag}
                            </span>
                        ))}
                    </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>


        {/* --- PROJECT GALLERY --- */}
        <div className="mb-6 flex items-center justify-between">
            <h3 className="text-2xl font-bold text-[#00416B]">All Projects</h3>
            <span className="text-[#00416B]/50 text-sm">Select a project to view details</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.projects.map((project) => (
            <motion.button
              key={project.id}
              onClick={() => {
                setActiveProject(project);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className={`text-left group relative bg-white rounded-2xl overflow-hidden shadow-lg border-2 transition-all duration-300 h-full flex flex-col
                ${activeProject.id === project.id 
                    ? 'border-[#00416B] ring-4 ring-[#00416B]/10' 
                    : 'border-transparent hover:border-[#00416B]/30'
                }`}
            >
              <div className="h-40 relative overflow-hidden bg-gray-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {project.modelUrl && (
                    <div className="absolute top-2 right-2 bg-[#00416B] text-white p-1.5 rounded-lg shadow-lg">
                        <Box className="w-4 h-4" />
                    </div>
                )}
                {activeProject.id === project.id && (
                    <div className="absolute inset-0 bg-[#00416B]/80 flex items-center justify-center">
                        <span className="text-white font-bold text-sm tracking-widest uppercase">Viewing</span>
                    </div>
                )}
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h4 className={`font-bold text-lg mb-2 leading-tight ${activeProject.id === project.id ? 'text-[#00416B]' : 'text-[#00416B]/80'}`}>
                    {project.title}
                </h4>
                <div className="mt-auto flex items-center text-xs font-bold text-[#00416B]/50 group-hover:text-[#00416B] transition-colors">
                    View Details <ChevronRight className="w-3 h-3 ml-1" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
