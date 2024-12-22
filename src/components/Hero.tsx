'use client'
import { Button, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCar } from '@tabler/icons-react';
import { motion } from "motion/react";
import CalculatePrice from './CalculatePrice';
import { useTranslations } from 'next-intl';

const Hero = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const t = useTranslations('hero');

  return (
    <div className="bg-[url('/heroBg.jpg')] bg-cover bg-center w-100vw h-[100vh] flex justify-center font-sans overflow-hidden" >
      <div className='flex text-white w-full flex-col justify-end items-center md:flex-row lg-flex-row'>
        <div className='w-full flex flex-col items-center justify-evenly h-1/3 md:h-2/4 md:w-3/6'>
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
          <Modal 
            opened={opened} 
            onClose={close} 
            title={t('modalTitle')} 
            centered 
            size='xl' 
            className='bg-orange-500'
            styles={{
              content:{height:"30rem"},
              title:{color:"orange",fontSize:"1.5rem",fontWeight:"bold"}
            }}
          >
            <CalculatePrice/>
          </Modal>
          <Button 
            className="w-3/5 h-12 mb-10 text-2xl md:w-2/4 animate-pulse-scale bg-white text-orange-500 hover:text-white hover:bg-orange-500" 
            onClick={open} 
            rightSection={<IconCar size={30} />}
          >
            {t('calculateFare')}
          </Button>
        </div>
        <div className='md:overflow-hidden w-1/2 md:3/6 h-2/5'>
          <div className="bg-[url('/mercedies.png')] bg-contain bg-center bg-no-repeat w-full h-full animate-pulse-scale">
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
