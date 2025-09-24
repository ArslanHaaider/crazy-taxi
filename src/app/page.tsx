"use client";

import { useEffect } from 'react';
import EnhancedNavbar from '@/components/EnhancedNavbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyChooseUS from '@/components/WhyChooseUS';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { APIProvider } from '@vis.gl/react-google-maps';

export default function Home() {

  useEffect(() => {
    // Handle hash navigation when page loads
    const handleHashNavigation = () => {
      const hash = window.location.hash.substring(1); // Remove the # symbol
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100); // Small delay to ensure page is fully loaded
      }
    };

    handleHashNavigation();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation);
    
    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, []);

  return (
    <div className="relative">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
      <EnhancedNavbar />
      <Hero />
      <Services />
      <WhyChooseUS />
      <TestimonialsSection />
      <Footer />
      </APIProvider>
    </div>
  );
}