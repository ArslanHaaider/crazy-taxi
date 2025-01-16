import BookingForm from '@/components/form/BookingForm'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'
const Booking = () => {
  return (
    <div className='w-full h-screen'>
        <Navbar/>
        <div className='w-full h-2/4 bg-[url(/heroBg.jpg)] bg-center bg-cover flex items-center'>
        <h1 className='inline-block bg-white text-black w-1/3 ml-2 sm:w-2/3 rounded-md text-5xl p-2'>Book Your <span className='text-orange-400 text-3xl font-bold text-5xl'> Ride!</span> </h1>
        </div>
      <BookingForm/>
      <Footer/>

    </div>
  )
}

export default Booking
