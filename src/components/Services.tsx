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
    <div className="relative z-10 w-full bg-yellow-100 p-3">
      <motion.h1
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 1 } }}
        className="text-orange-500 pt-5 m-0 text-center text-4xl"
      >
        {t("heading")}
      </motion.h1>
      <div className="w-full flex justify-center flex-col items-center">
        <h4 className="text-center p-1 text-2xl">{t("subtitle")}</h4>
      </div>
      <div className="p-1">
        <h4 className="text-center text-orange-400">{t("description")}</h4>
        <div className="md:flex md:flex-row md:items-center flex flex-col items-center justify-center">
          <motion.img
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
            src={"/taxiVector.png"}
            alt="taxi"
            className="md:w-2/5 w-4/5"
          />
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
            {list1.map((item: string, index: number) => (
              <List.Item key={index}>{item}</List.Item>
            ))}
          </List>
        </div>
      </div>
      <h4 className="text-center text-5xl text-orange-400 m-0 mt-4 mb-4">
        {t("section1Title")}
      </h4>
      <div className="md:flex md:flex-row md:items-center md:justify-center flex flex-col items-center justify-center">
        <motion.img
          initial={{opacity: 0, x: -100}}
          whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
          src={"/taxiVector2.jpg"}
          alt="taxi"
          className="md:w-2/6 w-4/5"
        />
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
          
          {list2.map((item: string, index: number) => (
            <List.Item key={index}>{item}</List.Item>
          ))}

        </List>
      </div>
    </div>
  );
};

export default Services;
