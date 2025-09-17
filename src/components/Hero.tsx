'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calculator, MapPin, Clock, Shield } from 'lucide-react';
import CalculatePrice from './CalculatePrice';
import FixedPrices from './FixedPrice';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Modal, Text } from '@mantine/core';
import { FloatingPaths } from './Background';
import Image from 'next/image';

const Hero = () => {
  const [calculatePriceOpen, setCalculatePriceOpen] = useState(false);
  const [fixedPricesOpen, setFixedPricesOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations('hero');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <div className="relative w-full min-h-screen lg:h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-black" id="home">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* Main Content Grid - Mobile First */}
      <div className="relative z-10 min-h-screen lg:h-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center px-4 sm:px-6 lg:px-8 py-8 lg:py-0">
        
        {/* Left Content Section */}
        <motion.div 
          className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center lg:h-full py-8 lg:py-0 order-2 lg:order-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Tagline */}
          <motion.div variants={itemVariants}>
            <Text className="text-label-md text-primary mb-3 sm:mb-4">
              {t('tagline')}
            </Text>
          </motion.div>

          {/* Main Headline - Responsive Typography */}
          <motion.h1 
            variants={itemVariants}
            className="text-display-xl text-text-primary mb-4 sm:mb-6"
          >
            <span className="font-light block sm:inline">{t('heading1')}</span>
            <br className="hidden sm:block" />
            <span className="text-gradient-primary">
              {t('heading2')}
            </span>
          </motion.h1>

          {/* Subtext - Responsive */}
          <motion.p 
            variants={itemVariants}
            className="text-body-lg text-text-secondary mb-8 sm:mb-10 lg:mb-12 max-w-2xl"
          >
            Experience premium airport transfers with transparent pricing, 
            professional drivers, and guaranteed punctuality across Frankfurt and beyond.
          </motion.p>

          {/* Action Cards Grid - Mobile Stack */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10"
          >
            {/* Calculate Price Card - Mobile Optimized */}
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group cursor-pointer"
              onClick={() => setCalculatePriceOpen(true)}
            >
              <div className="bg-surface border border-border-light rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                <div className="flex items-center mb-2 sm:mb-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-heading-xs text-text-primary">{t('calculateFareH1')}</h3>
                    <p className="text-caption-md text-text-secondary">{t('calculateFareH2')}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-caption-md text-text-secondary mb-3 sm:mb-4">
                    {t('calculateFareH3')}
                  </p>
                  <div className="flex items-center text-primary text-caption-md font-medium">
                    {t('calculateCardButton')} →
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Fixed Prices Card - Mobile Optimized */}
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group cursor-pointer"
              onClick={() => setFixedPricesOpen(true)}
            >
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-border-light rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-2 sm:mb-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-heading-xs text-text-primary"></h3>
                    <p className="text-caption-md text-text-secondary">{t('subtitle')}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-caption-md text-text-secondary mb-3 sm:mb-4">
                    {t('description')}
                  </p>
                  <div className="flex items-center text-secondary text-caption-md font-medium">
                    {t('cta')} →
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Actions - Mobile Full Width */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/booking')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-primary/90 text-white rounded-lg sm:rounded-xl font-medium hover:from-primary/90 hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl text-body-sm"
            >
              Book Now
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('#services')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-border-light text-text-primary rounded-lg sm:rounded-xl font-medium hover:bg-surface transition-all duration-300 text-body-sm"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Visual Section - Mobile First */}
        <motion.div 
          className="lg:col-span-5 xl:col-span-6 flex items-center justify-center h-64 sm:h-80 lg:h-full min-h-[300px] sm:min-h-[400px] lg:min-h-0 order-1 lg:order-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full h-full max-w-xs sm:max-w-sm lg:max-w-2xl flex items-center justify-center">
            {/* Background Visual - Subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl sm:rounded-3xl" />
            
            {/* Car Image - Mobile Responsive Sizing */}
            <div className="relative flex items-center justify-center w-full h-full p-2 sm:p-4 lg:p-8 z-10">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative flex items-center justify-center"
              >
                <Image 
                  src="/mercedies.png" 
                  alt="Premium Mercedes taxi service" 
                  width={450}
                  height={350}
                  className="w-auto h-auto max-w-full max-h-[200px] sm:max-h-[250px] lg:max-h-[350px] xl:max-h-[450px] object-contain object-center drop-shadow-2xl select-none pointer-events-none"
                  style={{ filter: 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.25))' }}
                  draggable={false}
                  onError={(e) => {
                    console.error('Car image failed to load:', e);
                    e.currentTarget.style.display = 'none';
                    // Create a visible placeholder
                    const placeholder = document.createElement('div');
                    placeholder.className = 'w-48 h-24 sm:w-56 sm:h-28 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center text-white font-semibold text-sm sm:text-base';
                    placeholder.textContent = 'Mercedes E-Class';
                    e.currentTarget.parentNode?.appendChild(placeholder);
                  }}
                  onLoad={() => {
                    console.log('Car image loaded successfully');
                  }}
                />
              </motion.div>
            </div>

            {/* Floating Stats - Responsive */}
            <motion.div 
              className="absolute top-2 right-2 sm:top-4 sm:right-4 lg:top-8 lg:right-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-2 sm:p-3 lg:p-4 shadow-md sm:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-amber-500" />
                <div>
                  <p className="text-caption-md font-semibold text-slate-900 dark:text-white">24/7</p>
                <p className="text-caption-sm text-slate-600 dark:text-slate-400">Available</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 lg:bottom-8 lg:left-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-2 sm:p-3 lg:p-4 shadow-md sm:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-500" />
                <div>
                  <p className="text-caption-md font-semibold text-slate-900 dark:text-white">100%</p>
                <p className="text-caption-sm text-slate-600 dark:text-slate-400">Secure</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Modals - Maintaining existing functionality */}
      <Modal
        opened={calculatePriceOpen}
        onClose={() => setCalculatePriceOpen(false)}
        title={t('modalTitle')}
        centered
        size="xl"
        classNames={{
          content: 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800',
          title: 'text-slate-900 dark:text-slate-100 font-bold',
          overlay: 'bg-black/60 backdrop-blur-sm'
        }}
        styles={{
          content: { height: '45rem' },
        }}
      >
        <CalculatePrice />
      </Modal>

      <Modal
        opened={fixedPricesOpen}
        onClose={() => setFixedPricesOpen(false)}
        title={t('modalTitle2')}
        centered
        size="xl"
        classNames={{
          content: 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800',
          title: 'text-slate-900 dark:text-slate-100 font-bold',
          overlay: 'bg-black/60 backdrop-blur-sm'
        }}
        styles={{
          content: { height: '30rem' },
        }}
      >
        <FixedPrices />
      </Modal>
    </div>
  );
};

export default Hero;
