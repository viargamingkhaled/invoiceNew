'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { HOME_V2_DATA } from '@/lib/home-v2-data';

interface HeroSliderProps {
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export default function HeroSlider({ onPrimaryClick, onSecondaryClick }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const { hero } = HOME_V2_DATA;
  const { slides, ctaPrimary, ctaSecondary, autoplayMs } = hero;

  // Auto-play functionality
  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, autoplayMs);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, autoplayMs, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        break;
      case 'ArrowRight':
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        break;
      case 'Home':
        goToSlide(0);
        break;
      case 'End':
        goToSlide(slides.length - 1);
        break;
    }
  };

  return (
    <section 
      className="relative min-h-[600px] pt-20 bg-gradient-to-br from-[#F6F7F8] to-[#FFFFFF] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Hero slider"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#0F766E] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-[#14B8A6] rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Slide Content */}
        <div className="relative h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center"
            >
              <div className="grid lg:grid-cols-5 gap-16 items-center w-full">
                {/* Text Content */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="space-y-3">
                    <motion.h1 
                      className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0B1221] leading-tight"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                    >
                      {slides[currentSlide].title}
                    </motion.h1>
                    <motion.p 
                      className="text-lg sm:text-xl text-[#6B7280] leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      {slides[currentSlide].subtitle}
                    </motion.p>
                  </div>

                  {/* CTAs */}
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={onPrimaryClick}
                    >
                      {ctaPrimary}
                    </Button>
                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={onSecondaryClick}
                    >
                      {ctaSecondary}
                    </Button>
                  </motion.div>
                  
                  {/* Slide Indicators */}
                  <div className="flex items-center justify-start mt-6">
                    <div className="flex space-x-3" role="tablist" aria-label="Slide navigation">
                      {slides.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 rounded-full ${
                            index === currentSlide
                              ? 'bg-[#0F766E] h-3 w-8'
                              : 'bg-[#6B7280] h-3 w-3 hover:bg-[#0F766E]'
                          }`}
                          role="tab"
                          aria-selected={index === currentSlide}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Visual Content */}
                <div className="lg:col-span-3 relative">
                  {/* Floating effect background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0F766E]/5 to-[#14B8A6]/5 rounded-3xl blur-xl transform translate-y-4 scale-105"></div>
                  
                  <motion.div
                    className="relative bg-white rounded-3xl shadow-2xl p-4 border border-black/5 backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    style={{
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    {/* Slide Image */}
                    <div className="aspect-[4/3] bg-gradient-to-br from-[#F6F7F8] to-[#FFFFFF] rounded-2xl overflow-hidden border border-black/5 shadow-inner">
                      <Image
                        src={`/slide${currentSlide + 1}.webp`}
                        alt={slides[currentSlide].posterLabel}
                        width={500}
                        height={375}
                        className="w-full h-full object-contain"
                        priority={currentSlide === 0}
                        onError={(e) => {
                          // Fallback to placeholder if image doesn't exist
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-full h-full bg-gradient-to-br from-[#F6F7F8] to-[#FFFFFF] flex items-center justify-center">
                                <div class="text-center space-y-2">
                                  <div class="w-16 h-16 bg-[#0F766E] rounded-xl mx-auto flex items-center justify-center">
                                    <span class="text-white text-2xl font-bold">A4</span>
                                  </div>
                                  <p class="text-sm text-[#6B7280] font-medium">
                                    ${slides[currentSlide].posterLabel}
                                  </p>
                                </div>
                              </div>
                            `;
                          }
                        }}
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
