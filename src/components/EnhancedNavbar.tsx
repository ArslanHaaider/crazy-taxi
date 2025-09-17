"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import {
  Home,
  Briefcase,
  Info,
  Phone,
  Mail,
  Car,
  Menu,
  Sun,
  Moon,
  type LucideIcon,
} from "lucide-react";
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
import { RainbowButton } from "@/components/ui/rainbowButton";

interface NavItem {
  icon: LucideIcon;
  label: string;
  tag: string;
}

const EnhancedNavbar: React.FC = () => {
  const router = useRouter();
  const t = useTranslations("Navbar");
  const locale = useLocale();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const navItems: NavItem[] = [
    { icon: Home, label: t("home"), tag: "home" },
    { icon: Briefcase, label: t("services"), tag: "services" },
    { icon: Info, label: t("about"), tag: "about" },
  ];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem("theme");
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = (stored || (prefersDark ? "dark" : "light")) as "light" | "dark";
      applyTheme(initial);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyTheme = (theme: "light" | "dark") => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-mantine-color-scheme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-mantine-color-scheme", "light");
    }
    try {
      window.localStorage.setItem("theme", theme);
    } catch {}
    setIsDark(theme === "dark");
  };

  const toggleTheme = () => applyTheme(isDark ? "light" : "dark");

  const scrollToSection = (id: string, index: number) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveIndex(index);
    setIsMobileMenuOpen(false);
  };

  const toggleLanguage = async () => {
    const newLocale = locale === "en" ? "de" : "en";
    try {
      await fetch("/api/locale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale: newLocale }),
      });
      router.refresh();
    } catch {}
  };

  return (
    <nav className={`top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-card/80 backdrop-blur shadow-md sticky" : "bg-transparent"}`}>
      {/* Top Contact Bar */}
      <div className="hidden lg:flex justify-end items-center px-4 xl:px-6 py-2 bg-primary text-primary-foreground text-sm">
        <div className="flex items-center gap-4 xl:gap-6">
          <div className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
            <Phone size={14} className="xl:w-4 xl:h-4" />
            <span className="text-xs xl:text-sm">+49 6142499601</span>
          </div>
          <div className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
            <Mail size={14} className="xl:w-4 xl:h-4" />
            <span className="text-xs xl:text-sm truncate">flughafentransfer123@hotmail.com</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex items-center justify-center px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between max-w-7xl w-full">
          {/* Logo */}
          <div className="flex items-center cursor-pointer flex-shrink-0" onClick={() => router.push("/")}> 
            <Image 
              src="/navbarLogo.png" 
              alt={t("logoAlt") as string} 
              width={160} 
              height={90} 
              className="h-auto w-[6rem] xs:w-[7rem] sm:w-[8rem] md:w-[9rem] lg:w-[10rem] select-none" 
              priority 
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center gap-1 xl:gap-2">
                {navItems.map((item, index) => (
                  <NavigationMenuItem key={item.tag}>
                    <NavigationMenuLink
                      className={`inline-flex items-center gap-2 h-10 xl:h-11 px-4 xl:px-5 rounded-full font-semibold transition-colors cursor-pointer text-sm xl:text-base ${
                        activeIndex === index ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                      onClick={() => scrollToSection(item.tag, index)}
                    >
                      <item.icon size={16} className="xl:w-[18px] xl:h-[18px]" />
                      {item.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Tablet Navigation (md to lg) */}
          <div className="hidden md:flex lg:hidden items-center">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center gap-1">
                {navItems.map((item, index) => (
                  <NavigationMenuItem key={item.tag}>
                    <NavigationMenuLink
                      className={`inline-flex items-center gap-1 h-9 px-3 rounded-full font-medium transition-colors cursor-pointer text-sm ${
                        activeIndex === index ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                      onClick={() => scrollToSection(item.tag, index)}
                    >
                      <item.icon size={14} />
                      <span className="hidden md:inline">{item.label}</span>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Section - Desktop & Tablet */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3 flex-shrink-0">
            <button
              onClick={toggleTheme}
              aria-pressed={isDark}
              aria-label="Toggle dark mode"
              className="px-2 lg:px-3 py-1.5 text-xs lg:text-sm font-medium rounded-full border bg-muted text-foreground hover:bg-muted/80 transition-colors flex items-center gap-1 lg:gap-2"
            >
              {isDark ? <Sun size={14} className="lg:w-4 lg:h-4" /> : <Moon size={14} className="lg:w-4 lg:h-4" />}
              <span className="hidden xl:inline">{isDark ? "Light" : "Dark"}</span>
            </button>
            <button
              onClick={toggleLanguage}
              className="px-2 lg:px-3 py-1.5 text-xs lg:text-sm font-medium rounded-full border bg-muted text-foreground hover:bg-muted/80 transition-colors"
            >
              {locale === "en" ? "DE" : "EN"}
            </button>
            <RainbowButton 
              onClick={() => router.push("/booking")} 
              className="bg-blue-600 text-xs lg:text-sm px-3 lg:px-4 h-8 lg:h-9"
            >
              <Car size={16} className="lg:w-5 lg:h-5" />
              <span className="hidden lg:inline">{t("book")}</span>
            </RainbowButton>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2 flex-shrink-0">
            <button
              onClick={toggleTheme}
              aria-pressed={isDark}
              aria-label="Toggle dark mode"
              className="p-2 rounded-full border bg-muted text-foreground hover:bg-muted/80 transition-colors flex items-center justify-center"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={toggleLanguage}
              className="px-2 py-1.5 text-xs font-medium rounded-full border bg-muted text-foreground hover:bg-muted/80 transition-colors"
            >
              {locale === "en" ? "DE" : "EN"}
            </button>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-muted p-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[85vh] max-h-[500px] min-h-[400px]">
                <SheetHeader className="pb-4">
                  <SheetTitle className="text-xl sm:text-2xl font-bold">{t("navigation")}</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-3 sm:gap-4 h-full overflow-y-auto">
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <button 
                      onClick={toggleTheme} 
                      aria-pressed={isDark} 
                      className="px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-lg font-medium rounded-full border bg-muted text-foreground hover:bg-muted/80 transition-colors flex items-center justify-center gap-2"
                    >
                      {isDark ? <Sun size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Moon size={16} className="sm:w-[18px] sm:h-[18px]" />}
                      <span className="text-xs sm:text-base">{isDark ? "Light" : "Dark"}</span>
                    </button>
                    <button 
                      onClick={toggleLanguage} 
                      className="px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-lg font-medium rounded-full border bg-muted text-foreground hover:bg-muted/80 transition-colors text-xs sm:text-base"
                    >
                      {locale === "en" ? "Deutsch" : "English"}
                    </button>
                  </div>
                  {navItems.map((item, index) => (
                    <Button 
                      key={item.tag} 
                      variant={activeIndex === index ? "default" : "outline"} 
                      className="justify-start text-base sm:text-lg h-12 sm:h-14 flex items-center gap-3" 
                      onClick={() => scrollToSection(item.tag, index)}
                    >
                      <item.icon size={20} className="sm:w-6 sm:h-6" />
                      {item.label}
                    </Button>
                  ))}
                  <RainbowButton 
                    className="text-lg sm:text-xl h-14 sm:h-16 mt-2" 
                    onClick={() => { router.push("/booking"); setIsMobileMenuOpen(false); }}
                  >
                    <Car size={24} className="sm:w-7 sm:h-7" />
                    {t("book")}
                  </RainbowButton>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default EnhancedNavbar;