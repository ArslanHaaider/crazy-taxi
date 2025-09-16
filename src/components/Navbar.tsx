"use client";

import {
  Briefcase,
  Car,
  Home,
  Info,
  Phone,
  Mail,
  Menu,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LocaleSwitcher from "./LocalSwitcher";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { RainbowButton } from "@/components/ui/rainbowButton";

const Navbar = () => {
  const router = useRouter();
  const t = useTranslations("Navbar");
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  
  const scrollToSection = (id: string, index: number) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(index);
    setMenuIsOpen(false);
  };
  
  const data = [
    { icon: Home, label: t("home"), tag: "home" },
    { icon: Briefcase, label: t("services"), tag: "services" },
    { icon: Info, label: t("about"), tag: "about" },
    { icon: MessageSquare, label: t("testimonials"), tag: "testimonials" },
  ];

  const [active, setActive] = useState(0);

  return (
    <>
      <div className="bg-transparent sticky top-0 z-50 w-full">
        {/* Top contact bar */}
        <div className="hidden md:flex justify-end items-center px-6 py-2 bg-primary text-white text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>+49 6142499601</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>flughafentransfer123@hotmail.com</span>
            </div>
          </div>
        </div>
        
        {/* Main navbar */}
        <div className="flex items-center justify-between px-4 py-3 bg-transparent">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/navbarLogo.png"
              alt={t("logoAlt")}
              width={160}
              height={90}
              className="lg:w-[10rem] bg-primary cursor-pointer"
              onClick={() => router.push("/")}
            />
          </div>
          
          {/* Language Switcher */}
          <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
            <LocaleSwitcher />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center gap-1">
                {data.map((item, index) => (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} bg-primary text-white hover:bg-primary-hover flex items-center gap-2 px-4 py-2 rounded-md font-bold transition-all cursor-pointer ${
                        index === active ? 'bg-primary-hover' : ''
                      }`}
                      onClick={() => scrollToSection(item.tag, index)}
                    >
                      <item.icon size={20} />
                      {item.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
                <NavigationMenuItem>
                  <RainbowButton
                    className="text-lg animate-pulse-scale flex items-center gap-2"
                    onClick={() => router.push("/booking")}
                  >
                    <Car size={20} />
                    {t("book")}
                  </RainbowButton>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={menuIsOpen} onOpenChange={setMenuIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[400px]">
                <SheetHeader>
                  <SheetTitle>{t("navigation")}</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  {data.map((item, index) => (
                    <Button
                      key={item.label}
                      variant={index === active ? "default" : "ghost"}
                      className="justify-start text-lg h-12 flex items-center gap-3"
                      onClick={() => scrollToSection(item.tag, index)}
                    >
                      <item.icon size={24} />
                      {item.label}
                    </Button>
                  ))}
                  <RainbowButton
                    className="text-xl h-16 mt-4 animate-pulse-scale flex items-center gap-3"
                    onClick={() => {
                      router.push("/booking");
                      setMenuIsOpen(false);
                    }}
                  >
                    <Car size={32} />
                    {t("book")}
                  </RainbowButton>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
