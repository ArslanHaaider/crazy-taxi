import { IconPhone, IconMail } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-background border-t border-border">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Top Section - Brand and Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Brand Section */}
          <div className="flex flex-col items-center lg:items-start space-y-4">
            <div className="flex flex-col items-center lg:items-start">
              <Image
                src={"/navbarLogo.png"}
                alt="Crazy Taxi Logo"
                width={120}
                height={96}
                className="rounded-lg shadow-md"
              />
              <p className="text-muted-foreground mt-3 text-center lg:text-left font-medium">
                Travel Securely With US!
              </p>
            </div>
          </div>

          {/* Contact Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Phone Contact Card */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <IconPhone size={24} className="text-primary" stroke={1.5} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Call for Ride</p>
                  <a 
                    href="tel:+4961424996011" 
                    className="text-lg font-bold text-foreground hover:text-primary transition-colors"
                  >
                    +49 6142499601
                  </a>
                </div>
              </div>
            </div>

            {/* Email Contact Card */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <IconMail size={24} className="text-primary" stroke={1.5} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email Us</p>
                  <a 
                    href="mailto:flughafentransfer123@hotmail.com" 
                    className="text-sm font-bold text-foreground hover:text-primary transition-colors break-all"
                  >
                    flughafentransfer123@hotmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-border">
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="#home" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="#services" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  href="#about" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:flughafentransfer123@hotmail.com" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm break-all"
                >
                  flughafentransfer123@hotmail.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+4961424996011" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  +49 6142499601
                </a>
              </li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Payment Methods</h3>
            <div className="bg-card border border-border rounded-lg p-4">
              <Image
                src={"/payments.webp"}
                alt="Accepted Payment Methods"
                width={149}
                height={50}
                className="w-full max-w-[149px] h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Skyline Background Section */}
      <div className="relative h-32 bg-gradient-to-t from-muted/50 to-transparent">
        <div 
          className="absolute inset-0 bg-[url('/SkyLine.jpg')] bg-cover bg-center opacity-20"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      {/* Copyright */}
      <div className="bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-sm text-muted-foreground">
            &copy; 2025 Crazy Taxi. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
