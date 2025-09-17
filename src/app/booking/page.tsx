import BookingForm from '@/components/form/BookingForm'
import Footer from '@/components/Footer'
import React from 'react'
import { useTranslations } from 'next-intl'
import EnhancedNavbar from '@/components/EnhancedNavbar'

const Booking = () => {
  const t = useTranslations();

  return (
    <div className='w-full min-h-screen bg-background scroll-smooth'>
      <EnhancedNavbar/>

      {/* Hero/Banner Section */}
      <section className='relative w-full min-h-[40vh] md:min-h-[50vh] lg:min-h-[56vh] overflow-hidden'>
        {/* Background image */}
        <div className='absolute inset-0 bg-[url(/heroBg.jpg)] bg-center bg-cover scale-105' aria-hidden='true' />
        {/* Dark overlay for readability */}
        <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/30' aria-hidden='true' />

        {/* Content */}
        <div className='relative z-10 container mx-auto px-4 py-16 md:py-24 flex items-center'>
          <div className='max-w-3xl text-white drop-shadow-lg'>
            {/* Small badge */}
            <span className='inline-flex items-center rounded-full bg-white/10 backdrop-blur px-3 py-1 text-xs md:text-sm font-medium ring-1 ring-white/20 mb-4'>
              {t('services.badge_text')}
            </span>

            {/* Heading */}
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight'>
              {t('bookingHeading.partOne')}{' '}
              <span className='bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent'>
                {t('bookingHeading.partTwo')}
              </span>
            </h1>

            {/* Subtitle */}
            <p className='mt-3 text-base md:text-lg text-white/90 max-w-2xl'>
              {t('services.subtitle')}
            </p>

          </div>
        </div>
      </section>

      {/* Booking Form */}
      <div id='booking-form' className='scroll-mt-24'>
        <BookingForm/>
      </div>

      <Footer/>
    </div>
  )
}

export default Booking
