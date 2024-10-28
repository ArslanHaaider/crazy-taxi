import { Button, Text } from '@mantine/core'
import { IconCar } from '@tabler/icons-react'
import React from 'react'

const Hero = () => {
  return (
    <div className="bg-[url('/heroBg.jpg')] bg-cover bg-center w-100vw h-[100vh] flex justify-center font-sans" >
      <div className='flex text-white w-full flex-col justify-end items-center md:flex-row lg-flex-row'>
      <div className='w-full flex flex-col items-center justify-evenly  h-1/3 md:h-2/4 md:w-3/6'>
      <Text size='xl'>Travel Securely with Us</Text> 
      <h1 className='m-0 text-4xl'>Book you taxi from</h1>
      <h1 className='m-0 text-4xl'>anywhere today!</h1>
      <Button className="w-3/5 h-12 mb-10 text-2xl md:w-2/4 animate-pulse-scale bg-primary" rightSection={<IconCar size={30} />} >BOOK NOW </Button>
      </div>
      <div className='md:overflow-hidden w-1/2 md:3/6 h-2/5 '>
      <div className="bg-[url('/carBg.png')] bg-contain bg-center bg-no-repeat w-full  h-full animate-pulse-scale ">
      </div>
      </div>
      </div>
    </div>
  ) 
}

export default Hero
