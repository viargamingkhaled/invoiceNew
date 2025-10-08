'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { HOME_V2_DATA } from '@/lib/home-v2-data';

export default function ReviewsCarousel() {
  const [currentReview, setCurrentReview] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const { reviews } = HOME_V2_DATA;

  // Auto-play functionality
  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
      }, 6000); // 6 seconds as per spec
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
  }, [isHovered, reviews.length]);

  const goToReview = (index: number) => {
    setCurrentReview(index);
  };

  const goToPrevious = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToNext = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1221] mb-4">
            What our customers say
          </h2>
          <p className="text-lg text-[#6B7280]">
            Real feedback from professionals who trust Ventira
          </p>
        </motion.div>

        {/* Carousel */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Review Content */}
          <div className="relative h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-center max-w-4xl mx-auto"
                aria-live="polite"
                aria-atomic="true"
              >
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="w-12 h-12 text-[#0F766E] mx-auto opacity-60" />
                </div>

                {/* Review Text */}
                <blockquote className="text-xl sm:text-2xl font-medium text-[#0B1221] leading-relaxed mb-8">
                  "{reviews[currentReview].text}"
                </blockquote>

                {/* Author Info */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 bg-[#0F766E] rounded-full flex items-center justify-center">
                    <span className="text-white text-lg font-bold">
                      {reviews[currentReview].author.charAt(0)}
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-[#0B1221]">
                      {reviews[currentReview].author}
                    </div>
                    <div className="text-sm text-[#6B7280]">
                      {reviews[currentReview].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Bullets */}
            <div className="flex space-x-2" role="tablist" aria-label="Review navigation">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToReview(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 ${
                    index === currentReview 
                      ? 'bg-[#0F766E] scale-110' 
                      : 'bg-[#6B7280] hover:bg-[#0F766E]'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                  role="tab"
                  aria-selected={index === currentReview}
                />
              ))}
            </div>

            {/* Arrow Controls */}
            <div className="flex space-x-2">
              <button
                onClick={goToPrevious}
                className="p-2 rounded-xl bg-white border border-black/10 hover:bg-[#F6F7F8] text-[#0B1221] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="p-2 rounded-xl bg-white border border-black/10 hover:bg-[#F6F7F8] text-[#0B1221] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}






