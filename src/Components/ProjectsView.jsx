import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Printer,
  Activity,
  Info,
  ChevronRight,
  Cpu,
  FolderOpen,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import MediaCarousel from './MediaCarousel';

// --- Helper Component: Expandable Text ---
const ExpandableText = ({ text, limit = 250 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null;
  
  const shouldTruncate = text.length > limit;
  const displayText = isExpanded || !shouldTruncate ? text : text.slice(0, limit) + '...';

  return (
    <div>
      <p className="text-[#00416B]/80 leading-relaxed transition-all duration-300">
        {displayText}
      </p>
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-xs font-bold text-[#00416B] hover:text-[#00416B]/70 flex items-center gap-1 uppercase tracking-wider transition-colors"
        >
          {isExpanded ? (
            <>Read Less <ChevronUp className="w-3 h-3" /></>
          ) : (
            <>Read More <ChevronDown className="w-3 h-3" /></>
          )}
        </button>
      )}
    </div>
  );
};

// --- Updated Project Data with Captions ---
const projectData = {
  '3d-modeling': {
    title: '3D Modeling Projects',
    description: 'Precision-engineered CAD models and assemblies showcasing advanced design capabilities.',
    icon: Box,
    projects: [
      {
        id: 1,
        title: 'Interchangeable Lithophane Lightbox',
        media: [
          { 
            type: 'model', 
            url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/ToyCar/glTF-Binary/ToyCar.glb', 
            thumb: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=600&q=80',
            caption: 'Interactive 3D view of the assembled lightbox mechanism.'
          },
          { 
            type: 'image', 
            src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80', 
            thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&q=80',
            caption: 'The final 3D printed assembly glowing in low light.'
          },
        ],
        context: 'This was a gift I made for a friend. I wanted something cool that could be put on a desk, shelf, or counter-top for display. The end result evoked a reaction of "One of the best gifts I\'ve ever gotten," which validated the design effort put into the aesthetics and functionality.',
        challenge: 'The primary challenge was designing a lightbox to display a lithophane portrait that allowed for easy swapping of images. It needed to be interchangeable while preventing light leakage from seamless openings. Additionally, the battery pack had to be accessible for replacement without compromising the sleek visual design.',
        solution: 'I used SolidWorks to design the model and 3D printing for rapid iteration. I developed a custom snap-fit mechanism to connect the two parts of the box, ensuring zero light leakage. A sliding track system was engineered to allow lithophanes to be manually inserted and removed. I also integrated electrical components to activate LEDs via a discreet switch and designed a hidden door for quick battery replacement.',
        tags: ['SolidWorks', '3D Printing', 'Rapid Prototyping'],
      },
      {
        id: 2,
        title: 'Lunar Rover (WIP)',
        media: [
          { 
            type: 'model', 
            url: 'https://res.cloudinary.com/dwrts9bjq/raw/upload/v1765767653/Car_ptg3re.stl', 
            thumb: 'https://images.unsplash.com/photo-1541562232579-512a21360020?w=600&q=80',
            caption: 'Chassis design v2.4 showing suspension mounting points.'
          },
          { 
            type: 'image', 
            src: 'https://images.unsplash.com/photo-1614728853913-6591d00104e7?w=1200&q=80', 
            caption: 'Wheel traction testing in simulated regolith sand.' 
          },
        ],
        context: 'Working in the UMass ASME chapter for this project. Currently, I serve as the co-captain for the chassis sub-team, overseeing the integration of suspension and drive systems.',
        challenge: 'We need to develop a lunar rover for an upcoming NASA-sponsored competition. The critical requirement is to develop wheels that support 20+kg of weight per tire while maintaining traction on loose, sand-like terrain (regolith) without sinking or slipping.',
        solution: 'I led the 3D modeling and iteration of the wheel designs. We utilized 3D-printed flexible materials (TPU) to test various tread patterns. The final design incorporates a compliant structure that deforms slightly to increase surface area contact on loose terrain.',
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
        title: 'Assorted Prints',
        media: [
          { 
            type: 'image', 
            src: 'https://images.unsplash.com/photo-1631541909061-71e349d1f203?w=1200&q=80', 
            caption: 'Collection of functional mechanical parts printed in PETG.' 
          },
        ],
        context: 'Here is an assortment of 3D printed parts I have made for fun or testing. These range from functional household repairs to complex mechanical prototypes.',
        challenge: 'The main challenge is often troubleshooting the printer to create a functional part using a variety of materials (PLA, ABS, PETG, TPU). Issues like bed adhesion, layer warping, and nozzle clogging require constant adjustment.',
        solution: 'I conducted extensive research and testing to create custom print profiles for each material. This involved calibrating retraction settings, temperatures, and print speeds to ensure high success rates and dimensional accuracy.',
        tags: ['3D Printing', 'Rapid Prototyping', 'Problem Solving', 'Research'],
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
        title: 'Lunar Rover Wheel Testing (WIP)',
        media: [
          { 
            type: 'image', 
            src: 'https://images.unsplash.com/photo-1581092921461-eab62456a9a0?w=1200&q=80', 
            caption: 'Stress distribution analysis under 500N load.' 
          },
        ],
        context: 'Working in UMass ASME chapter for this project. I am currently working on the wheel design, feasibility, and testing.',
        tags: ['ANSYS', 'SolidWorks', 'Testing'],
      },
    ],
  },
  electrical: {
    title: 'Electrical Projects',
    icon: Cpu,
    projects: [
      {
        id: 1,
        title: 'Robotic Car',
        media: [
          { 
            type: 'model', 
            url: 'https://res.cloudinary.com/dwrts9bjq/raw/upload/v1765767653/Car_ptg3re.stl', 
            thumb: 'https://images.unsplash.com/photo-1535378437832-3815b40acd5e?w=600&q=80' 
          },
          { 
            type: 'image', 
            src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80' 
          },
        ],
        context: 'Electrical and embedded design for a small robotic car. This project focused on integrating sensors with motor control logic.',
        tags: ['Embedded', 'Motors', 'PCBs'],
      },
    ],
  },
  other: {
    title: 'Other Projects',
    description: 'Various creative and technical projects.',
    icon: FolderOpen,
    projects: [
      {
        id: 1,
        title: 'Droid404 (Game)',
        media: [
          { type: 'image', src: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1200&q=80', caption: 'Gameplay screenshot showing level design.' },
        ],
        context: 'This project was made during the 2020 Covid Pandemic with one of my closest friends. We worked many hours per day, balancing extracurriculars, school, and Droid404 for over 2 years until the day of the launch.',
        tags: ['Programming', 'Teamwork', 'Design'],
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

  // Helper to pick a card preview
  const getPreview = (project) => {
    const img = project.media?.find((m) => m.type === 'image');
    if (img) return img.src;
    const model = project.media?.find((m) => m.type === 'model');
    if (model && model.thumb) return model.thumb;
    return 'https://via.placeholder.com/800x600?text=Project';
  };

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
              <h1 className="text-4xl lg:text-5xl font-bold text-[#00416B]">{data.title}</h1>
              <p className="text-[#00416B]/60 mt-2 text-lg">{data.description}</p>
            </div>
          </div>
        </motion.div>

        {/* Spotlight (active project) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="mb-16 bg-white rounded-[2rem] shadow-xl shadow-[#00416B]/5 border border-[#00416B]/5 overflow-hidden">
              <div className="grid lg:grid-cols-5 min-h-[500px]">
                {/* Left Column: Media Carousel */}
                <div className="lg:col-span-3 bg-gray-50 relative border-b lg:border-b-0 lg:border-r border-[#00416B]/5">
                  <div className="w-full h-full min-h-[400px]">
                    <MediaCarousel media={activeProject.media} />
                  </div>
                </div>

                {/* Right Column: Project Details */}
                <div className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-center">
                  <div className="mb-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00416B]/5 rounded-full text-[#00416B] text-xs font-bold uppercase tracking-wider mb-4">
                      <Info className="w-3 h-3" />
                      Selected Project
                    </div>
                    <h2 className="text-3xl font-bold text-[#00416B] mb-6 leading-tight">{activeProject.title}</h2>

                    <div className="space-y-6">
                      {/* Context */}
                      <div>
                        <h3 className="text-sm font-bold uppercase text-[#00416B]/40 mb-2">The Context</h3>
                        <ExpandableText text={activeProject.context} />
                      </div>

                      {/* Challenge */}
                      {activeProject.challenge && (
                        <div>
                          <h3 className="text-sm font-bold uppercase text-[#00416B]/40 mb-2">The Challenge</h3>
                          <ExpandableText text={activeProject.challenge} />
                        </div>
                      )}

                      {/* Solution */}
                      {activeProject.solution && (
                        <div>
                          <h3 className="text-sm font-bold uppercase text-[#00416B]/40 mb-2">The Solution</h3>
                          <ExpandableText text={activeProject.solution} />
                        </div>
                      )}

                      {/* Tags */}
                      <div>
                        <h3 className="text-sm font-bold uppercase text-[#00416B]/40 mb-2">Tags</h3>
                        <div className="flex gap-2 flex-wrap">
                          {activeProject.tags?.map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-[#00416B]/5 text-[#00416B] text-xs rounded-full font-bold">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
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
                ${activeProject.id === project.id ? 'border-[#00416B] ring-4 ring-[#00416B]/10' : 'border-transparent hover:border-[#00416B]/30'}
              `}
            >
              <div className="h-40 relative overflow-hidden bg-gray-100">
                <img
                  src={getPreview(project)}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {project.media?.some((m) => m.type === 'model') && (
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
                <h4 className={`font-bold text-lg mb-2 leading-tight ${activeProject.id === project.id ? 'text-[#00416B]' : 'text-[#00416B]/80'}`}>{project.title}</h4>
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
