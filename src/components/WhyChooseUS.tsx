"use client";
import { IconStar } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import {useTranslations} from 'next-intl';
import SpotlightCard from "../blocks/Components/SpotlightCard/SpotlightCard";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const WhyChooseUS = () => {
  const t  = useTranslations("whyChooseUs");
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

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

  useEffect(() => {
    if (!api) {
      return;
    }

    setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 4000);
  }, [api, current]);

  return (
    <div className="relative w-full bg-[url('/chooseUs.jpg')] bg-cover bg-center py-20" id="about">
    {/* Black Overlay */}
    <div className="absolute inset-0 bg-black bg-opacity-70 z-10"></div>
  
    <div className="relative flex items-center justify-center flex-col inset-0 h-full z-20">
      <h1 className="text-display-lg text-center text-[#F2EFE7] mb-10">{t("title")}</h1>
      <div className="w-full max-w-6xl mx-auto px-4">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {services.map(({ key }, index) => (
              <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={key}>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 2, delay: 0.001 * index }}
                  className="p-2 h-full"
                  viewport={{ once: true }}
                >
                  <SpotlightCard 
                    className="!bg-card !border-border !rounded-md !p-4 shadow-lg !text-card-foreground h-full"
                    spotlightColor="rgba(255, 193, 7, 0.15)"
                  >
                    <h3 className="text-primary flex justify-center items-center">
                      <IconStar className="mr-2" /> {t(`${key}.title`)}
                    </h3>
                    <p className="text-center p-2 text-muted-foreground">{t(`${key}.description`)}</p>
                  </SpotlightCard>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  </div>
  
  );
};

export default WhyChooseUS;
