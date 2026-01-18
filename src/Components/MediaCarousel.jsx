import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Box, MousePointer2 } from 'lucide-react';
import ModelViewer from './ModelViewer';

/**
 * Props:
 * - media: [{ type: 'image'|'model', src?/url?, alt?, thumb?, caption? }]
 * - initialIndex: number
 * - className
 */
export default function MediaCarousel({ media = [], initialIndex = 0, className = '' }) {
  const [index, setIndex] = useState(initialIndex);
  const [shouldLoadModel, setShouldLoadModel] = useState(false); // Lazy load state
  const containerRef = useRef(null);

  useEffect(() => {
    setIndex(initialIndex);
    setShouldLoadModel(false); // Reset model loading when project changes
  }, [initialIndex, media]); // Added media dependency to ensure reset on project swap

  // Reset lazy load state when sliding to a new item
  const handleSlideChange = (newIndex) => {
    setIndex(newIndex);
    setShouldLoadModel(false);
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
  }, [media.length, index]); // Added index dependency for accurate closure

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className={`relative w-full h-full min-h-[400px] bg-gray-50 rounded-2xl overflow-hidden shadow-inner ${className}`}
      aria-roledescription="carousel"
      aria-label="Project media carousel"
    >
      {/* Navigation Arrows */}
      {media.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm border border-[#00416B]/10 hover:bg-white transition"
          >
            <ChevronLeft className="w-5 h-5 text-[#00416B]" />
          </button>

          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm border border-[#00416B]/10 hover:bg-white transition"
          >
            <ChevronRight className="w-5 h-5 text-[#00416B]" />
          </button>
        </>
      )}

      {/* Main Content Area */}
      <div className="w-full h-full">
        {active.type === 'model' ? (
          <div className="w-full h-full relative group">
            {shouldLoadModel ? (
              // Active Model Viewer
              <>
                <ModelViewer
                  key={active.url || active.src}
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
              // Lazy Load Facade (Thumbnail + Button)
              <div className="w-full h-full relative">
                 <img
                  src={active.thumb}
                  alt="3D Model Preview"
                  className="w-full h-full object-cover blur-[2px] scale-105"
                />
                <div className="absolute inset-0 bg-[#00416B]/20 flex flex-col items-center justify-center">
                  <button 
                    onClick={() => setShouldLoadModel(true)}
                    className="flex flex-col items-center gap-3 group/btn"
                  >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover/btn:scale-110 transition-transform duration-300">
                      <MousePointer2 className="w-8 h-8 text-[#00416B] ml-1" />
                    </div>
                    <span className="px-4 py-2 bg-white/90 backdrop-blur rounded-full text-sm font-bold text-[#00416B] shadow-sm">
                      Click to View 3D Model
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Image Viewer
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
            aria-label={`Go to media ${i + 1}`}
            className={`w-12 h-8 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all duration-300 ${
              i === index 
                ? 'border-[#00416B] scale-110 shadow-md' 
                : 'border-transparent opacity-70 hover:opacity-100'
            } bg-white`}
          >
            {m.type === 'image' ? (
              <img src={m.thumb || m.src} alt={`thumb-${i}`} className="w-full h-full object-cover" />
            ) : (
              m.thumb ? (
                <img src={m.thumb} alt="model thumb" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#00416B] bg-[#EAF2F6]">
                  <Box className="w-4 h-4" />
                </div>
              )
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
