"use client";

import { Burger, Button, Container, Drawer, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBriefcase,
  IconCar,
  IconChevronRight,
  IconHome,
  IconInfoCircle,
  IconPhone,
  IconMail,
} from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
const Navbar = () => {
  const [menuIsOpen, { open, close }] = useDisclosure(false, {
    onOpen: () => console.log("Opened"),
    onClose: () => console.log("Closed"),
  });

  const data = [
    { icon: IconHome, label: "Home" },
    {
      icon: IconBriefcase,
      label: "Services",
      rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
    },
    { icon: IconInfoCircle, label: "About" },
  ];
  const [active, setActive] = useState(0);
  return (
    <>
      <Container fluid h={80} className="bg-[#ffffff] flex p-0 mt ">
        <Container
          fluid
          h={90}
          className=" w-2/5 flex justify-center flex-col items-center"
        >
          <Image
            src={"/taxiLogo.png"}
            alt="not found"
            width={120}
            height={50}
            className="lg:w-[13rem]"
          ></Image>
        </Container>

        <Container fluid h={140} className="flex p-0 m-0 flex-col w-3/5">
          <Container fluid h={60} className="text-black flex items-end">
            <Container
              fluid
              className=" justify-center items-center ml-10 font-sans hidden md:flex"
            >
              <IconPhone size="2rem" color="orange" stroke={1.5} />
              <div className="flex  flex-col justify-center">
                <p className="m-0 text-lg  md:inline ">Call NOW</p>
                <p className="m-0 font-bold  md:inline">
                  5267-214-392
                </p>
              </div>
            </Container>
            <Container
              fluid
              className="md:flex justify-center items-center font-sans p-0 m-0 hidden"
            >
              <IconMail size="2rem" color="orange" stroke={1.5} />
              <div className="flex  flex-col justify-center">
                <p className="m-0 text-lg">Email Now</p>
                <p className="m-0 font-bold  text-lg md:inline  line-block">
                  info.Ridek@Mail.com
                </p>
              </div>
            </Container>
          </Container>
          <Container
            fluid
            h={70}
            className="bg-primary w-full  justify-evenly text-white items-center hidden  sm:hidden md:flex diagonal-border-left"
          >
            {data.map((item, index) => (
              <NavLink
                href="#required-for-focus"
                key={item.label}
                active={index === active}
                label={item.label}
                leftSection={<item.icon size="2rem" stroke={1.5} />}
                onClick={() => setActive(index)}
                color="white"
                className="font-bold flex justify-center items-center mt-4 hover:transition-all hover:bg-orange-600"
                variant="light"
              />
            ))}
            <div className="flex justify-center items-center w-full">
              <Button
                color="black"
                className="text-xl animate-pulse-scale"
                rightSection={<IconCar size={20} />}
              >
                BOOK
              </Button>
            </div>
          </Container>
        </Container>

        <Container
          fluid
          h={80}
          className="bg-white w-3/5 flex justify-end items-center md:hidden "
        >
          <Burger
            opened={menuIsOpen}
            onClick={open}
            aria-label="Toggle navigation"
          />
        </Container>
      </Container>
      <Drawer
        opened={menuIsOpen}
        onClose={close}
        size={`sm`}
        position="bottom"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        {data.map((item, index) => (
          <NavLink
            href="#required-for-focus"
            key={item.label}
            active={index === active}
            label={item.label}
            leftSection={<item.icon size="2rem" stroke={1.5} />}
            onClick={() => setActive(index)}
            color="orange"
            className="font-bold flex justify-center items-center mt-4"
          />
        ))}

        <div className="flex justify-center items-center w-full">
          <Button
            color="orange"
            className="w-2/3 h-20 mt-10 text-3xl animate-pulse-scale"
            rightSection={<IconCar size={40} />}
          >
            BOOK
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
