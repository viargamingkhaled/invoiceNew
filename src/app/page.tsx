'use client';

import { motion } from 'framer-motion';
import HeroSlider from '@/components/sections/HeroSlider';
import TemplatesGallery from '@/components/sections/TemplatesGallery';
import WhyUs from '@/components/sections/WhyUs';
import Pricing from '@/components/sections/Pricing';
import LogoCloud from '@/components/sections/LogoCloud';
import ReviewsCarousel from '@/components/sections/ReviewsCarousel';
import StartQuickForm from '@/components/sections/StartQuickForm';

export default function HomePage() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      className="bg-[#F6F7F8] min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <main>
        {/* Hero Slider */}
        <HeroSlider 
          onPrimaryClick={() => scrollToSection('templates')}
          onSecondaryClick={() => scrollToSection('pricing')}
        />
        
        {/* Templates Gallery */}
        <section id="templates" className="py-16 bg-white">
          <TemplatesGallery />
        </section>
        
        {/* Why Choose Us */}
        <WhyUs />
        
        {/* Pricing Plans */}
        <section id="pricing" className="bg-white">
          <Pricing />
        </section>
        
        {/* Trusted By */}
        <LogoCloud />
        
        {/* Reviews */}
        <ReviewsCarousel />
        
        {/* Quick Start Form */}
        <StartQuickForm />
      </main>
    </motion.div>
  );
}
