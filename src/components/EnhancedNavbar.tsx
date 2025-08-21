"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { gsap } from "gsap";
import {
  Home,
  Briefcase,
  Info,
  Phone,
  Mail,
  Car,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import StarBorder from "@/blocks/Animations/StarBorder/StarBorder";

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
} from "@/components/ui/navigation-menu";

interface NavItem {
  icon: React.ElementType;
  label: string;
  tag: string;
  href?: string;
}

const EnhancedNavbar: React.FC = () => {
  const router = useRouter();
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Animation refs
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const navItems: NavItem[] = [
    { icon: Home, label: t("home"), tag: "home" },
    { icon: Briefcase, label: t("services"), tag: "services" },
    { icon: Info, label: t("about"), tag: "about" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // GSAP animations for desktop nav
    if (typeof window !== "undefined" && navItemsRef.current) {
      const pills = pillRefs.current.filter(Boolean);
      const circles = circleRefs.current.filter(Boolean);

      circles.forEach((circle, index) => {
        if (!circle || !circle.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector<HTMLElement>(".pill-label");
        const hoverLabel = pill.querySelector<HTMLElement>(".pill-label-hover");

        if (label) gsap.set(label, { y: 0 });
        if (hoverLabel) {
          gsap.set(hoverLabel, { y: h + 12, opacity: 0 });
        }
      });

      // Initial load animation
      if (logoRef.current) {
        gsap.fromTo(logoRef.current, 
          { opacity: 0, x: -50 }, 
          { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
        );
      }

      if (navItemsRef.current) {
        gsap.fromTo(navItemsRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out" }
        );
      }
    }
  }, []);

  const handlePillHover = (index: number, isEntering: boolean) => {
    const circle = circleRefs.current[index];
    if (!circle) return;

    const pill = circle.parentElement as HTMLElement;
    const rect = pill.getBoundingClientRect();
    const h = rect.height;

    const tl = gsap.timeline({ paused: true });
    
    if (isEntering) {
      tl.to(circle, { scale: 1.2, duration: 0.3, ease: "power2.out" });
      tl.to(pill.querySelector(".pill-label"), { y: -(h + 8), duration: 0.3, ease: "power2.out" }, 0);
      tl.to(pill.querySelector(".pill-label-hover"), { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }, 0);
    } else {
      tl.to(circle, { scale: 0, duration: 0.2, ease: "power2.in" });
      tl.to(pill.querySelector(".pill-label"), { y: 0, duration: 0.2, ease: "power2.in" }, 0);
      tl.to(pill.querySelector(".pill-label-hover"), { y: h + 12, opacity: 0, duration: 0.2, ease: "power2.in" }, 0);
    }

    tl.play();
  };

  const scrollToSection = (sectionId: string, index: number) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(index);
      setIsMobileMenuOpen(false);
    }
  };

  const handleBooking = () => {
    router.push("/booking");
    setIsMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'de' : 'en';
    const currentPath = window.location.pathname;
    const newPath = currentPath.startsWith('/' + locale) 
      ? currentPath.replace('/' + locale, '/' + newLocale)
      : '/' + newLocale + currentPath;
    router.push(newPath);
  };

  const handleLogoClick = () => {
    router.push("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-amber-500/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        {/* Top Contact Bar */}
        <div className="hidden md:flex justify-end items-center px-6 py-2 bg-amber-500 text-black text-sm">   
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
              <Phone size={16} />
              <span>+49 6142499601</span>
            </div>
            <div className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
              <Mail size={16} />
              <span>flughafentransfer123@hotmail.com</span>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex items-center justify-center px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl w-full">
            {/* Logo */}
            <div
              ref={logoRef}
              className="flex items-center cursor-pointer transition-transform hover:scale-105"
              onClick={handleLogoClick}
            >
              <Image
                src="/navbarLogo.png"
                alt={t("logoAlt")}
                width={160}
                height={90}
                className="lg:w-[10rem] h-auto"
                priority
              />
            </div>

            {/* Desktop Navigation - Centered */}
            <div ref={navItemsRef} className="hidden md:flex items-center">
              <NavigationMenu>
                <NavigationMenuList className="flex items-center gap-2">
                  {navItems.map((item, index) => (
                    <NavigationMenuItem key={item.tag}>
                      <NavigationMenuLink
                        ref={(el: HTMLAnchorElement | null) => {
                          pillRefs.current[index] = el;
                          return undefined;
                        }}
                        className={`relative overflow-hidden inline-flex items-center justify-center h-12 px-6 rounded-full font-semibold text-black transition-all duration-300 cursor-pointer ${
                          activeSection === index
                            ? "bg-amber-400"
                            : "bg-amber-300/80 hover:bg-amber-400/90"
                        }`}
                        onClick={() => scrollToSection(item.tag, index)}
                        onMouseEnter={() => handlePillHover(index, true)}
                        onMouseLeave={() => handlePillHover(index, false)}
                      >
                        <span
                          className="hover-circle absolute left-1/2 bottom-0 rounded-full bg-white opacity-20"
                          ref={(el:HTMLSpanElement | null) => {
                            circleRefs.current[index] = el;
                            return undefined;
                          }}
                          aria-hidden="true"
                        />
                        <div className="label-stack relative z-10 flex items-center gap-2">
                          <span className="pill-label flex items-center gap-2">
                            <item.icon size={18} />
                            {item.label}
                          </span>
                          <span className="pill-label-hover absolute left-0 top-0 opacity-0 flex items-center gap-2">
                            <item.icon size={18} />
                            {item.label}
                          </span>
                        </div>
                        {activeSection === index && (
                          <span
                            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-primary"
                            aria-hidden="true"
                          />
                        )}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Right Section with Language Toggle and Book Button */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Compact Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              >
                {locale === 'en' ? 'DEU' : 'ENG'}
              </button>
              
              {/* Enhanced Book Button with StarBorder Animation */}
                  <Button
                    className="bg-blue-500 text-white hover:bg-blue-600 text-xl h-16 mt-4 animate-pulse-scale flex items-center gap-3"
                    onClick={() => {
                      router.push("/booking");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Car size={32} />
                    {t("book")}
                  </Button>
            </div>    
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${
                    isScrolled ? "text-black" : "text-white"
                  } hover:bg-amber-500/20`}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-2xl font-bold">
                    {t("navigation")}
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  {navItems.map((item, index) => (
                    <Button
                      key={item.tag}
                      variant={activeSection === index ? "default" : "outline"}
                      className="justify-start text-lg h-14 flex items-center gap-3"
                      onClick={() => scrollToSection(item.tag, index)}
                    >
                      <item.icon size={24} />
                      {item.label}
                    </Button>
                  ))}
  <StarBorder
  as="button"
  className="bg-black text-white"
  color="cyan"
  speed="5s"
>
Book NOW
</StarBorder>
                </div>
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={toggleLanguage}
                    className="w-full px-4 py-3 text-lg font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {locale === 'en' ? 'Deutsch' : 'English'}
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
};

export default EnhancedNavbar;