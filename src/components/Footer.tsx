import { IconPhone, IconMail } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('footer');
  
  return (
    <footer role="contentinfo" className="w-full bg-background border-t border-border ">
      {/* Primary Action Band */}
      <div className="bg-card/60 border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 md:justify-between">
            <p className="text-center md:text-left text-sm md:text-base text-foreground font-medium">
              {t('cta.title')}
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/booking" aria-label="Book a ride now">
                  {t('cta.bookButton')}
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <a
                  href="tel:+4961424996011"
                  aria-label="Call Crazy Taxi at plus forty nine six one four two four nine nine six zero one"
                >
                  {t('cta.callButton')}
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
              {t('brand.tagline')}
            </p>
            {/* Optional trust/context copy could go here (hours/area) */}
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-4 relative">
              <span className="relative z-10">{t('quickLinks.title')}</span>
              <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#home"
                  className="group inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded px-1 py-0.5"
                >
                  <span className="relative">
                    {t('quickLinks.home')}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="group inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded px-1 py-0.5"
                >
                  <span className="relative">
                    {t('quickLinks.services')}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="group inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded px-1 py-0.5"
                >
                  <span className="relative">
                    {t('quickLinks.about')}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-4 relative">
              <span className="relative z-10">{t('contact.title')}</span>
              <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-full"></div>
            </h3>
            <ul className="space-y-4">
              <li className="group">
                <div className="flex items-start gap-3 p-2 rounded-lg transition-all duration-300 hover:bg-primary/5">
                  <span className="mt-0.5 inline-flex items-center justify-center rounded-md bg-primary/10 p-2 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                    <IconPhone size={18} className="text-primary" stroke={1.6} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">{t('contact.callLabel')}</p>
                    <a
                      href="tel:+4961424996011"
                      className="text-sm font-semibold text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded transition-all duration-300"
                      aria-label="Call Crazy Taxi at plus forty nine six one four two four nine nine six zero one"
                    >
                      +49 6142 499601
                    </a>
                  </div>
                </div>
              </li>
              <li className="group">
                <div className="flex items-start gap-3 p-2 rounded-lg transition-all duration-300 hover:bg-primary/5">
                  <span className="mt-0.5 inline-flex items-center justify-center rounded-md bg-primary/10 p-2 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                    <IconMail size={18} className="text-primary" stroke={1.6} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">{t('contact.emailLabel')}</p>
                    <a
                      href="mailto:flughafentransfer123@hotmail.com"
                      className="text-sm font-semibold text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded break-words transition-all duration-300"
                    >
                      flughafentransfer123@hotmail.com
                    </a>
                  </div>
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
