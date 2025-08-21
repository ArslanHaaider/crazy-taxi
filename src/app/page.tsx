import EnhancedNavbar from '@/components/EnhancedNavbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyChooseUS from '@/components/WhyChooseUS';

export default function Home() {
  return (
    <div className="relative">
      <EnhancedNavbar />
      <Hero />
      <Services />
      <WhyChooseUS />
      <Footer />
    </div>
  );
}