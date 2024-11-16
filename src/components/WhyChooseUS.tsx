"use client";
import { IconStar } from "@tabler/icons-react";
import React from "react";

const WhyChooseUS = () => {
  return (
    <div className="relative w-full h-[250vh] bg-[url('/chooseUs.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 h-full bg-black bg-opacity-20 flex items-center justify-center">
        <div className="w-flull">
          <h1 className="text-center text-orange-400">Why choose us?</h1>
          <div className="border border-solid border-gray-300  m-2 shadow-md bg-yellow-50">
            <h3 className="text-orange-400 flex justify-center items-center">
              <IconStar color="orange"></IconStar>FIXED PRICE GUARANTEE
            </h3>
            <p className="p-1 text-center">
              Begin your trip, whether for leisure or business, with peace of
              mind. With our fixed rates, there’s no need to worry about extra
              fees or hidden costs. Both our airport transfers and our pricing
              are clear and dependable
            </p>
          </div>
          <div className="border border-solid border-gray-300  m-2 shadow-md  bg-yellow-50">
            <h3 className="text-orange-400 flex justify-center items-center">
              <IconStar></IconStar>CANCEL FOR FREE
            </h3>
            <p className="text-center">
              Plans changed? No problem! At FH Airport Transfer, we offer a
              flexible cancellation policy with no booking or credit card fees,
              as long as you cancel at least 4 hours before your scheduled
              journey.
            </p>
          </div>
          <div className="border border-solid border-gray-300  m-2 shadow-md bg-yellow-50">
            <h3 className="text-orange-400 flex justify-center items-center">
              {" "}
              <IconStar></IconStar>OUR SERVICES
            </h3>
            <p className="text-center">
              Alongside our airport transfer and shuttle services in Frankfurt,
              we offer a variety of other options to enhance your travel
              experience. Sit back and enjoy the ride while we handle all the
              details. Explore our range of services to ensure a smooth and
              enjoyable journey.
            </p>
          </div>
          <div className="border border-solid border-gray-300  m-2 shadow-md bg-yellow-50">
            <h3 className="text-orange-400 flex justify-center items-center">
              <IconStar></IconStar>RELIABLE TRANSFERS
            </h3>
            <p className="text-center">
              Our airport transfer service in Frankfurt is something you can
              trust! We offer stress-free, timely, and secure transportation to
              Frankfurt Airport or any other destination. Our long-standing
              experience reflects our commitment to quality.
            </p>
          </div>
          <div className="border border-solid border-gray-300  m-2 shadow-md bg-yellow-50">
            <h3 className="text-orange-400 flex justify-center items-center">
              <IconStar></IconStar>DOOR-TO-DOOR SERVICE
            </h3>
            <p className="text-center">
              Our drivers provide punctual pickup at Frankfurt Airport and take
              you straight to your destination’s doorstep. We’re also available
              to pick you up from your home and drive you to the airport on
              time—more convenient, efficient, and cost-effective than a taxi.
            </p>
          </div>
          <div className="border border-solid border-gray-300  m-2 shadow-md bg-yellow-50">
            <h3 className="text-orange-400 text-center flex justify-center items-center">
              {" "}
              <IconStar className="ml-5"></IconStar>MEET & GREET SERVICE
            </h3>
            <p className="text-center">
              Even if your flight is delayed, your driver will be waiting for
              you with a name sign after baggage claim. No need to search or
              wait—just continue your journey seamlessly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUS;
