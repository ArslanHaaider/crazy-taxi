import { IconPhone, IconMail } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer role="contentinfo" className="w-full bg-background border-t border-border">
      {/* Primary Action Band */}
      <div className="bg-card/60 border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 md:justify-between">
            <p className="text-center md:text-left text-sm md:text-base text-foreground font-medium">
              Need a reliable airport transfer? Book in seconds or call us now.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/booking" aria-label="Book a ride now">
                  Book a ride
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <a
                  href="tel:+4961424996011"
                  aria-label="Call Crazy Taxi at plus forty nine six one four two four nine nine six zero one"
                >
                  Call now: +49 6142 499601
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={"/navbarLogo.png"}
                alt="Crazy Taxi Logo"
                width={120}
                height={96}
                className="rounded-lg shadow-md"
              />
            </div>
            <p className="text-muted-foreground mt-4 leading-6">
              Travel Securely With US!
            </p>
            {/* Optional trust/context copy could go here (hours/area) */}
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="#home"
                  className="text-sm font-medium text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded px-0.5"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-sm font-medium text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded px-0.5"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-sm font-medium text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded px-0.5"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex items-center justify-center rounded-md bg-primary/10 p-1.5">
                  <IconPhone size={18} className="text-primary" stroke={1.6} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Call for Ride</p>
                  <a
                    href="tel:+4961424996011"
                    className="text-sm font-semibold text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
                    aria-label="Call Crazy Taxi at plus forty nine six one four two four nine nine six zero one"
                  >
                    +49 6142 499601
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex items-center justify-center rounded-md bg-primary/10 p-1.5">
                  <IconMail size={18} className="text-primary" stroke={1.6} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Email us</p>
                  <a
                    href="mailto:flughafentransfer123@hotmail.com"
                    className="text-sm font-semibold text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded break-words"
                  >
                    flughafentransfer123@hotmail.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">Payment Methods</h3>
            <div className="bg-card border border-border rounded-lg p-4">
              <Image
                src={"/payments.webp"}
                alt="Accepted Payment Methods"
                width={149}
                height={50}
                className="w-full max-w-[149px] h-auto"
              />
              <p className="text-xs text-muted-foreground mt-3">
                We accept PayPal, cash, and cards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Skyline Background Section */}
      <div className="relative h-24 bg-gradient-to-t from-muted/40 to-transparent">
        <div
          className="absolute inset-0 bg-[url('/SkyLine.jpg')] bg-cover bg-center opacity-15"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      {/* Utility band */}
      <div className="bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center gap-3 md:gap-6 md:justify-between">
          <p className="text-center md:text-left text-sm text-muted-foreground">
            &copy; 2025 Crazy Taxi. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#top"
              className="text-sm text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded px-0.5"
              aria-label="Back to top"
            >
              Back to top
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
