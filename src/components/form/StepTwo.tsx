

import { Button } from '@mantine/core'
import Image from 'next/image'
import React from 'react'

const StepTwo = () => {
  return (
    <div  className='w-full h-full flex flex-col items-center justify-center'>
      <CarCard/>
    </div>
  )
}

export default StepTwo



const CarCard = ()=>{
    return (
        <div className='border border-solid border-black w-3/4 h-52 flex items-center justify-evenly'>
            <Image src={'/mercedies.png'} width={300} height={150} alt=""/>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-2xl font-bold text-gray-400'>Mercedes-Benz</h1>
                <h1 className='text-2xl font-bold'>GLA 200</h1>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-xl font-bold text-gray-400'>Cost</h1>
                <h1 className='text-xl font-bold'>$100</h1>
            </div>
            <Button variant="filled" color={'orange'}>Choose</Button>
        </div>
    )
}