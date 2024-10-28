"use client";
import { Image, List, rem, ThemeIcon } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";

const Services = () => {
  return (
    <div className="relative z-10 w-full">
      <h1 className="text-orange-500 pt-5 m-0 text-center">Our Services</h1>
      <div className="w-full flex justify-center flex-col items-center">
        <h4 className="text-center p-1">
          Looking for Reliable Transportation to and from Frankfurt Airport?
        </h4>
        <Image src={"/services.jpg"} alt="taxi" className="w-4/5"></Image>
      </div>
      <div className="p-1">
        <h4 className="text-center text-orange-400">
          We provide Dependable and timely airport transportation service in
          Frankfur
        </h4>
        <List
          spacing="xs"
          size="sm"
          center
          className="p-1"
          icon={
            <ThemeIcon color="orange" size={24} radius="xl" className="ml-3">
              <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
            </ThemeIcon>
          }
        >
          <List.Item>
            Door-to-door airport transfer service in Frankfurt, ensuring timely
            and safe arrival for your flight.
          </List.Item>
          <List.Item>
            Pick-up from Frankfurt Airport with a name sign, providing
            stress-free recognition and efficient service.
          </List.Item>
          <List.Item>
            Available for travel anywhere in Germany or Europe, including nearby
            cities like Mainz, Heidelberg, and any other German airport.
          </List.Item>
          <List.Item>
            Extended services for event transfers, city tours, trade fairs, and
            other destinations across Europe.
          </List.Item>
          <List.Item>
            24/7 availability to accommodate plan changes and last-minute
            schedules.
          </List.Item>
        </List>
      </div>
      <div className="w-full flex justify-center flex-col items-center">
                  <h4 className="text-center p-1 text-orange-400">
          Our services include
        </h4>
        <Image src={"/services2.jpg"} alt="taxi" className="w-5/6"></Image>
      </div>
      <div>
      <List
          spacing="xs"
          size="sm"
          center
          className="p-1 mt-5"
          icon={
            <ThemeIcon color="green" size={24} radius="xl" className="ml-3">
              <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
            </ThemeIcon>
          }
        >
          <List.Item>
          Airport transfer & airport shuttle
          </List.Item>
          <List.Item>
          Pick up with name tag *
          </List.Item>
          <List.Item>
          City tours & event trips
          </List.Item>
          <List.Item>
          Courier service
          </List.Item>
          <List.Item>
          Luggage service
          </List.Item>
        </List> 
      </div>
    </div>
  );
};

export default Services;
