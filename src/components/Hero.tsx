'use client'
import { Button, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCar } from '@tabler/icons-react';
import { motion } from "motion/react";
import CalculatePrice from './CalculatePrice';
import FixedPrices from './FixedPrice'; // Assuming you have a FixedPrices component
import { useTranslations } from 'next-intl';

const Hero = () => {
  // UseDisclosure for the first modal
  const [opened, { open, close }] = useDisclosure(false);
  // UseDisclosure for the second modal
  const [openedFixedPrices, { open: openFixedPrices, close: closeFixedPrices }] = useDisclosure(false);
  const t = useTranslations('hero');
  return (
    <div className="bg-[url('/heroBg.jpg')] bg-cover bg-center w-100vw h-[100vh] flex justify-center font-sans overflow-hidden" id='home'>
      <div className='flex text-white w-full flex-col justify-end items-center md:flex-row lg-flex-row'>
        <div className='w-full flex flex-col items-center justify-evenly h-1/3 md:h-3/4 md:w-3/6'>
          <Text size='xl'>{t('tagline')}</Text>
          <motion.h1 
            initial={{opacity:0}} 
            animate={{opacity:1}} 
            transition={{duration:1}} 
            className='m-0 text-4xl'
          >
            {t('heading1')}
          </motion.h1>
          <motion.h1 
            initial={{opacity:0}} 
            animate={{opacity:1}} 
            transition={{duration:1,delay:0.5}} 
            className='m-0 text-4xl'
          >
            {t('heading2')}
          </motion.h1>
          
          {/* First Modal for Calculate Price */}
          <Modal 
            opened={opened} 
            onClose={close} 
            title={t('modalTitle')} 
            centered 
            size='xl' 
            className='bg-primary'
            styles={{
              content: { height: "30rem" },
              title: { color: "orange", fontSize: "1.5rem", fontWeight: "bold"},
            }}
          >
            <CalculatePrice />
          </Modal>

          {/* Second Modal for Fixed Prices */}
          <Modal
            opened={openedFixedPrices}
            onClose={closeFixedPrices}
            title={t('modalTitle2')}
            centered
            size="xl"
            className="bg-primary"
            styles={{
              content: { height: "30rem" },
              title: { color: "orange", fontSize: "1.5rem", fontWeight: "bold" },
            }}
          >
            <FixedPrices /> {/* Your fixed prices component */}
          </Modal>
          
          {/* Button to open Calculate Price Modal */}
          <Button 
            className=" h-12 mb-3 text-2xl animate-pulse-scale bg-white text-primary hover:text-white hover:bg-primary" 
            onClick={open} 
            rightSection={<IconCar size={30} />}
          >
            {t('calculateFare')}
          </Button>
            {/* Button to open Fixed Prices Modal */}
          <Button 
            className=" h-12 mb-10 text-2xl animate-pulse-scale bg-white text-primary hover:text-white hover:bg-primary" 
            onClick={openFixedPrices} 
          >
            {t('fixedPrice')} 
          </Button>
        </div>
        <div className='md:overflow-hidden w-1/2 md:3/6 h-2/5'>
          <div className="bg-[url('/mercedies.png')] bg-contain bg-center bg-no-repeat w-full h-full animate-pulse-scale">
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
