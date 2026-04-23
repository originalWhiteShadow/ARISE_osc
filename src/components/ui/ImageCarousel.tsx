"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

interface ImageObj {
  id: string;
  src: string;
  href: string;
}

interface ImageCarouselProps {
  images: ImageObj[];
  autoScrollInterval?: number; // ms, defaults to 4000
}

export default function ImageCarousel({ images, autoScrollInterval = 4000 }: ImageCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll logic
  useEffect(() => {
    if (images.length <= 1) return;
    if (isHovered) return;

    const timer = setInterval(() => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        const nextIndex = (currentIndex + 1) % images.length;
        
        // Calculate exact scroll position based on child width
        const childWidth = container.clientWidth;
        container.scrollTo({
          left: childWidth * nextIndex,
          behavior: 'smooth'
        });
        
        setCurrentIndex(nextIndex);
      }
    }, autoScrollInterval);

    return () => clearInterval(timer);
  }, [currentIndex, images.length, isHovered, autoScrollInterval]);

  // Update current index based on manual scroll
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const childWidth = scrollRef.current.clientWidth;
      const newIndex = Math.round(scrollLeft / childWidth);
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    }
  };

  const scrollPrev = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent triggering parent Link if wrapped
    if (scrollRef.current) {
      const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      const childWidth = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: childWidth * prevIndex,
        behavior: 'smooth'
      });
      setCurrentIndex(prevIndex);
    }
  };

  const scrollNext = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent triggering parent Link if wrapped
    if (scrollRef.current) {
      const nextIndex = (currentIndex + 1) % images.length;
      const childWidth = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: childWidth * nextIndex,
        behavior: 'smooth'
      });
      setCurrentIndex(nextIndex);
    }
  };

  if (images.length === 0) return null;

  return (
    <div 
      className="w-full mb-6 rounded-xl overflow-hidden border border-apple-border/20 relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        // Stop click from propagating up so we don't accidentally navigate
        // if the user is just trying to interact with the carousel
        // Wait, if we want them to click the image to open the full res, 
        // we shouldn't stop propagation completely unless it's a navigation arrow.
      }}
    >
      {/* Scroll Container */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory" 
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style dangerouslySetInnerHTML={{__html: `::-webkit-scrollbar { display: none; }`}} />
        
        {images.map((imgObj, imgIdx) => (
          <div key={imgIdx} className="w-full flex-none snap-center relative aspect-video bg-black/5 flex items-center justify-center">
            <a 
              href={imgObj.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full h-full block"
              onClick={(e) => e.stopPropagation()} // Let image open in new tab without triggering parent
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={imgObj.src} 
                alt={`News media ${imgIdx + 1}`} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </a>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button 
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-apple-bg/80 backdrop-blur-md border border-apple-border/50 text-apple-text flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-apple-border"
          >
            <ChevronLeft className="w-5 h-5 pr-0.5" />
          </button>
          <button 
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-apple-bg/80 backdrop-blur-md border border-apple-border/50 text-apple-text flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-apple-border"
          >
            <ChevronRight className="w-5 h-5 pl-0.5" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md">
            {images.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${idx === currentIndex ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
