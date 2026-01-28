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
  ChevronUp,
  PlayCircle // Added PlayCircle icon
} from 'lucide-react';
import MediaCarousel from './MediaCarousel';

// --- Helper Component: Expandable Text ---
const ExpandableText = ({ text, limit = 250 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null;
  
  const shouldTruncate = text.length > limit;

  return (
    <div className="relative">
      <motion.div
        initial={false}
        animate={{ 
          height: isExpanded || !shouldTruncate ? "auto" : 72 // ~3 lines (24px line-height * 3)
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="overflow-hidden relative"
      >
        <p className="text-[#00416B]/80 leading-relaxed">
          {text}
        </p>
        
        {/* Optional: Add a subtle fade-out gradient when collapsed */}
        {!isExpanded && shouldTruncate && (
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
        )}
      </motion.div>

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
// --- Updated Project Data with Videos & Captions ---
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
            type: 'image', 
            src: 'https://res.cloudinary.com/drjhgqwur/image/upload/IMG_6246_lw9sci', 
            thumb: 'https://res.cloudinary.com/drjhgqwur/image/upload/IMG_6246_lw9sci',
            caption: 'The final 3D printed assembly glowing in low light.'
          },
          { 
            type: 'image', 
            src: 'https://res.cloudinary.com/drjhgqwur/image/upload/IMG_6228_uo5pnt', 
            thumb: 'https://res.cloudinary.com/drjhgqwur/image/upload/IMG_6228_uo5pnt',
          },
          { 
            type: 'image', 
            src: 'https://res.cloudinary.com/drjhgqwur/image/upload/IMG_6253_bqmvpy', 
            thumb: 'https://res.cloudinary.com/drjhgqwur/image/upload/IMG_6253_bqmvpy',
          },
          { 
            type: 'image', 
            src: 'https://res.cloudinary.com/drjhgqwur/image/upload/IMG_6252_hjprtj', 
            thumb: 'https://res.cloudinary.com/drjhgqwur/image/upload/IMG_6252_hjprtj',
          },
          { 
            type: 'image', 
            src: 'https://res.cloudinary.com/drjhgqwur/image/upload/IMG_6214_bauzfq', 
            thumb: 'https://res.cloudinary.com/drjhgqwur/image/upload/IMG_6214_bauzfq',
            caption: 'Different iterations of the box, with slight tweaks in each'
          },
          { 
            type: 'image', 
            src: 'https://res.cloudinary.com/drjhgqwur/image/upload/Wireframe_ncd7k4', 
            thumb: 'https://res.cloudinary.com/drjhgqwur/image/upload/Wireframe_ncd7k4',
            caption: 'Wireframe view of the model'
          },
          { 
            type: 'model', 
            url: 'https://res.cloudinary.com/drjhgqwur/image/upload/v1769545401/Lightbox_Ass2_vthbbr.glb', 
            thumb: 'https://res.cloudinary.com/drjhgqwur/image/upload/v1769545378/Lightbox_SS_a65guy.png',
            caption: 'Interactive 3D view of the assembled lightbox mechanism.'
          },
        ],
        context: 'This was a gift I made for a friend. I wanted something cool that could be put on a desk, shelf, or counter-top for display. End result ended in a reaction of "One of the best gifts I\'ve ever gotten."',
        challenge: 'Design a lightbox to display a lithophane portrait. Must be interchangeable, prevent light leakage from seemless openings.',
        solution: 'Used SolidWorks to design the model, 3D printing to iterate. Developed a snap fit - to connect the two parts of the box - to prevent light leakage and visible seams on all sides. Made a track for lithophanes to be manually slid in for interchangeability. Designed a custom border for lithophanes to fit perfectly for the lightbox. Integrated electric components to activate LEDs when switch is pressed. The box design also allows for easy access to the battery pack, allowing for quick replacement of dead batteries.',
        tags: ['SolidWorks', '3D Printing', 'Rapid Prototyping'],
      },
      {
        id: 2,
        title: 'Lunar Rover (WIP)',
        media: [
          { 
            type: 'image', 
            src: 'https://res.cloudinary.com/drjhgqwur/image/upload/v1769556411/Screenshot_2026-01-27_182532_thopwb.png', 
            caption: '3D model of the wheel' 
          },
          { 
            type: 'image', 
            src: 'https://res.cloudinary.com/drjhgqwur/image/upload/v1769558272/copy_of_img_6396_owq6rl_dc9b58.jpg', 
            caption: '3D Printed version of the wheel' 
          },
          { 
            type: 'model', 
            url: 'https://res.cloudinary.com/drjhgqwur/image/upload/v1769556399/Curvy_Wheel_ssxe5z.glb', 
            thumb: 'https://res.cloudinary.com/drjhgqwur/image/upload/v1769556411/Screenshot_2026-01-27_182532_thopwb.png',
            caption: 'Chassis design v2.4 showing suspension mounting points.'
          },
        ],
        context: 'Working in UMass ASME chapter for this project. Currently the co-captain for the chassis sub-team.',
        challenge: 'Develop a lunar rover for an upcoming NASA sponsored competition. Devlop wheels to support 20+kg of weight per tire. Needs to have traction on loose terrain. ',
        solution: '3D model and iterate wheel designs. 3D printed models to test and iterate based on results.',
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
        title: 'Lunar Rover (WIP)',
        media: [
          { 
            type: 'image', 
            src: 'https://res.cloudinary.com/drjhgqwur/image/upload/v1769556411/Screenshot_2026-01-27_182532_thopwb.png', 
            caption: '3D model of the wheel' 
          },
          { 
            type: 'image', 
            src: 'https://res.cloudinary.com/drjhgqwur/image/upload/v1769558272/copy_of_img_6396_owq6rl_dc9b58.jpg', 
            caption: '3D Printed version of the wheel' 
          },
          { 
            type: 'model', 
            url: 'https://res.cloudinary.com/drjhgqwur/image/upload/v1769556399/Curvy_Wheel_ssxe5z.glb', 
            thumb: 'https://res.cloudinary.com/drjhgqwur/image/upload/v1769556411/Screenshot_2026-01-27_182532_thopwb.png',
            caption: 'Chassis design v2.4 showing suspension mounting points.'
          },
        ],
        context: 'Working in UMass ASME chapter for this project. Currently the co-captain for the chassis sub-team.',
        challenge: 'Develop a lunar rover for an upcoming NASA sponsored competition. Devlop wheels to support 20+kg of weight per tire. Needs to have traction on loose terrain. ',
        solution: '3D model and iterate wheel designs. 3D printed models to test and iterate based on results.',
        tags: ['SolidWorks', 'Gear Design', 'Tolerancing'],
      },
      {
        id: 2,
        title: 'Assorted Hobby Prints',
        media: [
          { 
            type: 'image', 
            src: 'https://res.cloudinary.com/drjhgqwur/image/upload/v1769545940/IMG_6391_k5idse.jpg', 
            caption: 'A Dawngaurd War Axe from the game Skyrim. Has a wooden dowel for a core' 
          },
          { 
            type: 'image', 
            src: 'https://res.cloudinary.com/drjhgqwur/image/upload/v1769545937/IMG_6388_atltju.jpg', 
            caption: 'A Klein Bottle. This 4D topoligical shape has no distinct inside nor outside' 
          },
          { 
            type: 'image', 
            src: 'https://res.cloudinary.com/drjhgqwur/image/upload/v1769545935/IMG_6387_lbpvbd.jpg', 
            caption: 'A Devil Fruit from the show One Piece' 
          },
          { 
            type: 'image', 
            src: 'https://res.cloudinary.com/drjhgqwur/image/upload/v1769545934/IMG_6385_mmm1xe.jpg', 
            caption: 'A Devil Fruit from the show One Piece' 
          },
          { 
            type: 'image', 
            src: 'https://res.cloudinary.com/drjhgqwur/image/upload/v1769545931/IMG_6384_hxephs.jpg', 
            caption: 'A small flexible axolotyl' 
          },
          { 
            type: 'image', 
            src: 'https://res.cloudinary.com/drjhgqwur/image/upload/v1769545929/IMG_6382_vouk6e.jpg', 
            caption: 'A dragon that snaps into place, allowing for many configurations' 
          },
          { 
            type: 'image', 
            src: 'https://res.cloudinary.com/drjhgqwur/image/upload/v1769545926/IMG_6376_mmncaz.jpg', 
            caption: 'An Assasins Teapot. This teapot has 2 chambers, allowing the user to pour two different liquids from the same spout' 
          },
          { 
            type: 'image', 
            src: 'https://res.cloudinary.com/drjhgqwur/image/upload/v1769545926/IMG_6378_qy7pca.jpg', 
            caption: 'A tabletop dragon skull' 
          },
          { 
            type: 'image', 
            src: 'https://res.cloudinary.com/drjhgqwur/image/upload/v1769545924/IMG_6375_kwxgqc.jpg', 
            caption: 'A small desktop dolphin, with very fine layers' 
          },
          { 
            type: 'image', 
            src: 'https://res.cloudinary.com/drjhgqwur/image/upload/v1769545924/IMG_6374_ftjtkj.jpg', 
            caption: 'A small dragon with complex details' 
          },
          { 
            type: 'image', 
            src: 'https://res.cloudinary.com/drjhgqwur/image/upload/v1769545924/IMG_6373_kwkqqv.jpg', 
            caption: 'DNA strand, showcasing overhang strength' 
          },
        ],
        context: 'Here is an assortment of 3D printed parts I\'ve made for fun or testing.',
        challenge: 'Troubleshoot printer to create a functional part, using a variety of materials (PLA, ABS, PETG, TPU).',
        solution: 'Did a lot of research and testing to determine why print failures occured and how to prevent them.',
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
        challenge: 'To validate the integrity of a 3D model to withstand pressure from terrain and force on axis of rotation. Also to determine varaiblility of the testing compared to a real test wheel, as it doesn\'t account for a 3D printed part',
        solution: 'Conducted FEA on ANSYS. Used results to determine the probability of success of a real part. Then performed testing on said part to conclude the wheel passes all tests.',
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
            type: 'video', 
            url: 'https://youtube.com/shorts/EN_YbPMsDqY?feature=share', 
            caption: 'Car activates at a certain light level, using only hardware components'
          },
          { 
            type: 'video', 
            url: 'https://youtube.com/shorts/vnJZplO5hbY?feature=share', 
            caption: 'Car activates at a certain light level, using an Arduino and CDS Cell'
          },
          { 
            type: 'video', 
            url: 'https://youtube.com/shorts/ZLOec-UKCGI?feature=share', 
            caption: 'Car gets input with an Ultrasonic sensor, connects to an arduino, and turns when it detects an object at a certain distance in front of it'
          },
        ],
        context: 'This project was assigned in UMass course: ECE 361 - Fundamentals to Electrical Engineering. We were given all the supplies needed and lecture slides to complete tasks given, 1 assignment every 1-2 weeks. This project was primarily to apply what we learned in lecture to real life solutions as well as to inspire students to pursue additional projects of the same nature. I became a Teaching Assistant the following year for this course, mentoring students on the concepts and applications taught in this course.',
        challenge: 'Create a car to complete criteria for ECE 361 course at UMass Amherst',
        solution: 'Used purly hardware to design the car to move depending on light levels in the environment. Used transitiors, resistors, op-amps, motors and breadboards for this task. Later assignments utilized an Arduino and ultrasonic sensors to add a further challenge to the tasks.',
        tags: ['Circuitry', 'Problem Solving', 'Arduino'],
      },
      {
        id: 2,
        title: 'Sun Tracking Solar Panel',
        media: [
          { 
            type: 'image', 
            src: 'https://res.cloudinary.com/drjhgqwur/image/upload/v1769567901/Screenshot_2026-01-27_at_9.36.01_PM_fnsawv.png'
          },
          { 
            type: 'video', 
            url: 'https://youtu.be/0sGOAOLSuY8', 
            thumb: 'https://res.cloudinary.com/drjhgqwur/image/upload/v1769567901/Screenshot_2026-01-27_at_9.36.01_PM_fnsawv.png' 
          },
        ],
        context: 'This was a project given during a 2-week summer course at UMass Amherst, before I enrolled as a student. I was part a group of 4 students and an instuctor. We wanted to prove the feasbility of the concept and potentially apply it on a larger scale to test results.',
        challenge: 'Design a handheld solar panel that tracks the movement of the sun to optimize energy harvesting efficiency.',
        solution: 'Add light sensors on each corner of the solar panel to determine the orientation needed to face the sun. Used 2 degrees of freedom to allow proper movement of the solar panel to point towards the target.',
        tags: ['Circuitry', 'Problem Solving', 'Coding', 'Teamwork'],
      }
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
          { 
            type: 'video', 
            url: 'https://www.youtube.com/watch?v=PliQHKdRDYc', 
            caption: 'Official Gameplay Trailer'
          },
          { 
            type: 'image', 
            src: 'https://res.cloudinary.com/drjhgqwur/image/upload/v1769568395/Logo_New_2_Bright_ohcfl4.png',
          },
          { 
            type: 'image', 
            src: 'https://res.cloudinary.com/drjhgqwur/image/upload/v1769568395/Library_Capsule_acr9qp.png',
          },
        ],
        context: 'This project was made during the 2020 Covid Pandemic with one of my closest friends. We worked many hours per day, balancing extracurriculars, school, and Droid404 for over 2 years until the day of the launch. Game link: https://store.steampowered.com/app/1663030/Droid404/',
        challenge: 'Develop a video game to publish on Steam, a virtual video game store.',
        solution: 'Worked for over 2 years on: level desgin, programming, graphic design, and publishing to Steam. ',
        tags: ['Programming', 'Problem Solving', 'Graphic Design', 'Teamwork'],
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

  // --- UPDATED: getPreview function ---
  const getPreview = (project) => {
    // 1. PRIORITY: Check for explicit project thumbnail first
    if (project.thumbnail) return project.thumbnail;

    // 2. Look for a static Image
    const img = project.media?.find((m) => m.type === 'image');
    if (img) return img.src;

    // 3. Look for a Video (Auto-fetch YouTube or use video thumb)
    const video = project.media?.find((m) => m.type === 'video');
    if (video) {
        if (video.thumb) return video.thumb;

        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
        const match = video.url?.match(regExp);
        if (match && match[2].length === 11) {
             return `https://img.youtube.com/vi/${match[2]}/mqdefault.jpg`; 
        }
        return 'https://via.placeholder.com/800x600/00416B/FFFFFF?text=Video+Project';
    }

    // 4. Look for Model thumb
    const model = project.media?.find((m) => m.type === 'model');
    if (model && model.thumb) return model.thumb;

    // 5. Fallback
    return 'https://via.placeholder.com/800x600?text=No+Preview';
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
                
                {/* Type Badges */}
                <div className="absolute top-2 right-2 flex gap-1">
                    {project.media?.some((m) => m.type === 'model') && (
                    <div className="bg-[#00416B] text-white p-1.5 rounded-lg shadow-lg">
                        <Box className="w-4 h-4" />
                    </div>
                    )}
                    {project.media?.some((m) => m.type === 'video') && (
                    <div className="bg-red-600 text-white p-1.5 rounded-lg shadow-lg">
                        <PlayCircle className="w-4 h-4" />
                    </div>
                    )}
                </div>

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
