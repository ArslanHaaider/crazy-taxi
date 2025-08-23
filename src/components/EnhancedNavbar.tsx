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
  icon: React.ElementType;
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
      <div className="hidden md:flex justify-end items-center px-6 py-2 bg-primary text-primary-foreground text-sm">
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
      <div className="flex items-center justify-center px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl w-full">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => router.push("/")}> 
            <Image src="/navbarLogo.png" alt={t("logoAlt") as string} width={160} height={90} className="h-auto w-[8rem] sm:w-[10rem] select-none" priority />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center gap-2">
                {navItems.map((item, index) => (
                  <NavigationMenuItem key={item.tag}>
                    <NavigationMenuLink
                      className={`inline-flex items-center gap-2 h-11 px-5 rounded-full font-semibold transition-colors cursor-pointer ${
                        activeIndex === index ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                      onClick={() => scrollToSection(item.tag, index)}
                    >
                      <item.icon size={18} />
                      {item.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-pressed={isDark}
              aria-label="Toggle dark mode"
              className="px-3 py-1.5 text-sm font-medium rounded-full border bg-muted text-foreground hover:bg-muted/80 transition-colors flex items-center gap-2"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
              <span className="hidden lg:inline">{isDark ? "Light" : "Dark"}</span>
            </button>
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 text-sm font-medium rounded-full border bg-muted text-foreground hover:bg-muted/80 transition-colors"
            >
              {locale === "en" ? "DEU" : "ENG"}
            </button>
            <RainbowButton onClick={() => router.push("/booking")} className="bg-blue-600">
              <Car size={20} />
              {t("book")}
            </RainbowButton>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-pressed={isDark}
              aria-label="Toggle dark mode"
              className="px-3 py-1.5 text-sm font-medium rounded-full border bg-muted text-foreground hover:bg-muted/80 transition-colors flex items-center gap-2"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-muted">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[460px]">
                <SheetHeader>
                  <SheetTitle className="text-2xl font-bold">{t("navigation")}</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={toggleTheme} aria-pressed={isDark} className="px-4 py-3 text-lg font-medium rounded-full border bg-muted text-foreground hover:bg-muted/80 transition-colors flex items-center justify-center gap-2">
                      {isDark ? <Sun size={18} /> : <Moon size={18} />}
                      {isDark ? "Light" : "Dark"}
                    </button>
                    <button onClick={toggleLanguage} className="px-4 py-3 text-lg font-medium rounded-full border bg-muted text-foreground hover:bg-muted/80 transition-colors">
                      {locale === "en" ? "Deutsch" : "English"}
                    </button>
                  </div>
                  {navItems.map((item, index) => (
                    <Button key={item.tag} variant={activeIndex === index ? "default" : "outline"} className="justify-start text-lg h-14 flex items-center gap-3" onClick={() => scrollToSection(item.tag, index)}>
                      <item.icon size={24} />{item.label}
                    </Button>
                  ))}
                  <RainbowButton className="text-xl h-16 mt-2" onClick={() => { router.push("/booking"); setIsMobileMenuOpen(false); }}>
                    <Car size={28} />{t("book")}
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