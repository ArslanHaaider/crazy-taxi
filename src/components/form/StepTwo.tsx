

import { Button } from '@mantine/core'
import Image from 'next/image'
import React from 'react'

const carsArray = [{
  name: 'Mercedies Benz E Class ',
  cost: '$200',
  image: '/mercedies.png'
},{
  name: 'VolksWagen Touran',
  cost: '$140',
  image: '/VolksWagen.Png'
},{
  name: 'Mercedies V Class',
  cost: '$400',
  image: '/mercediesVClass.Png'
}]
const StepTwo = () => {
  return (
    <div  className='w-full h-full flex flex-col items-center justify-center'>
      {carsArray.map((car, index) => (
        <CarCard key={index} name={car.name} cost={car.cost} image={car.image} />
      ))}
    </div>
  )
}

export default StepTwo


type CarCardProps = {
  name: string,
  cost: string,
  image: string
}
const CarCard = ({name,image}:CarCardProps)=>{
    return (
        <div className='border border-solid border-orange-400 w-10/12  h-[500px] md:h-52 flex items-center justify-evenly rounded-md mt-2 flex-col md:flex-row bg-orange-100'>
            <Image src={image} width={200} height={100} alt="" className='w-52 h-36 md:w-72'/>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-2xl font-bold text-gray-400'>Model</h1>
                <h1 className='text-xl font-bold text-wrap w-30 '>{name}</h1>
            </div>
            <Button variant="filled" color={'orange'}>Choose</Button>
        </div>
    )
}