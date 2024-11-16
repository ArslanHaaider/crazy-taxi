import BookingForm from '@/components/form/BookingForm'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'
const Booking = () => {
  return (
    <div className='w-full h-screen'>
        <Navbar/>
        <div className='w-full h-1/4 bg-[url(/heroBg.jpg)] bg-center bg-cover '>

        </div>
      <BookingForm/>
      <Footer/>

    </div>
  )
}

export default Booking
