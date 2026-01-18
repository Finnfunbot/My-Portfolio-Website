import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Box } from 'lucide-react';
import ModelViewer from './ModelViewer';

/**
 * Props:
 * - media: [{ type: 'image'|'model', src?/url?, alt?, thumb? }]
 * - initialIndex: number
 * - className
 */
export default function MediaCarousel({ media = [], initialIndex = 0, className = '' }) {
  const [index, setIndex] = useState(initialIndex);
  const containerRef = useRef(null);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  if (!media || media.length === 0) {
    return (
      <div className={`bg-gray-100 w-full h-full min-h-[400px] flex items-center justify-center ${className}`}>
        <span className="text-gray-400">No media available</span>
      </div>
    );
  }

  const active = media[index];

  const prev = () => setIndex((i) => (i - 1 + media.length) % media.length);
  const next = () => setIndex((i) => (i + 1) % media.length);

  // Keyboard navigation when focused
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [media.length]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className={`relative w-full h-full min-h-[400px] bg-gray-50 rounded-2xl overflow-hidden shadow-inner ${className}`}
      aria-roledescription="carousel"
      aria-label="Project media carousel"
    >
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

      <div className="w-full h-full">
        {active.type === 'model' ? (
          <div className="w-full h-full">
            <ModelViewer
              key={active.url || active.src}
              url={active.url}
              placeholderSrc={active.thumb}
              autoRotate={true}
              autoRotateSpeed={0.1}
              width="100%"
              height="100%"
            />
            <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-[#00416B] flex items-center gap-2 shadow-sm pointer-events-none">
              <Box className="w-4 h-4" />
              3D Model
            </div>
          </div>
        ) : (
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

      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-30 flex gap-2 items-center">
        {media.map((m, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to media ${i + 1}`}
            className={`w-12 h-8 rounded-md overflow-hidden border-2 ${i === index ? 'border-[#00416B]' : 'border-transparent'} shadow-sm bg-white`}
          >
            {m.type === 'image' ? (
              <img src={m.thumb || m.src} alt={m.alt || `thumb-${i}`} className="w-full h-full object-cover" />
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
