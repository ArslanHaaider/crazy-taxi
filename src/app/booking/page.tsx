import BookingForm from '@/components/form/BookingForm'
import Footer from '@/components/Footer'
import React from 'react'
import { useTranslations } from 'next-intl'
import EnhancedNavbar from '@/components/EnhancedNavbar'
const Booking = () => {
  const t = useTranslations();
  return (
    <div className='w-full h-screen'>
        <EnhancedNavbar/>
        <div className='w-full h-2/4 bg-[url(/heroBg.jpg)] bg-center bg-cover flex items-center'>
        <h1 className='inline-block bg-white text-black w-1/3 ml-2 sm:w-2/3 rounded-md text-5xl p-2'>{t('bookingHeading.partOne')} <span className='text-primary text-3xl font-bold text-5xl'> {t('bookingHeading.partTwo')}</span> </h1>
        </div>
      <BookingForm/>
      <Footer/>

    </div>
  )
}

export default Booking
