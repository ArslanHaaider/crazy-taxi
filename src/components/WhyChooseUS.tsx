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
      key:"reliableService",
    }
  ];

  return (
    <div className="relative w-full bg-[url('/chooseUs.jpg')] bg-cover bg-center" id="about">
    {/* Black Overlay */}
    <div className="absolute inset-0 bg-black bg-opacity-70 z-10"></div>
  
    <div className="relative flex items-center justify-center flex-col inset-0 h-full z-20">
      <h1 className="text-center text-[#F2EFE7] text-5xl">{t("title")}</h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 justify-items-center">
        {services.map(({ key }, index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.001 * index }}
            className="border border-solid border-gray-300 m-2 shadow-md bg-section-bg rounded-md md:w-4/5"
            viewport={{ once: true }} // ensures animation happens only once
          >
            <h3 className="text-primary flex justify-center items-center">
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
