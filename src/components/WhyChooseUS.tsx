"use client";
import React from "react";
import { motion } from "motion/react";
import { useTranslations } from 'next-intl';
import { Clock, Car, CheckCircle } from "lucide-react";

const WhyChooseUS = () => {
  const t = useTranslations("whyChooseUs");

  // Featured services for the 3-column layout
  const featuredServices = [
    {
      key: "cancelFree",
      icon: Clock,
    },
    {
      key: "wideServices", 
      icon: Car,
    },
    {
      key: "reliableTransfers",
      icon: CheckCircle,
    }
  ];

  return (
    <section className="relative w-full bg-[url('/chooseUs.jpg')] bg-cover bg-center py-20" id="about">
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/60 z-10"></div>
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
            {t('cta.subtitle')}
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ 
                  y: -8, 
                  transition: { duration: 0.3 } 
                }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 h-full hover:bg-white/15 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300">
                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-yellow-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white text-center mb-3 uppercase tracking-wide">
                    {t(`features.${service.key}.title`)}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed text-center">
                    {t(`features.${service.key}.description`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary CTA */}
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(234, 179, 8, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(234, 179, 8, 0.3)",
                  "0 0 30px rgba(234, 179, 8, 0.5)",
                  "0 0 20px rgba(234, 179, 8, 0.3)"
                ]
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="relative bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 text-white font-bold px-10 py-4 rounded-xl shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 transform hover:-translate-y-2 border-2 border-yellow-300 hover:border-yellow-200 overflow-hidden group"
            >
              {/* Animated background overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              
              {/* Pulsing border effect */}
              <div className="absolute inset-0 rounded-xl border-2 border-yellow-300 animate-pulse opacity-75" />
              
              {/* Button text */}
              <span className="relative z-10 text-lg tracking-wide">
                {t('cta.primaryButton')}
              </span>
              
              {/* Sparkle effects */}
              <motion.div
                className="absolute top-1 right-2 w-2 h-2 bg-white rounded-full opacity-0"
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: 0.5
                }}
              />
              <motion.div
                className="absolute bottom-2 left-3 w-1.5 h-1.5 bg-white rounded-full opacity-0"
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: 1
                }}
              />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUS;
