'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Car } from 'lucide-react';
import Image from 'next/image';
import CalculatePrice from './CalculatePrice';
import FixedPrices from './FixedPrice';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Modal, Text } from '@mantine/core';
import { FloatingPaths } from './Background';
import {Button} from '@mantine/core'
const Hero = () => {
  const [calculatePriceOpen, setCalculatePriceOpen] = useState(false);
  const [fixedPricesOpen, setFixedPricesOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations('hero');
  const ts = useTranslations('Navbar');

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-white to-amber-100 dark:from-neutral-900 dark:via-neutral-950 dark:to-black" id="home">
      {/* Background Paths - Using the actual BackgroundPaths structure */}
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="absolute inset-0 flex text-white w-full flex-col justify-end items-center md:flex-row lg-flex-row z-10">
        <div className="w-full flex flex-col items-center justify-evenly h-1/3 md:h-3/4 md:w-3/6">
          <div className="text-center space-y-6">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1 }}
             >
               <Text size="xl" className="text-neutral-700 dark:text-amber-200 font-light tracking-wide">
                 {t('tagline')}
               </Text>
             </motion.div>
 
             <motion.h1
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.2, delay: 0.2 }}
               className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 dark:from-amber-400 dark:via-amber-500 dark:to-amber-600"
             >
               {t('heading1')}
             </motion.h1>
 
             <motion.h2
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.2, delay: 0.4 }}
               className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-600 dark:from-neutral-100 dark:via-neutral-200 dark:to-neutral-300"
             >
               {t('heading2')}
             </motion.h2>
          </div>

          {/* First Modal for Calculate Price */}
          <Modal
            opened={calculatePriceOpen}
            onClose={() => setCalculatePriceOpen(false)}
            title={t('modalTitle')}
            centered
            size="xl"
            className="bg-primary"
            styles={{
              content: { height: '45rem' },
              title: { color: '#1d87da', fontSize: '1.5rem', fontWeight: 'bold' },
            }}
          >
            <CalculatePrice />
          </Modal>

          {/* Second Modal for Fixed Prices */}
          <Modal
            opened={fixedPricesOpen}
            onClose={() => setFixedPricesOpen(false)}
            title={t('modalTitle2')}
            centered
            size="xl"
            className="bg-primary"
            styles={{
              content: { height: '30rem' },
              title: { color: 'blue', fontSize: '1.5rem', fontWeight: 'bold' },
            }}
          >
            <FixedPrices />
          </Modal>

          <div className="flex flex-col gap-4 w-full items-center">
            {/* Button to open Calculate Price Modal */}
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.8, duration: 0.5 }}
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="inline-block group relative bg-gradient-to-b from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-amber-500/25 transition-shadow duration-300"
             >
               <Button
                 className="h-16 md:h-20 text-xl md:text-2xl rounded-[1.15rem] px-8 py-6 backdrop-blur-md bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500 text-black dark:text-black font-semibold transition-all duration-300 group-hover:-translate-y-0.5 border border-amber-400/50 dark:border-amber-700/50 hover:shadow-lg hover:shadow-amber-500/30"
                 onClick={() => setCalculatePriceOpen(true)}
                 rightSection={<Car size={30} />}
                 styles={{
                   root: {
                     minWidth: '280px',
                     maxWidth: '400px',
                   },
                 }}
               >
                 <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                   {t('calculateFare')}
                 </span>
               </Button>
             </motion.div>
             
             {/* Button to open Fixed Prices Modal */}
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.9, duration: 0.5 }}
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="inline-block group relative bg-gradient-to-b from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-blue-500/25 transition-shadow duration-300"
             >
               <Button
                 className="h-16 md:h-20 text-lg md:text-xl rounded-[1.15rem] px-8 py-6 backdrop-blur-md bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold transition-all duration-300 group-hover:-translate-y-0.5 border border-blue-500/50 dark:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/30"
                 onClick={() => setFixedPricesOpen(true)}
                 styles={{
                   root: {
                     minWidth: '280px',
                     maxWidth: '400px',
                   },
                 }}
               >
                 <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                   {t('fixedPrice')}
                 </span>
               </Button>
             </motion.div>
          </div>
        </div>
        <div className="flex justify-center items-center w-full md:hidden mt-5">
          <Button
            color="blue"
            className="w-2/3 h-20 md:mt-10 text-2xl md:w-2/5 animate-pulse-scale"
            rightSection={<Car size={40} />}
            onClick={() => router.push('/booking')}
          >
            {ts('book')}
          </Button>
        </div>
        <motion.div
          className="md:overflow-hidden w-1/2 md:w-2/5 h-2/5 md:h-3/5"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="bg-[url('/mercedies.png')] bg-contain bg-center bg-no-repeat w-full h-full animate-pulse-scale drop-shadow-2xl" />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
