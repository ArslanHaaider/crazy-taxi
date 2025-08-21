"use client";
import { List, rem, ThemeIcon } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
const Services = () => {
  const t = useTranslations("services");
  const list1 = [
    t("list1_item1"),
    t("list1_item2"),
    t("list1_item3"),
    t("list1_item4"),
    t("list1_item5")
  ];
  
  const list2 = [
    t("list2_item1"),
    t("list2_item2"),
    t("list2_item3"),
    t("list2_item4"),
    t("list2_item5")
  ];
  return (
    <div className="relative z-10 w-full bg-background py-16 px-4" id="services">
      <motion.h1
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 1 } }}
        className="text-display text-4xl md:text-5xl text-primary text-center mb-4"
      >
        {t("heading")}
      </motion.h1>
      <div className="w-full flex justify-center flex-col items-center">
        <h4 className="text-heading text-xl md:text-2xl text-text-secondary text-center mb-8">{t("subtitle")}</h4>
      </div>
      <div className="max-w-6xl mx-auto">
        <h4 className="text-body text-center text-text-secondary mb-8">{t("description")}</h4>
        <div className="md:flex md:flex-row md:items-center flex flex-col items-center justify-center">
          <motion.img
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
            src={"/services1.jpg"}
            alt="taxi"
            className="md:w-2/5 w-3/5 rounded-md"
          />
          <List
            spacing="md"
            size="md"
            center
            className="p-4"
            icon={
              <ThemeIcon color="yellow" size={24} radius="xl" className="ml-3 bg-primary">
                <IconCircleCheck style={{ width: rem(16), height: rem(16) }} className="text-white" />
              </ThemeIcon>
            }
          >
            {list1.map((item: string, index: number) => (
              <List.Item key={index} className="text-body text-text-primary">
                {item}
              </List.Item>
            ))}
          </List>
        </div>
      </div>
      <h4 className="text-display text-3xl md:text-4xl text-primary text-center m-0 mt-12 mb-8">
        {t("section1Title")}
      </h4>
      <div className="md:flex md:flex-row md:items-center md:justify-center flex flex-col items-center justify-center">
        <motion.img
          initial={{opacity: 0, x: -100}}
          whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
          src={"/taxiVector2.jpg"}
          alt="taxi"
          className="md:w-2/5 w-3/5 rounded-md"
        />
        <List
          spacing="md"
          size="md"
          center
          className="p-4 mt-5"
          icon={
            <ThemeIcon color="green" size={24} radius="xl" className="ml-3 bg-secondary">
              <IconCircleCheck style={{ width: rem(16), height: rem(16) }} className="text-white" />
            </ThemeIcon>
          }
        >
          {list2.map((item: string, index: number) => (
            <List.Item key={index} className="text-body text-text-primary">
              {item}
            </List.Item>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Services;
