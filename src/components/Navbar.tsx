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
import { useRouter } from "next/navigation";
import { useState } from "react";
import LocaleSwitcher from "./LocalSwitcher";
import { useTranslations } from "next-intl";

const Navbar = () => {
  const router = useRouter();
  const t = useTranslations("Navbar");
  const [menuIsOpen, { open, close }] = useDisclosure(false, {
    onOpen: () => console.log("Opened"),
    onClose: () => console.log("Closed"),
  });

  const data = [
    { icon: IconHome, label: t("home") },
    {
      icon: IconBriefcase,
      label: t("services"),
      rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
    },
    { icon: IconInfoCircle, label: t("about") },
  ];

  const [active, setActive] = useState(0);

  return (
    <>
      <Container fluid h={80} className="bg-[#ffffff] flex p-0 sticky w-full">
        <Container
          fluid
          h={90}
          className="w-2/5 flex items-start justify-start flex-col"
        >
          <Image
            src={"/taxiLogo.png"}
            alt={t("logoAlt")}
            width={100}
            height={80}
            className="lg:w-[13rem] bg-orange-500"
            onClick={() => router.push("/")}
          ></Image>
        </Container>
        <LocaleSwitcher />
        <Container fluid h={140} className="flex p-0 m-0 flex-col w-3/5">
          <Container fluid h={60} className="text-black flex items-end">
            <Container
              fluid
              className="justify-center items-center ml-10 font-sans hidden md:flex"
            >
              <IconPhone size="2rem" color="orange" stroke={1.5} />
              <div className="flex flex-col justify-center">
                <p className="m-0 text-lg md:inline">{t("callNow")}</p>
                <p className="m-0 font-bold md:inline">0614-261111</p>
              </div>
            </Container>
            <Container
              fluid
              className="md:flex justify-center items-center font-sans p-0 m-0 hidden"
            >
              <IconMail size="2rem" color="orange" stroke={1.5} />
              <div className="flex flex-col justify-center">
                <p className="m-0 text-lg">{t("emailNow")}</p>
                <p className="m-0 font-bold text-lg md:inline line-block">
                  info.Ridek@Mail.com
                </p>
              </div>
            </Container>
          </Container>
          <Container
            fluid
            h={70}
            className="bg-primary w-full rounded-md justify-evenly text-white items-center hidden sm:hidden md:flex diagonal-border-left"
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
                className="font-bold flex justify-center items-center mt-4 hover:transition-all hover:bg-orange-600 rounded-md"
                variant="light"
              />
            ))}
            <div className="flex justify-center items-center w-full">
              <Button
                color="black"
                className="text-xl animate-pulse-scale"
                rightSection={<IconCar size={20} />}
                onClick={() => router.push("/booking")}
              >
                {t("book")}
              </Button>
            </div>
          </Container>
        </Container>

        <Container
          fluid
          h={80}
          className="bg-white w-3/5 flex justify-end items-center md:hidden"
        >
          <Burger
            opened={menuIsOpen}
            onClick={open}
            aria-label={t("toggleNav")}
          />
        </Container>
      </Container>
      <Drawer
        opened={menuIsOpen}
        onClose={close}
        size="sm"
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
            onClick={() => router.push("/booking")}
          >
            {t("book")}
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
