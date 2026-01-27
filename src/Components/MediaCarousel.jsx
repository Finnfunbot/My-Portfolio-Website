import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Box, MousePointer2, PlayCircle } from 'lucide-react';
import ModelViewer from './ModelViewer';

/**
 * Props:
 * - media: [{ type: 'image'|'model'|'video', src?/url?, alt?, thumb?, caption? }]
 * - initialIndex: number
 * - className
 */
export default function MediaCarousel({ media = [], initialIndex = 0, className = '' }) {
  const [index, setIndex] = useState(initialIndex);
  const [isInteracting, setIsInteracting] = useState(false); // Controls lazy load for Models & Videos
  const containerRef = useRef(null);

  useEffect(() => {
    setIndex(initialIndex);
    setIsInteracting(false);
  }, [initialIndex, media]);

  // Reset interaction state when sliding to a new item
  const handleSlideChange = (newIndex) => {
    setIndex(newIndex);
    setIsInteracting(false);
  };

  // Helper: Extract YouTube ID from various URL formats
  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Helper: Get Thumbnail (User provided OR Auto-YouTube)
  const getThumbnail = (item) => {
    if (item.thumb) return item.thumb;
    if (item.type === 'video' && item.url) {
      const vidId = getYouTubeId(item.url);
      if (vidId) return `https://img.youtube.com/vi/${vidId}/maxresdefault.jpg`;
    }
    return item.src || ''; // Fallback for images
  };

  if (!media || media.length === 0) {
    return (
      <div className={`bg-gray-100 w-full h-full min-h-[400px] flex items-center justify-center ${className}`}>
        <span className="text-gray-400">No media available</span>
      </div>
    );
  }

  const active = media[index];
  const prev = () => handleSlideChange((index - 1 + media.length) % media.length);
  const next = () => handleSlideChange((index + 1) % media.length);

  // Keyboard navigation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [media.length, index]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className={`relative w-full h-full min-h-[400px] bg-gray-50 rounded-2xl overflow-hidden shadow-inner ${className}`}
    >
      {/* Navigation Arrows */}
      {media.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm border border-[#00416B]/10 hover:bg-white transition"
          >
            <ChevronLeft className="w-5 h-5 text-[#00416B]" />
          </button>

          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm border border-[#00416B]/10 hover:bg-white transition"
          >
            <ChevronRight className="w-5 h-5 text-[#00416B]" />
          </button>
        </>
      )}

      {/* Main Content Area */}
      <div className="w-full h-full">
        
        {/* --- 3D MODEL --- */}
        {active.type === 'model' && (
          <div className="w-full h-full relative group">
            {isInteracting ? (
              <>
                <ModelViewer
                  key={active.url}
                  url={active.url}
                  placeholderSrc={active.thumb}
                  autoRotate={true}
                  autoRotateSpeed={0.5}
                  width="100%"
                  height="100%"
                />
                <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-[#00416B] flex items-center gap-2 shadow-sm pointer-events-none">
                  <Box className="w-4 h-4" />
                  Interactive 3D Model
                </div>
              </>
            ) : (
              <LazyFacade 
                thumb={active.thumb} 
                icon={MousePointer2} 
                label="Click to View 3D Model" 
                onClick={() => setIsInteracting(true)} 
              />
            )}
          </div>
        )}

        {/* --- VIDEO (YouTube) --- */}
        {active.type === 'video' && (
          <div className="w-full h-full relative bg-black">
            {isInteracting ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${getYouTubeId(active.url)}?autoplay=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0"
              />
            ) : (
              <LazyFacade 
                thumb={getThumbnail(active)} 
                icon={PlayCircle} 
                label="Click to Watch Video" 
                onClick={() => setIsInteracting(true)} 
              />
            )}
          </div>
        )}

        {/* --- IMAGE --- */}
        {active.type === 'image' && (
          <div className="w-full h-full relative">
            <img
              src={active.src}
              alt={active.alt || 'Project image'}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00416B]/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        )}
      </div>

      {/* Caption Overlay */}
      {active.caption && (
        <div className="absolute bottom-20 left-4 right-4 z-20 pointer-events-none">
            <div className="bg-black/60 backdrop-blur-md text-white px-4 py-3 rounded-xl inline-block max-w-[90%] md:max-w-[70%] text-sm font-medium shadow-lg border border-white/10">
                {active.caption}
            </div>
        </div>
      )}

      {/* Thumbnails Navigation */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-30 flex gap-2 items-center max-w-[90%] overflow-x-auto p-1 no-scrollbar">
        {media.map((m, i) => (
          <button
            key={i}
            onClick={() => handleSlideChange(i)}
            className={`w-12 h-8 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all duration-300 ${
              i === index 
                ? 'border-[#00416B] scale-110 shadow-md' 
                : 'border-transparent opacity-70 hover:opacity-100'
            } bg-white relative`}
          >
            <img 
              src={getThumbnail(m)} 
              alt={`thumb-${i}`} 
              className="w-full h-full object-cover" 
            />
            {/* Tiny Icons on Thumbnails */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              {m.type === 'model' && <Box className="w-3 h-3 text-white drop-shadow-md" />}
              {m.type === 'video' && <PlayCircle className="w-3 h-3 text-white drop-shadow-md" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// --- Sub-component for Lazy Loading Facades ---
const LazyFacade = ({ thumb, icon: Icon, label, onClick }) => (
  <div className="w-full h-full relative group cursor-pointer" onClick={onClick}>
    <img
      src={thumb}
      alt="Preview"
      className="w-full h-full object-cover blur-[2px] scale-105 group-hover:scale-100 transition-transform duration-700"
    />
    <div className="absolute inset-0 bg-[#00416B]/30 group-hover:bg-[#00416B]/20 transition-colors flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8 text-[#00416B] ml-0.5" />
        </div>
        <span className="px-4 py-2 bg-white/90 backdrop-blur rounded-full text-sm font-bold text-[#00416B] shadow-sm">
          {label}
        </span>
      </div>
    </div>
  </div>
);
