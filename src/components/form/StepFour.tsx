

import { Divider, SegmentedControl } from '@mantine/core'
import React from 'react'

const StepFour = () => {
  return (
    <div className='w-full md:flex gap-5'>
        <div className='w-full p-5 border border-solid border-orange-500 bg-yellow-50 font-sans rounded-md shadow-lg'>
            <h2>Ride info</h2>
            <div className='w-full'>
                <h3>Ride Type</h3>
                 <p className='text-'>One Way</p>
            </div>
            <Divider color='orange'/>
            <div className='w-full'>
                <h3>Car Model</h3>
                 <p>Mercedies V </p>
            </div>
            <Divider color='orange'/>
            <div className='w-full'>
                <h3>From</h3>
                <p>123 Main St, New York, NY 10001</p>
            </div>
            <Divider color='orange'/>

            <div className='w-full'>
                <h3>To</h3>
                <p>456 Park Ave, New York, NY 10002</p>
            </div>
            <Divider color='orange'/>

            <div className='w-full'>
                <h3>Departure Date</h3>
                <p>2023-05-01</p>
            </div>
            <Divider color='orange'/>

            <div className='w-full'>
                <h3>Departure Time</h3>
                <p>12:00 PM</p>
            </div>
            <Divider color='orange'/>

            <div className='w-full'>
                <h3>Number of Passengers</h3>
                <p>1</p>
            </div>
            <Divider color='orange'/>

            <div className='w-full'>
                <h3>Luggage</h3>
                <p>1</p>
            </div>
        </div>
        <div className='w-full p-5 border border-solid border-orange-500 bg-yellow-50 font-sans rounded-md shadow-lg mt-5 md:mt-0'>
          <h2>Contact and Billing Info</h2>
          <div className='w-full'>
              <h3>Name</h3>
              <p>Ahmed</p>
              <Divider size={"xs"} color='orange'/>
          </div>
          <div className='w-full'>
              <h3>Email</h3>
              <p>Ahmed@gmail.com</p>
              <Divider size={"xs"} color='orange'/>
          </div>
          <div className='w-full'>
              <h3>Phone No</h3>
              <p>090078601</p>
              <Divider size={"xs"} color='orange'/>
          </div>
          <div className='w-full'>
              <h3>Phone No</h3>
              <p>090078601</p>
              <Divider size={"xs"} color='orange'/>
          </div>
          <div className='w-full'>
              <h3>Ride Charges</h3>
              <p>$48</p>
              <Divider size={"xs"} color='orange'/>
          </div>
          <div className='w-full'>
              <h3>Booking Fee</h3>
              <p>$3</p>
              <Divider size={"xs"} color='orange'/>
          </div>
          <div className='w-full'>
              <h3>Tax</h3>
              <p>$5</p>
              <Divider size={"xs"} color='orange'/>
          </div>
          <div className='w-full'>
              <h3>Total</h3>
              <p>$56</p>
              <Divider size={"xs"} color='orange'/>
          </div>

          <div className='w-full'>
                <h3>Payment Method</h3>
                <SegmentedControl  size={'md'} color="orange" data={['Paypal', 'Card', 'Cash']} />
            </div>
        </div>

    </div>
  )
}

export default StepFour
