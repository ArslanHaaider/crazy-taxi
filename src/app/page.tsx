import EnhancedNavbar from '@/components/EnhancedNavbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Services from '@/components/Services';
import WhyChooseUS from '@/components/WhyChooseUS';

export default function Home() {
  return <div>
      <EnhancedNavbar/>
      <Hero/>
      <Services/>
      <WhyChooseUS/>
      <Footer/>
  </div>;
}