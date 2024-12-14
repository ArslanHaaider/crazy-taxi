"use client";
import { IconStar } from "@tabler/icons-react";
import React from "react";
import { motion } from "motion/react";
import {useTranslations} from 'next-intl';

const WhyChooseUS = () => {
  const t  = useTranslations("whyChooseUs");

  const services = [
    {
      key: "fixedPrice",
    },
    {
      key: "cancelFree",
    },
    {
      key: "ourServices",
    },
    {
      key: "reliableTransfers",
    },
    {
      key: "doorToDoor",
    },
    {
      key: "meetAndGreet",
    },
  ];

  return (
    <div className="relative w-full bg-[url('/chooseUs.jpg')] bg-cover bg-center">
      <div className="bg-black bg-opacity-20 flex items-center justify-center flex-col inset-0 h-full">
        <h1 className="text-center text-orange-400 text-5xl">{t("title")}</h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 justify-items-center">
          {services.map(({ key }, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 2, delay: 0.001 * index } }}
              className="border border-solid border-gray-300 m-2 shadow-md bg-yellow-100 rounded-md md:w-1/2"
            >
              <h3 className="text-orange-400 flex justify-center items-center">
                <IconStar className="mr-2" /> {t(`${key}.title`)}
              </h3>
              <p className="text-center p-2">{t(`${key}.description`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUS;
