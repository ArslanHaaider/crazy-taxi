import EnhancedNavbar from '@/components/EnhancedNavbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyChooseUS from '@/components/WhyChooseUS';
import { TestimonialsSection } from '@/components/TestimonialsSection';

export default function Home() {
  return (
    <div className="relative">
      <EnhancedNavbar />
      <Hero />
      <Services />
      <WhyChooseUS />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}